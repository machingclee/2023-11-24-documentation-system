import { RedirectType, redirect } from 'next/navigation';
import React from 'react'
import googleOAuthUtil from '../../util/googleOAuthUtil';

const Login = async () => {
    const redirectURL = await googleOAuthUtil.getRedirectOAuthLoginPage();
    redirect(redirectURL, RedirectType.replace);
    return (
        <div>This is a login page</div>
    )
}

export default Login