import { Exo_2, Open_Sans, Varela_Round } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

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
				alt: 'Bréval Le Floch - Creative Developer',
				url: '/og-image.png',
				width: 1200,
				height: 630,
			},
		],
	},
	description:
		'Portfolio of Bréval Le Floch - Creative Developer, CTO, and Co-founder',
	title: 'Bréval Le Floch | Creative Developer',
	metadataBase: new URL('https://brev.al'),
}

export default function RootLayout({ children }) {
	return (
		<html
			className={`light ${varelaRound.variable} ${exo2.variable} ${openSans.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
