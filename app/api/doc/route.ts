import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import res from "../../../util/res";
import prisma from "../../../prisma/client";
import { Article } from "@prisma/client";
import requestUtil from "../../../util/requestUtil";
import { request } from "http";
import { db } from "../../../db/database";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title must have at least one character").max(255),
    description: z.string().min(1, "Description cannot be empty."),
    author: z.string().max(100),
    classification: z.string().max(100),
})

export type CreateIssueSchema = z.infer<typeof createIssueSchema>

export type GetIssuesResponse = {
    success: boolean,
    result: (Article & { author: string, classification: string })[];
}

export const GET = async (req: NextRequest) => {
    const userEmail = requestUtil.getUseremail(req);
    const articles = await db.selectFrom("Article")
        .selectAll()
        .leftJoin("MetaData", "MetaData.articleid", "Article.id")
        .select(["MetaData.author", "MetaData.classfication"])
        .where("Article.email", "=", userEmail)
        .execute();

    console.log("[userEmail]", userEmail);
    console.log("[articles]", articles);

    return res.json({
        success: true,
        result: articles
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
    const { author, description, title, classification } = body;

    const article = await db.insertInto("Article").values({
        description,
        title,
        email: userEmail,
        updatedAt: new Date()
    }).returning("Article.id").executeTakeFirst()

    await db.insertInto("MetaData").values({
        articleid: article?.id || 0,
        author: author,
        updatedAt: new Date(),
        classfication: classification
    }).execute();

    return NextResponse.json(article, { status: 201 })
}