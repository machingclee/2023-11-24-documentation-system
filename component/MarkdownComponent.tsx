import Markdown from "react-markdown";
import gfm from "remark-gfm";
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import { HTMLAttributes, ReactNode } from "react";
import { tss } from "tss-react/mui";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism as highlighterStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import _ from "lodash";

const useStyles = tss.create((() => ({
    example: {
        paddingLeft: "calc(2em - 3px)",
        marginTop: 40,
        marginBottom: 60,
        borderLeft: "3px solid rgba(123,185,209,0.3)"
    },
    proof: {
        "& > p:nth-child(1)": {
            textIndent: "calc(3px - 2em) !important"
        },
        paddingLeft: "calc(2em - 3px)",
        marginTop: 20,
        marginBottom: 20
    },
    codeBlock: {
        "& .react-syntax-highlighter-line-number": {
            minWidth: "2.5em !important"
        },
        "& pre": {
            paddingTop: "0.95em !important",
            background: "#F5F5F5!important",
            // paddingLeft: "0.55em !important",
            border: "1px solid #E0E0E0",
            borderRadius: 2,
        },

        "& .no-bg": {
            background: "transparent !important",
            "& code": {
                background: "transparent !important"
            }
        }
    }
})))



type TMarkdownComponent = {
    node?: any, inline?: boolean, className?: string, children: ReactNode[]
} & HTMLAttributes<HTMLElement>


const Code = ({ inline, className, children, ...props }: TMarkdownComponent) => {
    const { classes, cx } = useStyles();
    const match = /language-(\w+)-*(\d+)*/.exec(className || '');
    const lang = _.get(match, "[1]", "");
    const line = _.get(match, "[2]", "");

    return !inline && match ? (
        <div className={cx(classes.codeBlock)}>
            <SyntaxHighlighter
                //@ts-ignore
                style={{
                    ...highlighterStyle,
                }}
                //@ts-ignore
                className={lang === "none" ? "no-bg" : ""}
                showLineNumbers={line ? true : false}
                lineNumberStyle={{ opacity: 0.35 }}
                startingLineNumber={line ? parseInt(line) : undefined}
                language={lang}
                children={String(children).replace(/\n$/, '')}
                {...props}
            />
        </div >
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    )
}

const components = {
    code: Code
}

const MarkdownComponent = ({ source }: { source: string }) => {
    return (
        <Markdown
            // @ts-ignore
            components={components}
            remarkPlugins={[gfm, remarkMath]}
            rehypePlugins={[rehypeRaw]}
            children={source}
        />
    )
}

export default MarkdownComponent;