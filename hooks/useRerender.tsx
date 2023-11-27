"use client"

import { ReactNode, useMemo, useState } from "react"

export default () => {
    const [rerenderFlag, setRerenderFlag] = useState(true);
    const rerender = () => {
        setRerenderFlag(false);
        setTimeout(() => setRerenderFlag(true), 1);
    }

    const Rerender = useMemo(() => ({ children }: { children: ReactNode }) => {
        "use client";
        return <>{rerenderFlag && children}</>
    }, [rerenderFlag])

    return { rerender, Rerender, rerenderFlag }
}