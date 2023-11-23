"use client";
import dynamic from 'next/dynamic'
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes"
import React, { useMemo, useRef, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import MarkdownPreview from '@uiw/react-markdown-preview';
import useRerender from "@/hooks/useRerender";
import useGetFieldUpdates from "@/hooks/useGetFieldUpdates";
import lodash, { debounce, update } from "lodash";
import Spacer from "@/component/Spacer";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })


type IssueForm = {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const form = useRef<IssueForm>({ description: "", title: "" });
    const [desc, setDesc] = useState("");
    const { fieldUpdate } = useGetFieldUpdates(form);
    const { Rerender, rerender } = useRerender();
    const debouncedSetDesc = debounce((text: string) => { setDesc(text) }, 100);
    const router = useRouter();

    const option = useMemo(() => {
        return {
            hideIcons: ["side-by-side", "preview", "fullscreen"]
        }
    }, [])
    const submit = async () => {
        await axios.post("/api/issues", form.current);
        router.push("/issues")
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
            <div className="max-w-xl space-y-3">
                <TextField.Root>
                    <TextField.Input
                        placeholder="Title"
                        onChange={(e) => {
                            const title = e.target.value;
                            fieldUpdate({ title })
                        }}
                    />
                </TextField.Root>
            </div>
            <Spacer />
            <div>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }} className="[&_span]:!bg-transparent">
                        {editor}
                    </div>
                    <Spacer />
                    <div style={{ flex: 1 }} className="[&_ul]:list-disc [&_ol]:list-decimal">
                        <Rerender>
                            <div>{!desc && "Preview"}</div>
                            <PreviewComponent source={desc} />
                        </Rerender>
                    </div>
                </div>
                <Button className="hover:cursor-pointer">Submit New Issue</Button>
            </div>
        </>
    )
}

const PreviewComponent = ({ source }: { source: string }) => {
    return (
        <MarkdownPreview
            source={source}
            rehypeRewrite={(node, index, parent) => {
                // @ts-ignore
                if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                    parent.children = parent.children.slice(1)
                }
            }}
        />)
}

export default NewIssuePage