import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Exo_2, Open_Sans, Varela_Round } from 'next/font/google'
import Script from 'next/script'
import { getLocale } from '@/lib/get-locale'
import siteMetaData from '@/utils/siteMetaData'
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
export const metadata = {
	openGraph: {
		images: [
			{
				alt: 'Bréval Le Floch - Creative Developer Portfolio Website',
				url: siteMetaData.socialBanner || '/og-image.png',
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
export default async function RootLayout({ children }) {
	const locale = await getLocale()
	return (
		<html
			className={`light ${varelaRound.variable} ${exo2.variable} ${openSans.variable}`}
			lang={locale}
			suppressHydrationWarning
		>
			<Script
				async
				data-domains={'brev.al'}
				data-website-id="c9b88026-3f0e-49e7-a564-38547c9d60a5"
				src="https://umami.wadefade.fr/script.js"
				strategy="afterInteractive"
			></Script>
			{/*Google tag (gtag.js)*/}
			<Script src="https://www.googletagmanager.com/gtag/js?id=G-455V2M6DD1" strategy="afterInteractive" />
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
			<body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>{children}</body>
		</html>
	)
}
