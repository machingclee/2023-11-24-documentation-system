import Markdown from "react-markdown";

const MarkdownComponent = ({ source }: { source: string }) => {
    return (
        <Markdown
            children={source}
        />
    )
}

export default MarkdownComponent;