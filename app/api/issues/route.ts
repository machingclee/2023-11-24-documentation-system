import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title must have at least one character").max(255),
    description: z.string().min(1, "Description cannot be empty.")
})

export const POST = async (req: NextRequest) => {
    const requestBody = await req.json();
    const validation = createIssueSchema.safeParse(requestBody);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }
    const body = validation.data;

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    const res = NextResponse.next();


    return NextResponse.json(newIssue, { status: 201 })
}