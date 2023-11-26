
import { Box } from "@mui/material";
import { notFound } from "next/navigation";
import Tag from "../Tag";
import dayjs from "dayjs"
import Button from '@mui/material-next/Button';
import prisma from "../../../prisma/client";
import MarkdownComponent from "../../../component/MarkdownComponent";
import Spacer from "../../../component/Spacer";
import dateUtil from "../../../util/dateUtil";

type Params = {
    params: {
        id: string
    }
}

export default async (props: Params) => {
    const { params } = props;
    const { id } = params;
    let id_: number;

    try {
        id_ = parseInt(id);
    } catch (err) {
        notFound();
    }

    const issue = await prisma.issue.findFirst({ where: { id: id_ } })

    if (!issue) {
        notFound();
    }


    return (
        <div>
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
        </div>
    )
}