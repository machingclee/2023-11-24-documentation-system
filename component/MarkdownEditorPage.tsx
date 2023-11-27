"use client";
import matter from 'gray-matter';
import { Container, TextField, Alert, Box } from "@mui/material";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { useRef, useState, useMemo, ClipboardEvent, useEffect, useCallback } from "react";
import { UploadImageResponse } from "../app/api/issues/upload-image/route";
import useApiClient from "../hooks/useApiClient";
import useGetFieldUpdates from "../hooks/useGetFieldUpdates";
import useMDE, { Position } from "../hooks/useMDE";
import MarkdownPreviewComponent from "./MarkdownPreviewComponent";
import NextButton from "./NextButton";
import Spacer from "./Spacer";
import apiRoutes from "../constants/apiRoutes";
import { Issue } from "@prisma/client";
import useRerender from "../hooks/useRerender";
import useHydrated from "../hooks/useHydrated";
import { EditIssueSchema } from "../app/api/issues/[id]/route";
import boxShadow from "../constants/boxShadow";

type IssueForm = {
    title: string;
    description: string;
}

type ErrorResponse = {
    message: string
}[]

type MetaData = {
    author: string,
    topic: string
    subtopic: string
}

const MarkdownEditorPage = ({ type, id }: { type: "create" | "edit", id?: string }) => {
    const form = useRef<IssueForm>({ description: "", title: "" });
    const [desc, setDesc] = useState("");
    const { content, data } = matter(desc);

    const apiClient = useApiClient();
    const [loading, setLoading] = useState(false);
    const { rerender, Rerender, rerenderFlag } = useRerender();
    const { fieldUpdate } = useGetFieldUpdates(form);
    const [err, setErr] = useState<ErrorResponse>([]);
    const { MDE, simpleMDERef } = useMDE();

    const debouncedSetDesc = debounce((text: string) => { setDesc(text) }, 100);
    const router = useRouter();
    const [files, setFiles] = useState<FileList | null>(null);

    const submitEdit = async () => {
        const { description, title } = form.current;
        const reqBody: EditIssueSchema = {
            id: parseInt(id || "-1"),
            title,
            description
        }
        setLoading(true);
        await apiClient.post<{ success: boolean }>(apiRoutes.POST_ISSUE(parseInt(id || "-1")), reqBody);
        router.push(`/issues/${id}`)
    }

    const submitCreate = async () => {
        try {
            setLoading(true);
            await apiClient.post("/api/issues", form.current);
            router.push("/issues");
        } catch (error: any) {
            const errRes = error?.response?.data as ErrorResponse | undefined;
            if (errRes) {
                setErr(errRes)
            }
        }
    }

    const setMDEText = useCallback((startPos: Position, endPos: Position, text: string) => {
        const simpleMdeInstance = simpleMDERef.current;
        simpleMdeInstance?.codemirror.setSelection(startPos, endPos);
        simpleMdeInstance?.codemirror.replaceSelection(text)
    }, [])

    const clipboardPasteAction = async (e: ClipboardEvent<HTMLDivElement>) => {
        const isImage = e?.clipboardData?.files?.[0]?.name?.endsWith(".png");
        if (isImage) {
            const file = e.clipboardData.files?.[0];
            console.log("filefile", file);
            const formData = new FormData();
            formData.append("file", file);
            const pos = simpleMDERef.current?.codemirror.getCursor();
            const loadingMessage = "*uploading ...*";
            if (pos) {
                setMDEText(pos, pos, loadingMessage)
            }
            const res = await apiClient.post<{ success: boolean, result: UploadImageResponse }>(
                "/api/issues/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": 'multipart/form-data'
                    }
                }
            );
            const { result } = res.data;


            console.log(pos);
            if (pos) {
                const { ch, line } = pos;
                setMDEText(pos, { line, ch: ch + loadingMessage.length }, `<img src="${result.link}" width="600"/>`)
            }
        };
    }


    const Editor = useMemo(() => {
        return <MDE
            value={desc}
            key="editor"
            onPaste={clipboardPasteAction}
            placeholder="Description"
            onChange={text => {
                fieldUpdate({ description: text });
                debouncedSetDesc(text);
            }}
        />

    }, [rerenderFlag])

    const initIssue = async (id: string | undefined) => {
        const res = await apiClient.get<{ success: boolean, result: Issue }>(apiRoutes.GET_ISSUE(parseInt(id || "-1")));
        const { result } = res.data;
        const { description, title } = result;
        setDesc(description);
        form.current.title = title;
        rerender();
    }

    const hydrated = useHydrated();

    useEffect(() => {
        if (id && type === "edit" && hydrated) {
            initIssue(id);
        }
    }, [id, hydrated])



    return (
        <>
            <Container>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Rerender>
                        <TextField
                            sx={{
                                width: "400px",
                                "& fieldset": {
                                    borderRadius: 2
                                },
                            }}
                            defaultValue={form.current.title}
                            size='small'
                            placeholder="Title"
                            onChange={(e) => {
                                const title = e.target.value;
                                fieldUpdate({ title })
                            }}
                        />
                    </Rerender>
                    {type === "create" && <NextButton
                        isLoading={loading}
                        variant='filled'
                        onClick={() => { submitCreate() }}
                    >
                        Submit New Issue
                    </NextButton>}

                    {type === "edit" && <NextButton
                        isLoading={loading}
                        variant='filled'
                        onClick={() => { submitEdit() }}
                    >
                        Submit Edition
                    </NextButton>}
                </div>

            </Container>
            <Spacer />
            {err.length > 0 && <>
                {err.map(e => {
                    return <><Alert severity="error">{e.message}</Alert><Spacer height={5} /></>
                })}
                <Spacer />
            </>

            }
            <div>
                <div style={{ display: "flex", padding: "0px 10px" }}>
                    <Box
                        style={{ flex: 1 }}
                        sx={{
                            "& .CodeMirror, & .EasyMDEContainer, & .CodeMirror-scroll": {
                                height: "calc(100vh - 300px)!important",
                            },
                            "& span": { backgroundColor: "transparent !important" }
                        }}
                    >
                        <Rerender>
                            {Editor}
                        </Rerender>
                    </Box>
                    <Spacer />
                    <Box style={{
                        flex: 1,
                        borderRadius: 10,
                        padding: "0px 20px",
                        boxShadow: boxShadow.SHADOW_62,
                        height: "calc(100vh - 230px)",
                        overflowY: "scroll"
                    }}>
                        <MarkdownPreviewComponent source={content} />
                    </Box>
                </div>
            </div>
        </>
    )
}

export default MarkdownEditorPage;