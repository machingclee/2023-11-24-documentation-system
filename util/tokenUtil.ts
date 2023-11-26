import jwt from "jsonwebtoken";
import { GoogleTokenPayload } from "../app/api/auth/verify-token/route";

const verify = (token: string): GoogleTokenPayload => {
    return jwt.verify(token, process.env.JWT_SECRET!) as GoogleTokenPayload;
}

export default { verify };