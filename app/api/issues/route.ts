import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import res from "../../../util/res";
import prisma from "../../../prisma/client";
import { Issue } from "@prisma/client";
import requestUtil from "../../../util/requestUtil";
import { request } from "http";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title must have at least one character").max(255),
    description: z.string().min(1, "Description cannot be empty.")
})

export type GetIssuesResponse = {
    success: boolean,
    result: Issue[];
}

export const GET = async (req: NextRequest) => {
    const userEmail = requestUtil.getUseremail(req);
    const issues = await prisma.issue.findMany({
        where: { email: userEmail },
        orderBy: { createdAt: "desc" }
    });

    console.log("[userEmail]", userEmail);
    console.log("[issues]", issues);

    return res.json({
        success: true,
        result: issues
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

    const newIssue = await prisma.issue.create({
        data: {
            email: userEmail,
            title: body.title,
            description: body.description
        }
    })

    const res = NextResponse.next();


    return NextResponse.json(newIssue, { status: 201 })
}

export const dynamic = "force-dynamic"