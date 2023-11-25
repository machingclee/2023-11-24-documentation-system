import { GoogleTokenPayload } from '@/app/api/auth/authenticate/route'
import { devtools, persist, } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

type AuthStore = {
    accessToken: string
    user?: GoogleTokenPayload
    setUser: (user: GoogleTokenPayload) => void,
    setAccessToken: (token: string) => void,
    resetAuthState: () => void,
}

export default create<AuthStore>()(
    devtools(
        persist(
            immer(
                (set) => ({
                    accessToken: "",
                    setUser: (user: GoogleTokenPayload) => set({ user }, false, { type: "set-users" }),
                    setAccessToken: (token: string) => set(
                        (state) => { state.accessToken = token },
                        false,
                        { type: "set-access-token" }
                    ),
                    resetAuthState: () => { set({}) },
                }),
            ),
            { name: "auth-store" }
        ),
        { name: 'zustand', store: 'app/auth' }
    )
);



