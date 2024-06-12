import siteMetadata from '../../utils/siteMetaData'

import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import { cx } from '/src/utils'

export const revalidate = 60

export const metadata = {
	openGraph: {
		description: siteMetadata.description,
		images: [siteMetadata.socialBanner],
		siteName: siteMetadata.title,
		title: siteMetadata.title,
		url: siteMetadata.siteUrl,
		locale: 'fr_FR',
		type: 'website',
	},
	robots: {
		googleBot: {
			'max-image-preview': 'large',
			'max-video-preview': -1,
			noimageindex: true,
			'max-snippet': -1,
			follow: true,
			index: true,
		},
		follow: true,
		index: true,
	},
	title: {
		template: `%s | Blog & News`,
		default: siteMetadata.title, // a default is required when creating a template
	},
	twitter: {
		images: [siteMetadata.socialBanner],
		card: 'summary_large_image',
		title: siteMetadata.title,
	},
	metadataBase: new URL(siteMetadata.siteUrl),
	description: siteMetadata.description,
}

export default function RootLayout({ children }) {
	return (
		<div className={cx('bg-light font-mr')}>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
