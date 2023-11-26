"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import dayjs from "dayjs"
import { Badge } from "@mui/material"
import Tag from "./Tag"
import { useSession } from "next-auth/react"
import dateUtil from "../../util/dateUtil";
import Spacer from "../../component/Spacer";
import CustomTable from "../../component/CustomTable";
import prisma from "../../prisma/client";
import useApiClient from "../../hooks/useApiClient";
import apiRoutes from "../../constants/apiRoutes";
import { GetIssuesResponse } from "../api/issues/route";
import { Issue } from "@prisma/client";
import useHydrated from "../../hooks/useHydrated";

const IssuePage = () => {
    const apiClient = useApiClient();
    const [issues, setIssues] = useState<Issue[]>([]);

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
        <div>
            <div><Link href={"/issues/new"}> <Button>New Issue</Button></Link></div>
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
    )
}

export const dynamic = "force-dynamic"

export default IssuePage