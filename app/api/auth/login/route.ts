import { NextRequest, NextResponse } from "next/server";
import googleOAuthUtil from "../../../../util/googleOAuthUtil";

const FRONTEND_URL = process.env.FRONTEND_URL || "";

export const GET = async (req: NextRequest) => {
    const { success, result } = await googleOAuthUtil.oauthRedirectGetRequest(req);
    if (result) {
        return NextResponse.redirect(result.tokenResUrl);
    } else {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}