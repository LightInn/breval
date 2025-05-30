import { ThemeProvider } from '@/components/Global/theme-provider'
import CursorBlob from '@/components/Global/cursor-blob'
import Navigation from '@/components/Global/navigation'
import Footer from '@/components/Global/footer'

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
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange={false}
				enableSystem={false}
				forcedTheme={undefined}
			>
				<CursorBlob />
				<Navigation />
				{children}
				<Footer />
			</ThemeProvider>
		</>
	)
}
