import siteMetaData from '@/utils/siteMetaData'

import { ThemeProvider } from '@/components/Global/theme-provider'
import CursorBlob from '@/components/Global/cursor-blob'
import Navigation from '@/components/Global/navigation'
import Footer from '@/components/Global/footer'

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
	alternates: { canonical: '/' },
	title: siteMetaData.title,
}
import { getLocale } from '@/lib/get-locale'
import { getDictionary } from '@/lib/get-dictionary'

export default async function RootLayout({ children }) {
	const locale = await getLocale()
	const dict = await getDictionary(locale)

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
				<Navigation dict={dict} />
				{children}
				<Footer />
			</ThemeProvider>
		</>
	)
}
