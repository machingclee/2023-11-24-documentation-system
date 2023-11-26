"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '../../../redux/app/hooks'
import authSlice from '../../../redux/slices/authSlice'
import { GoogleTokenPayload } from '../../api/auth/verify-token/route'
import useApiClient from '../../../hooks/useApiClient'

type Params = {
    params: {
        token: string
    }
}

const TokenPage = (props: Params) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { params } = props;
    const { token } = params;
    const [hydrated, setHydrated] = useState(false);
    const apiClient = useApiClient();

    const authenticateUser = async (token: string) => {
        const res = await apiClient.post<{ result: { payload: GoogleTokenPayload } }>(
            "/api/auth/verify-token",
            { accessToken: token }
        );
        const data = res.data;
        console.log("data", data);
        dispatch(authSlice.actions.setUser(data.result.payload));
        router.push("/");
    }

    useEffect(() => {
        setHydrated(true);
    }, [])

    useEffect(() => {
        if (token && hydrated) {
            dispatch(authSlice.actions.setAccessToken(token));
        }
    }, [hydrated, token])

    useEffect(() => {
        if (token && hydrated) {
            authenticateUser(token);
        }
    }, [token, hydrated])

    return (
        <div>

        </div>
    )
}

export default dynamic(() => Promise.resolve(TokenPage), {
    ssr: false,
});
