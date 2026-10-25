import { Suspense } from 'react'
import HomeContent from '@/components/Home/home-content'
import { sectionMetadata } from '@/i18n/metadata'
export default function Home(props) {
	return (
		<Suspense fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
			<HomeContent {...props} />
		</Suspense>
	)
}
export async function generateMetadata({ params }) {
	return sectionMetadata('/', (await params).locale)
}
