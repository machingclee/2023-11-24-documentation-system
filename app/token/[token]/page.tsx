"use client"
import useAuthStore from '@/store/useAuthStore'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GoogleTokenPayload } from '../../api/auth/authenticate/route'
import dynamic from 'next/dynamic'

type Params = {
    params: {
        token: string
    }
}

const TokenPage = (props: Params) => {
    const { params } = props;
    const { token } = params;
    const [hydrated, setHydrated] = useState(false);
    const { setAccessToken, setUser } = useAuthStore();

    const authenticateUser = async (token: string) => {
        const res = await axios.post<{ result: { payload: GoogleTokenPayload } }>(
            "/api/auth/authenticate",
            { accessToken: token }
        );
        const data = res.data;
        console.log("datadatadatadatadata", data);
        setUser(data.result.payload);
    }


    useEffect(() => {
        setHydrated(true);
    }, [])

    useEffect(() => {
        if (token && hydrated) {
            setAccessToken(token);
        }
    }, [hydrated, token])

    useEffect(() => {
        if (token && hydrated) {
            authenticateUser(token);
        }
    }, [token, hydrated])

    return (
        <div>
            {token}
        </div>
    )
}

export default dynamic(() => Promise.resolve(TokenPage), {
    ssr: false,
});
