import { NextRequest } from "next/server";

const getUseremail = (req: NextRequest) => {
    return req.headers.get("userEmail");
}

export default {
    getUseremail: getUseremail
}