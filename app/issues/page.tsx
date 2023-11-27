"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Container from "@mui/material/Container"
import Tag from "./Tag"
import dateUtil from "../../util/dateUtil";
import Spacer from "../../component/Spacer";
import CustomTable from "../../component/CustomTable";
import useApiClient from "../../hooks/useApiClient";
import apiRoutes from "../../constants/apiRoutes";
import { GetIssuesResponse } from "../api/issues/route";
import { Issue } from "@prisma/client";
import NextButton from "../../component/NextButton";

const IssuePage = () => {
    const apiClient = useApiClient();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const getIssues = async () => {
        const res = await apiClient.get<GetIssuesResponse>(apiRoutes.GET_ISSUES)
        const { success, result } = res.data;
        if (success) {
            setIssues(result);
        }
    }

    useEffect(() => {
        getIssues()
    }, [])

    return (
        <Container>
            <div>
                <div>
                    <Link href={"/issues/new"} onClick={() => setIsloading(true)}>
                        <NextButton variant="filled" isLoading={isLoading}  >New Issue</NextButton>
                    </Link>
                </div>
                <Spacer />
                <CustomTable
                    headers={["Issue", "Status", "Created"]}
                    rows={issues}
                    keyExtractor={row => row.id.toString()}
                    rowMapping={r => [
                        <Link href={`/issues/${r.id}`}>{r.title}</Link>,
                        <Tag status={r.status} />,
                        dateUtil.transform(r.createdAt)
                    ]}
                />
            </div>
        </Container>
    )
}

export const dynamic = "force-dynamic"

export default IssuePage