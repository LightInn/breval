import { Suspense } from 'react'
import RouteArt from '@/components/Global/route-art'
import HomeContent from '@/components/Home/home-content'
import { sectionMetadata } from '@/i18n/metadata'
export default function Home(props) {
	return (
		<>
			{
				<Suspense fallback={<main className="min-h-screen bg-background" aria-busy="true" />}>
					<HomeContent {...props} />
				</Suspense>
			}
			<RouteArt kind="terrain" />
		</>
	)
}
export async function generateMetadata({ params }) {
	return sectionMetadata('/', (await params).locale)
}
