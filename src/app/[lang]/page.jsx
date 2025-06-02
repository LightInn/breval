import { Suspense } from 'react'

import { SectionDivider } from '@/components/Home/svg-stickers'
import ScrollObject3D from '@/components/scroll-object-3d'
import LoadingScreen from '@/components/loading-screen'
import Projects from '@/components/Home/projects'
import Journey from '@/components/Home/journey'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'

import { getDictionary } from '@/lib/getDictionary'

export default async function Home({ params }) {
	const { lang } = params
	const dict = await getDictionary(lang)
	return (
		<main className="relative min-h-screen bg-background text-foreground">
			<ScrollObject3D />
			<Suspense fallback={<LoadingScreen />}>
				<div className="overflow-x-hidden">
					<h1>{dict.greeting}</h1>
					<Hero />
					<div className="sticker-container">
						<SectionDivider direction="up" />
					</div>
					<About />
					<div className="sticker-container">
						<SectionDivider />
					</div>
					<Projects />
					<div className="sticker-container">
						<SectionDivider direction="down" />
					</div>
					<Journey />
				</div>
			</Suspense>
		</main>
	)
}
