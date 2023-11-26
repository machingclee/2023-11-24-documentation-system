import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import requestUtil from "../../../../util/requestUtil";


type Params = {
    params: { id: string }
}

export const GET = async (req: NextRequest, params: Params) => {
    const userEmail = requestUtil.getUseremail(req);
    const id = parseInt(params.params.id);
    const issue = await prisma.issue.findFirst({
        where: {
            AND: [
                { id: id, },
                { email: userEmail }
            ]
        }
    });

    return NextResponse.json({ success: true, result: issue }, { status: 200 })
} 