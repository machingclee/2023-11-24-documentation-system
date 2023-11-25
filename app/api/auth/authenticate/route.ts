import { NextRequest, NextResponse } from "next/server";
import { oauth2_v2 } from "googleapis";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env?.JWT_SECRET || "";
export type GoogleTokenPayload = oauth2_v2.Schema$Userinfo

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json() as { accessToken: string };
        const { accessToken } = body;
        console.log("accessToken");
        const payload = jwt.verify(accessToken, JWT_SECRET) as GoogleTokenPayload;
        console.log("payloadpayloadpayload", payload);
        return NextResponse.json({ success: true, result: { payload } }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, errorMessage: JSON.stringify(err) }, { status: 200 });
    }
}