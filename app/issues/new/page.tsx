"use client";
import dynamic from 'next/dynamic';
import { Alert, Box, Button, Container, TextField } from '@mui/material';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { ClipboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import MarkdownComponent from '../../../component/MarkdownComponent';
import Spacer from '../../../component/Spacer';
import useGetFieldUpdates from '../../../hooks/useGetFieldUpdates';
import useApiClient from '../../../hooks/useApiClient';
import NextButton from '../../../component/NextButton';
import { UploadImageResponse } from '../../api/issues/upload-image/route';
import useMDE from '../../../hooks/useMDE';

type IssueForm = {
    title: string;
    description: string;
}

type ErrorResponse = {
    message: string
}[]



const NewIssuePage = () => {
    const form = useRef<IssueForm>({ description: "", title: "" });
    const [desc, setDesc] = useState("");
    const apiClient = useApiClient();
    const { fieldUpdate } = useGetFieldUpdates(form);
    const [err, setErr] = useState<ErrorResponse>([]);
    const { MDE, simpleMDERef } = useMDE();

    const debouncedSetDesc = debounce((text: string) => { setDesc(text) }, 100);
    const router = useRouter();
    const [files, setFiles] = useState<FileList | null>(null);
    const submit = async () => {
        try {
            await apiClient.post("/api/issues", form.current);
            router.push("/issues");
        } catch (error: any) {
            const errRes = error?.response?.data as ErrorResponse | undefined;
            if (errRes) {
                setErr(errRes)
            }
        }
    }

    const clipboardPasteAction = async (e: ClipboardEvent<HTMLDivElement>) => {
        const isImage = e.clipboardData.files?.[0].name.endsWith(".png");
        if (isImage) {
            const file = e.clipboardData.files?.[0];
            console.log("filefile", file);
            const formData = new FormData();
            formData.append("file", file);
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
            const simpleMdeInstance = simpleMDERef.current;
            const pos = simpleMdeInstance?.codemirror.getCursor();
            console.log("pospospos", pos, simpleMdeInstance?.codemirror);
            if (pos) {
                simpleMdeInstance?.codemirror.setSelection(pos, pos);
                console.log("replacing text", `<img src="${result.link} width=600/>"`);
                simpleMdeInstance?.codemirror.replaceSelection(
                    `<img src="${result.link}" width="600"/>`
                )
            }

        };

    }


    const editor = useMemo(() => {
        return (
            <MDE
                key="editor"
                onPaste={clipboardPasteAction}
                value={form.current.description}
                placeholder="Description"
                onChange={text => {
                    fieldUpdate({ description: text });
                    debouncedSetDesc(text);
                }}
            />
        )
    }, [])



    return (
        <>
            <Container>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <TextField
                        sx={{
                            width: "400px",
                            "& fieldset": {
                                borderRadius: 2
                            },
                        }}
                        size='small'
                        placeholder="Title"
                        onChange={(e) => {
                            const title = e.target.value;
                            fieldUpdate({ title })
                        }}
                    />
                    <NextButton
                        variant='filled'
                        onClick={() => { submit() }}
                    >
                        Submit New Issue
                    </NextButton>
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
                                minHeight: "calc(100vh - 300px)!important"
                            },
                            "& span": { backgroundColor: "transparent !important" }
                        }}
                    >
                        {editor}
                    </Box>
                    <Spacer />
                    <Box style={{ flex: 1 }}>
                        <div>{!desc && "Preview"}</div>
                        <MarkdownComponent source={desc} />
                    </Box>
                </div>
            </div>
        </>
    )
}


export default NewIssuePage