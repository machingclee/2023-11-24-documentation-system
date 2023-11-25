import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const oAuth2Client = new google.auth.OAuth2(
    {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        redirectUri: process.env.GOOGLE_API_REDIRECT!
    }
);

const getAuthUrl = () => {
    return oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]
    });
}

const getRedirectOAuthLoginPage = async () => {
    const url = getAuthUrl()
    return url;
}

const allowedEmails = process.env.EMAILS_ALLOWED?.split(",") || [];
const jwtSecret = process.env?.JWT_SECRET || ""
const frontendUrl = process.env?.FRONTEND_URL || ""

const oauthRedirectGetRequest = async (req: NextRequest) => {
    const code = req.nextUrl.searchParams.get("code") || "";
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.credentials = tokens;
    const oauth2 = google.oauth2("v2");

    const res_ = await oauth2.userinfo.v2.me.get({
        auth: oAuth2Client,
    });
    const userData = res_.data;

    const hasRight = process.env.EMAILS_ALLOWED?.split(",").includes(userData.email || "");
    if (!hasRight) {
        NextResponse.json(
            `Only ${allowedEmails.join(", ")} has access to this project.`,
            { status: 400 }
        );
    }
    const token = jwt.sign(
        { ...userData },
        jwtSecret,
        { expiresIn: 60 * 60 }
    );
    return { tokenResUrl: `${frontendUrl}/token/${token}` };
}

export default {
    getRedirectOAuthLoginPage,
    oauthRedirectGetRequest,
}