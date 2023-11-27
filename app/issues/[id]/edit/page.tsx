"use client";

import MarkdownEditorPage from "../../../../component/MarkdownEditorPage";

type Params = {
    params: {
        id: string
    }
}



export default (props: Params) => {
    const { params: { id } } = props;
    return <MarkdownEditorPage type="edit" id={id} />
}