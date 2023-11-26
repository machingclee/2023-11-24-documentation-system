"use client";
import dynamic from 'next/dynamic';
// import SimpleMDE from "react-simplemde-editor";
import { Alert, Box, Button, TextField } from '@mui/material';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import MarkdownComponent from '../../../component/MarkdownComponent';
import Spacer from '../../../component/Spacer';
import useGetFieldUpdates from '../../../hooks/useGetFieldUpdates';
import useApiClient from '../../../hooks/useApiClient';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })


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
    const debouncedSetDesc = debounce((text: string) => { setDesc(text) }, 100);
    const router = useRouter();

    const option = useMemo(() => {
        return {
            hideIcons: ["side-by-side", "preview", "fullscreen"]
        }
    }, [])

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
    const editor = useMemo(() => {
        return (
            <SimpleMDE
                key="editor"
                // @ts-ignore
                options={{
                    ...option,
                    autofocus: true
                }}
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
            <div >
                <TextField
                    sx={{
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

            </div>
            <Spacer />
            {err && <>

                <Alert severity="error">{JSON.stringify(err)}</Alert>
                <Spacer />
            </>

            }
            <div>
                <div style={{ display: "flex" }}>
                    <Box
                        style={{ flex: 1 }}
                        sx={{ "& span": { backgroundColor: "transparent !important" } }}
                    >
                        {editor}
                    </Box>
                    <Spacer />
                    <div style={{ flex: 1 }} className="[&_ul]:list-disc [&_ol]:list-decimal">
                        <div>{!desc && "Preview"}</div>
                        <MarkdownComponent source={desc} />
                    </div>
                </div>
                <Button
                    className="hover:cursor-pointer"
                    onClick={() => { submit() }}
                >
                    Submit New Issue
                </Button>
            </div>
        </>
    )
}


export default NewIssuePage