import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import React from "react";

export const metadata = {
  title: "Bréval LE FLOCH | Portfolio",
  default: "Bréval LE FLOCH | Portfolio",
  description:
    "Portfolio of Bréval LE FLOCH, a developer specialized in web and mobile applications development in Nantes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://brev.al/projet" key="canonical" />
        <link rel="canonical" href="https://brev.al/blog" key="canonical" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
        async
        src="https://umami.wadefade.fr/script.js"
        strategy="afterInteractive"
        data-website-id="c9b88026-3f0e-49e7-a564-38547c9d60a5"
        data-domains={"brev.al"}
      ></Script>
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
      <body>{children}</body>
    </html>
  );
}
