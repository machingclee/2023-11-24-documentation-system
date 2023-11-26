"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/app/hooks";
import authSlice from "../redux/slices/authSlice";

export default () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const logout = () => {
        dispatch(authSlice.actions.reset());
        router.push("/");
    }
    return logout;
}