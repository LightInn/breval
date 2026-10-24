import { sectionMetadata } from '@/i18n/metadata'
export async function generateMetadata({ params }) {
	return sectionMetadata('/experiment/about', (await params).locale)
}
export default function AboutLayout({ children }) {
	return (
		<main className="flex w-full flex-col items-center justify-between bg-white">
			{/*<InsightRoll insights={insights} />*/}
			{children}
		</main>
	)
}
