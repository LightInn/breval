import React from 'react'

import Script from 'next/script'
import Head from 'next/head'

import '../styles/globals.css'

export const metadata = {
	description:
		'Portfolio of Bréval LE FLOCH, a developer specialized in web and mobile applications development in Nantes.',
	default: 'Bréval LE FLOCH | Portfolio',
	title: 'Bréval LE FLOCH | Portfolio',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<link href="https://i.vimeocdn.com" rel="preconnect" />
				<link href="https://f.vimeocdn.com" rel="preconnect" />
				<link href="https://player-telemetry.vimeo.com" rel="preconnect" />
				<link href="https://fresnel.vimeocdn.com" rel="preconnect" />
				<link href="https://www.gstatic.com" rel="preconnect" />
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />

				<link href="https://brev.al/projet" key="canonical" rel="canonical" />
				<link href="https://brev.al/blog" key="canonical" rel="canonical" />

				<link
					href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Script
				async
				data-domains={'brev.al'}
				data-website-id="c9b88026-3f0e-49e7-a564-38547c9d60a5"
				src="https://umami.wadefade.fr/script.js"
				strategy="afterInteractive"
			></Script>
			{/*Google tag (gtag.js)*/}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-455V2M6DD1"
				strategy="afterInteractive"
			/>
			<Script
				dangerouslySetInnerHTML={{
					__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
                   
              gtag('config', 'G-455V2M6DD1');
              `,
				}}
				id="google-analytics"
				strategy="afterInteractive"
			/>
			<body>{children}</body>
		</html>
	)
}
