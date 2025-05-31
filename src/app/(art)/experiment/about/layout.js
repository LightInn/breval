import siteMetaData from '@/utils/siteMetaData'

export const metadata = {
	openGraph: {
		images: [
			{
				url: siteMetaData.socialBanner || '/experiments/about/thumb.webp',
				alt: 'Interactive SVG Avatar Experiment by Bréval Le Floch',
				width: 1200,
				height: 630,
			},
		],
		description:
			'Explore an interactive SVG avatar experiment by Bréval Le Floch, showcasing dynamic animations and color palettes generated from images.',
		title: 'Interactive Avatar Experiment | Bréval Le Floch',
		url: `${siteMetaData.siteUrl}/experiment/about`,
		type: 'website',
	},
	description:
		'Explore an interactive SVG avatar experiment by Bréval Le Floch, showcasing dynamic animations and color palettes generated from images.',
	title: 'Interactive Avatar Experiment | Bréval Le Floch',
}

export default function AboutLayout({ children }) {
	return (
		<main className="flex w-full flex-col items-center justify-between bg-white">
			{/*<InsightRoll insights={insights} />*/}
			{children}
		</main>
	)
}
