import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import res from "./res";

const ALLOWED_EMAILS = process.env.EMAILS_ALLOWED?.split(",") || [];
const DOMAINS_ALLOWED = process.env.DOMAINS_ALLOWED?.split(",") || [];
const JWT_SECRET = process.env?.JWT_SECRET || ""
const FRONTEND_URL = process.env?.FRONTEND_URL || ""

const oAuth2Client = new google.auth.OAuth2(
    {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        redirectUri: process.env.GOOGLE_API_REDIRECT!
    }
);

const oauthURl: { current: string } = { current: "" };

const getAuthUrl = () => {
    if (oauthURl.current) {
        return oauthURl.current;
    }
    else {
        const url = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile"
            ]
        });
        oauthURl.current = url;
        return url;
    }
}

const getRedirectOAuthLoginPage = async () => {
    const url = getAuthUrl()
    return url;
}


const oauthRedirectGetRequest = async (req: NextRequest) => {
    const code = req.nextUrl.searchParams.get("code") || "";
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.credentials = tokens;
    const oauth2 = google.oauth2("v2");

    const res_ = await oauth2.userinfo.v2.me.get({
        auth: oAuth2Client,
    });
    const userData = res_.data;

    const isAllowedEmail = process.env.EMAILS_ALLOWED?.split(",").includes(userData.email || "");
    const isAllowedDomain = DOMAINS_ALLOWED.some(domain => {
        return userData.email?.endsWith(domain) || false;
    });
    const hasRight = isAllowedEmail || isAllowedDomain;

    if (!hasRight) {
        return { sucess: false, errorMessage: `Only ${ALLOWED_EMAILS.join(", ")} has access to this project.` }
    }
    const token = jwt.sign(
        { ...userData },
        JWT_SECRET,
        { expiresIn: 604800 }
    );
    return { success: true, result: { tokenResUrl: `${FRONTEND_URL}/token/${token}` } };
}

export default {
    getRedirectOAuthLoginPage,
    oauthRedirectGetRequest,
}