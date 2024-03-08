'use client';
import Script from "next/script";
// import '/src/styles/monokai.min.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.min.css';

export const revalidate = 60;


export default function RootLayout({children}) {
    if (typeof window !== "undefined") {
        console.log("highlighting")

        hljs.highlightAll();
    }

    return (
        <>
            {children}
        </>

    )
        ;
}
