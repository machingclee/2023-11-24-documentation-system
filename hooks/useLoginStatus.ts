"use client";

import { useAppSelector } from "../redux/app/hooks";


export default () => {
    const { accessToken, user: userDetail } = useAppSelector(s => s.auth);
    return { accessToken, userDetail }
}