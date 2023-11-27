"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { notFound } from "next/navigation";
import MarkdownComponent from "../../../component/MarkdownPreviewComponent";
import Spacer from "../../../component/Spacer";
import dateUtil from "../../../util/dateUtil";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import apiRoutes from "../../../constants/apiRoutes";
import { Article, MetaData } from "@prisma/client";
import { useRouter } from "next/navigation";
import NextButton from "../../../component/NextButton";
import matter from "gray-matter";

type Params = {
    params: {
        id: string
    }
}

export default (props: Params) => {
    const { params } = props;
    const { id } = params;
    let id_: number;
    try {
        id_ = parseInt(id);
    } catch (err) {
        notFound();
    }
    const apiClient = useApiClient();
    const [article, setArticle] = useState<Article | null>(null);
    const [metaData, setMetaData] = useState<MetaData | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const startEdit = () => {
        setLoading(true);
        router.push(`/doc/${id}/edit`)
    }

    const getIssue = async (issueId: number) => {
        const res = await apiClient.get<{ success: boolean, result: Article & { Metadata: MetaData } }>(
            apiRoutes.GET_ISSUE(issueId)
        );
        const article = res.data.result;
        const mataData_ = article.Metadata;
        setArticle(article);
        setMetaData(mataData_);
    }

    const { content, } = matter(article?.description || "");


    useEffect(() => {
        getIssue(id_);
    }, [id]);

    if (!article) {
        return null;
    }

    return (
        <Container>
            <Box sx={{ fontWeight: "bold", fontSize: 30 }}>
                {article.title}
            </Box>
            <Spacer />
            <div style={{ display: "flex", alignItems: "center" }} >
                <div>
                    {dateUtil.transform(article.createdAt)}
                </div>
            </div>
            <Spacer />
            <NextButton
                variant="filled"
                size="medium"
                onClick={startEdit}
                isLoading={loading}
            >
                Edit
            </NextButton>
            <Spacer />
            <div>
                <MarkdownComponent source={content} />
            </div>
        </Container>
    )
}