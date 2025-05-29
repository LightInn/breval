import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { ThemeProvider } from '@/components/Global/theme-provider'
import CursorBlob from '@/components/Global/cursor-blob'
import Navigation from '@/components/Global/navigation'
import Footer from '@/components/Global/footer'

import '../styles/globals.css'

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
}

export default function RootLayout({ children }) {
	return (
		<html className="light" lang="en" suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					disableTransitionOnChange={false}
					enableSystem={false}
					forcedTheme={undefined}
				>
					<CursorBlob />
					<Navigation />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}
