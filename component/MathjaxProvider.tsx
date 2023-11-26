"use client"

import { PropsWithChildren } from "react"
import MathJax from "react-mathjax"

export default (props: PropsWithChildren) => {
    const { children } = props;
    return (
        <MathJax.Provider options={mathJaxOptions} >
            {children}
        </MathJax.Provider>
    )
}

export const mathJaxOptions = {
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
        inlineMath: [['$', '$'], ["\\(", "\\)"]],
        displayMath: [['$$', '$$'], ["\\[", "\\]"]],
    },
    "HTML-CSS": {
        availableFonts: ["TeX"],
        linebreaks: { automatic: true, width: "container" },
        minScaleAdjust: 100
    },


    TeX: {

    },
}