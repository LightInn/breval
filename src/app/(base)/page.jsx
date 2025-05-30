import { Suspense } from 'react'

import { SectionDivider } from '@/components/Home/svg-stickers'
import ScrollObject3D from '@/components/scroll-object-3d'
import LoadingScreen from '@/components/loading-screen'
import Projects from '@/components/Home/projects'
import Journey from '@/components/Home/journey'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'

export default function Home() {
	return (
		<main className="relative min-h-screen bg-background text-foreground">
			<ScrollObject3D />
			<Suspense fallback={<LoadingScreen />}>
				<div className="overflow-x-hidden">
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
