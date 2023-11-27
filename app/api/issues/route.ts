import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import res from "../../../util/res";
import prisma from "../../../prisma/client";
import { Article } from "@prisma/client";
import requestUtil from "../../../util/requestUtil";
import { request } from "http";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title must have at least one character").max(255),
    description: z.string().min(1, "Description cannot be empty.")
})

export type GetIssuesResponse = {
    success: boolean,
    result: Article[];
}

export const GET = async (req: NextRequest) => {
    const userEmail = requestUtil.getUseremail(req);
    const article = await prisma.article.findMany({
        where: { email: userEmail },
        orderBy: { createdAt: "desc" }
    });

    console.log("[userEmail]", userEmail);
    console.log("[issues]", article);

    return res.json({
        success: true,
        result: article
    });
}

export const POST = async (req: NextRequest) => {
    const requestBody = await req.json();
    const userEmail = requestUtil.getUseremail(req);

    const validation = createIssueSchema.safeParse(requestBody);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }
    const body = validation.data;

    const article = await prisma.article.create({
        data: {
            email: userEmail,
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(article, { status: 201 })
}