import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '@/styles/globals.css'

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
		<html className="light" lang="en" suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
