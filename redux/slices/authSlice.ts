import { createAsyncThunk, createListenerMiddleware, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoogleTokenPayload } from "../../app/api/auth/verify-token/route";
import registerEffect from "../../util/registerEffect";

export type AuthSliceState = {
    accessToken: string,
    user: GoogleTokenPayload | null
};

const initialState: AuthSliceState = {
    accessToken: "",
    user: null
};

const authSlice = createSlice({
    name: "dict",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        setUser: (state, action: PayloadAction<GoogleTokenPayload>) => {
            state.user = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

// export const authThunkAction = {
//     getOAuthScreenUrl: createAsyncThunk("get-OAuth-screen-url", async () => {
//         return await googleOAuthUtil.getRedirectOAuthLoginPage();
//     })
// }

export const authMiddleware = createListenerMiddleware();

registerEffect(authMiddleware,
    [
        {
            action: "",
            effect: (action, { dispatch }) => {
            }
        }
    ]
);




export default authSlice;