import { Suspense } from 'react'

import { getDictionary } from '@/lib/get-dictionary'
import { getLocale } from '@/lib/get-locale'

import { SectionDivider } from '@/components/Home/svg-stickers'
import ScrollObject3D from '@/components/scroll-object-3d'
import MyJourneySection from '@/components/Home/journey'
import LoadingScreen from '@/components/loading-screen'
import Projects from '@/components/Home/projects'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'

export default async function Home() {
	const locale = await getLocale()
	const dict = await getDictionary(locale)

	return (
		<main className="relative min-h-screen bg-background text-foreground">
			<ScrollObject3D />
			<Suspense fallback={<LoadingScreen dict={dict} />}>
				<div className="overflow-x-hidden">
					<Hero dict={dict} />
					<div className="sticker-container">
						<SectionDivider direction="up" />
					</div>
					<About dict={dict} />
					<div className="sticker-container">
						<SectionDivider />
					</div>
					<Projects dict={dict} />
					<div className="sticker-container">
						<SectionDivider direction="down" />
					</div>
					<MyJourneySection dict={dict} />
				</div>
			</Suspense>
		</main>
	)
}
