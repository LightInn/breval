import { Exo_2, Open_Sans, Varela_Round } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import Head from 'next/head'

import '@/styles/globals.css'

const varelaRound = Varela_Round({
	variable: '--font-varela-round',
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
})

const exo2 = Exo_2({
	variable: '--font-exo-2',
	subsets: ['latin'],
	style: ['italic'],
	display: 'swap',
	weight: '200',
})

const openSans = Open_Sans({
	variable: '--font-open-sans',
	subsets: ['latin'],
	style: ['italic'],
	display: 'swap',
	weight: '400',
})
import siteMetaData from '@/utils/siteMetaData'

export const metadata = {
	openGraph: {
		images: [
			{
				alt: 'Bréval Le Floch - Creative Developer Portfolio Website',
				url: siteMetaData.socialBanner || '/og-image.png', // Use socialBanner from metadata or fallback
				width: 1200,
				height: 630,
			},
		],
		description: siteMetaData.description,
		title: siteMetaData.title,
		url: siteMetaData.siteUrl,
		type: 'website',
	},
	metadataBase: new URL(siteMetaData.siteUrl),
	description: siteMetaData.description,
	title: siteMetaData.title,
}

export default function RootLayout({ children }) {
	return (
		<html
			className={`light ${varelaRound.variable} ${exo2.variable} ${openSans.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<Head>
				{/* Preconnect to third-party origins for faster loading */}
				<link href="https://player.vimeo.com" rel="preconnect" />
				<link href="https://vod-adaptive-ak.vimeocdn.com" rel="preconnect" />
				<link href="https://f.vimeocdn.com" rel="preconnect" />
				<link href="https://breval-api.lightin.io" rel="preconnect" />
				<link href="https://cdn.brev.al" rel="preconnect" />
				<link href="https://player.vimeo.com" rel="dns-prefetch" />
				<link href="https://vod-adaptive-ak.vimeocdn.com" rel="dns-prefetch" />
				<link href="https://f.vimeocdn.com" rel="dns-prefetch" />

				<link href="https://i.vimeocdn.com" rel="preconnect" />
				<link href="https://f.vimeocdn.com" rel="preconnect" />
				<link href="https://player-telemetry.vimeo.com" rel="preconnect" />
				<link href="https://fresnel.vimeocdn.com" rel="preconnect" />
				<link href="https://www.gstatic.com" rel="preconnect" />
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />

				<link
					href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
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

			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
