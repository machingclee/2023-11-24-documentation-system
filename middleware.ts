import { NextRequest, NextResponse } from "next/server";
import tokenUtil from "./util/tokenUtil";
import { GoogleTokenPayload } from "./app/api/auth/verify-token/route";
import { jwtVerify } from "jose";
import res from "./util/res";
import requestUtil from "./util/requestUtil";

export async function middleware(req: NextRequest) {
    const userEmail = requestUtil.getUseremail(req);
    const { pathname, searchParams } = req.nextUrl;

    if (pathname.startsWith("/api/doc")) {
        if (!userEmail) {
            return NextResponse.json({
                success: false,
                errorMessage: "PLEASE_LOGOUT",
                err: "username cannot be found"
            }, { status: 401 })
        }

        try {
            const headers = req.headers;
            const token = headers.get("Authorization")?.replace("Bearer ", "") || "";
            const key = new TextEncoder().encode(process.env.JWT_SECRET!);
            await jwtVerify<GoogleTokenPayload>(token, key);
        } catch (err) {
            const err_ = err as unknown as { code: string };
            return NextResponse.json({
                success: false,
                err: err_,
                errorMessage: "PLEASE_LOGOUT",
            }, { status: 401 })
        }
    }




    return NextResponse.next();
}