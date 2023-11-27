import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import requestUtil from "../../../../util/requestUtil";
import { z } from "zod";
import res from "../../../../util/res";

type Params = {
    params: { id: string }
}

export const GET = async (req: NextRequest, params: Params) => {
    const userEmail = requestUtil.getUseremail(req);
    const id = parseInt(params.params.id);
    const article = await prisma.article.findFirst({
        where: {
            AND: [
                { id: id, },
                { email: userEmail }
            ]
        }
    });

    return NextResponse.json({ success: true, result: article }, { status: 200 })
}

const editIssueSchema = z.object({
    id: z.number().gte(0),
    title: z.string().min(1, "Title must have at least one character").max(255),
    description: z.string().min(1, "Description cannot be empty."),
    author: z.string().min(1).max(100),
    classification: z.string().min(0).max(100),
})

export type EditIssueSchema = z.infer<typeof editIssueSchema>;


export const PUT = async (req: NextRequest, params: Params) => {
    const body_ = await req.json();
    const validation = editIssueSchema.safeParse(body_);

    if (validation.success) {
        const { description, id, title } = validation.data;
        const article = await prisma.article.findFirst({ where: { id } })
        const userEmail = requestUtil.getUseremail(req);

        if (article?.email !== userEmail) {
            return res.json({ success: false, errorMessage: "user email not match" });
        }

        await prisma.article.update({
            data: {
                title,
                description
            },
            where: {
                id: id
            }
        });

        return res.json({ success: true });
    } else {
        return res.json({ success: false, errorMessage: validation.error.errors });
    }
}


