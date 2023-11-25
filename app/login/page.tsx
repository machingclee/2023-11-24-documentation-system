import googleOAuthUtil from '@/util/googleOAuthUtil'
import { RedirectType, redirect } from 'next/navigation';
import React from 'react'

const Login = async () => {
    const redirectURL = await googleOAuthUtil.getRedirectOAuthLoginPage();
    redirect(redirectURL, RedirectType.push);
    return (
        <div>This is a login page</div>
    )
}

export default Login