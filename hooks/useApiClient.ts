"use client";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";

import axios, { AxiosInstance } from 'axios'
import authSlice from "../redux/slices/authSlice";
import useLoginStatus from "./useLoginStatus";
import useLogout from "./useLogout";

const apiClient = axios.create({
    baseURL: "/",
    responseEncoding: "utf8",
    headers: {
        'Content-type': 'application/json',
    },
})

apiClient.defaults.withCredentials = true;

export default () => {
    const { accessToken, userDetail } = useLoginStatus();
    const logout = useLogout();
    configApiClient(apiClient, accessToken, logout, userDetail?.email || "");
    return apiClient;
}

// inject store into interceptor at _layout.tsx
export const configApiClient = (
    apiClient: AxiosInstance,
    accessToken: string,
    resetAuth: () => void,
    userEmail: string
) => {
    apiClient.interceptors.request.use((req) => {
        console.log("attach accessToken", accessToken);
        if (accessToken && userEmail) {
            req.headers["userEmail"] = userEmail;
            req.headers["Authorization"] = "Bearer " + accessToken;
        }
        return req;
    })

    apiClient.interceptors.response.use(
        response => response,
        async error => {
            const originalConfig = error.config;
            if (
                error?.response?.status === 403 ||
                error?.response?.status === 401
            ) {
                const errorMessage = error?.response?.data?.errorMessage || "";
                if (errorMessage === "PLEASE_LOGOUT") {
                    resetAuth();
                    // originalConfig._retry = true;
                    // const refreshToken = (store?.getState() as RootState)?.auth.refreshToken;
                    // const res = await apiClient.post<WBResponse<{ accessToken: string }>>(apiRoutes.POST_REFRESH_TOKEN, { refreshToken });
                    // const { success } = res.data;
                    // if (!success) {
                    //     msgUtil.error(res.data.errorMessage || "");
                    // } else {
                    //     const { result } = res.data;
                    //     const newAccessToken = result.accessToken;
                    //     store.dispatch(authSlice.actions.setAccessToken(newAccessToken));
                    //     console.log("new token ge to ta ze");
                    //     console.log("originalConfig", originalConfig);
                    //     return apiClient(originalConfig);
                    // }
                }
            } else if (error?.response?.status === 404) {
                //404 page
            } else if (error?.response?.status === 500) {
                //do nothing
            } else {
                // snackbarUtils.info("Please try to login again");
            }
            return Promise.reject(error)
        }
    )
}
