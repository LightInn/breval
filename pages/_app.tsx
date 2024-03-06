import '../styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react'
import Script from 'next/script'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Script async src="https://umami.wadefade.fr/script.js"
                    strategy="afterInteractive"
                    data-website-id="c9b88026-3f0e-49e7-a564-38547c9d60a5"></Script>
            {/*Google tag (gtag.js)*/}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-455V2M6DD1"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
                   
              gtag('config', 'G-455V2M6DD1');
              `,
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
