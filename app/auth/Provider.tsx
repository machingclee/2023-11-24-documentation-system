"use client";

import React, { PropsWithChildren } from 'react'
import { SessionProvider } from "next-auth/react";

export type NextAuthGooglePayload = {
    user: {
        email: string,
        image: string,
        name: string
    }
}


const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>{children} </ SessionProvider>
    )
}

export default AuthProvider