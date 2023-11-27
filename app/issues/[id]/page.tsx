"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { notFound } from "next/navigation";
import Tag from "../Tag";
import Button from '@mui/material-next/Button';
import prisma from "../../../prisma/client";
import MarkdownComponent from "../../../component/MarkdownPreviewComponent";
import Spacer from "../../../component/Spacer";
import dateUtil from "../../../util/dateUtil";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import apiRoutes from "../../../constants/apiRoutes";
import { Article } from "@prisma/client";
import { useRouter } from "next/navigation";
import NextButton from "../../../component/NextButton";

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
    const [issue, setIssue] = useState<Article | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const startEdit = () => {
        setLoading(true);
        router.push(`/issues/${id}/edit`)
    }

    const getIssue = async (issueId: number) => {
        const res = await apiClient.get<{ success: boolean, result: Article }>(apiRoutes.GET_ISSUE(issueId));
        console.log("res.data.result", res.data.result);
        setIssue(res.data.result);
    }

    useEffect(() => {
        getIssue(id_);
    }, [id]);

    if (!issue) {
        return null;
    }

    return (
        <Container>
            <Box sx={{ fontWeight: "bold", fontSize: 30 }}>
                {issue.title}
            </Box>
            <Spacer />
            <div style={{ display: "flex", alignItems: "center" }} >
                <Tag status={issue.status} />
                <Spacer />
                <div>
                    {dateUtil.transform(issue.createdAt)}
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
                <MarkdownComponent source={issue.description} />
            </div>
        </Container>
    )
}