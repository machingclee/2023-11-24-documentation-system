import React from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import Spacer from "@/component/Spacer"
import prisma from "@/prisma/client"
import dayjs from "dayjs"
import CustomTable from "@/component/CustomTable"
import { Badge } from "@mui/material"
import Tag from "./Tag"
import dateUtil from "@/util/dateUtil"

const IssuePage = async () => {
    const issues = await prisma.issue.findMany({ orderBy: { createdAt: "desc" } });

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