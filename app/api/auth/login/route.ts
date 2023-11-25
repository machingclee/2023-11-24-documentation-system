import googleOAuthUtil from "@/util/googleOAuthUtil";
import { NextRequest, NextResponse } from "next/server";

const FRONTEND_URL = process.env.FRONTEND_URL || "";


export const GET = async (req: NextRequest) => {
    const { tokenResUrl } = await googleOAuthUtil.oauthRedirectGetRequest(req);
    return NextResponse.redirect(tokenResUrl);
}