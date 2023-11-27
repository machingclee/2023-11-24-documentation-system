"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor').then(module => module.SimpleMdeReact), { ssr: false });

type MDE = Parameters<Exclude<React.ComponentProps<typeof SimpleMdeReact>["getMdeInstance"], undefined>>[0];
export type Position = Parameters<Exclude<React.ComponentProps<typeof SimpleMdeReact>["getLineAndCursor"], undefined>>[0];

export default () => {
    const simpleMDERef = useRef<MDE | null>(null);
    const option = useMemo(() => {
        return {
            hideIcons: ["side-by-side", "preview", "fullscreen"]
        }
    }, [])
    const getMdeInstanceCallback = useCallback((simpleMde: MDE) => {
        simpleMDERef.current = simpleMde;
    }, []);

    const MDE = (props: SimpleMDEReactProps) => (
        <SimpleMdeReact
            style={{ fontFamily: `"Source Code Pro", Consolas, monaco, monospace` }}
            // @ts-ignore
            options={{
                ...option,
            }}
            getMdeInstance={getMdeInstanceCallback}
            {...props}
        />
    )

    return { simpleMDERef, MDE }
}