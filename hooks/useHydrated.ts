"use client"

import { useEffect, useState } from "react";

export default () => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, [])

    return hydrated
}