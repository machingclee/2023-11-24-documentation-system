"use client";

import { Box, Container } from "@mui/material";
import { notFound } from "next/navigation";
import Tag from "../Tag";
import Button from '@mui/material-next/Button';
import prisma from "../../../prisma/client";
import MarkdownComponent from "../../../component/MarkdownComponent";
import Spacer from "../../../component/Spacer";
import dateUtil from "../../../util/dateUtil";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import apiRoutes from "../../../constants/apiRoutes";
import { Issue } from "@prisma/client";

type Params = {
    params: {
        id: string
    }
}

export default (props: Params) => {
    const { params } = props;
    const { id } = params;
    let id_: number;
    const apiClient = useApiClient();
    const [issue, setIssue] = useState<Issue | null>(null);

    try {
        id_ = parseInt(id);
    } catch (err) {
        notFound();
    }

    const getIssue = async (issueId: number) => {
        const res = await apiClient.get<{ success: boolean, result: Issue }>(apiRoutes.GET_ISSUE(issueId));
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
            <Button variant="filled" size="medium">Edit</Button>
            <Spacer />
            <div>
                <MarkdownComponent source={issue.description} />
            </div>
        </Container>
    )
}