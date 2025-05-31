import siteMetaData from '@/utils/siteMetaData'

export const metadata = {
	openGraph: {
		images: [
			{
				url: siteMetaData.socialBanner || '/og-image.png', // Assuming a general OG image, or create a specific one
				alt: 'Bréval Le Floch - Art Experiments',
				width: 1200,
				height: 630,
			},
		],
		description:
			'Discover a collection of interactive art experiments and creative coding projects by Bréval Le Floch, showcasing generative art and digital experiences.',
		title: 'Art Experiments | Bréval Le Floch - Creative Developer',
		url: `${siteMetaData.siteUrl}/artist`,
		type: 'website',
	},
	description:
		'Discover a collection of interactive art experiments and creative coding projects by Bréval Le Floch, showcasing generative art and digital experiences.',
	title: 'Art Experiments | Bréval Le Floch - Creative Developer',
}

export default function ArtistLayout({ children }) {
	return <>{children}</>
}
