import siteMetaData from '@/utils/siteMetaData'

export const metadata = {
	openGraph: {
		images: [
			{
				alt: 'Generative Slime Art Simulation by Bréval Le Floch',
				url: siteMetaData.socialBanner || '/slime/thumb.webp', // Assuming a specific thumbnail for this experiment
				width: 1200,
				height: 630,
			},
		],
		description:
			'Experience a generative slime art simulation by Bréval Le Floch, an interactive experiment with evolving visual patterns.',
		title: 'Generative Slime Simulation | Bréval Le Floch',
		url: `${siteMetaData.siteUrl}/experiment/slime`,
		type: 'website',
	},
	description:
		'Experience a generative slime art simulation by Bréval Le Floch, an interactive experiment with evolving visual patterns.',
	title: 'Generative Slime Simulation | Bréval Le Floch',
}

export default function SlimeLayout({ children }) {
	return <>{children}</>
}
