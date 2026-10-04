import { Suspense } from 'react'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'
import MyJourneySection from '@/components/Home/journey'
import Projects from '@/components/Home/projects'
import { SectionDivider } from '@/components/Home/svg-stickers'
import LoadingScreen from '@/components/loading-screen'
import { getDictionary } from '@/lib/get-dictionary'
import { getLocale } from '@/lib/get-locale'
export default async function Home() {
	const locale = await getLocale()
	const dict = await getDictionary(locale)
	return (
		<main className="relative min-h-screen bg-background text-foreground">
			{/* <ScrollObject3D /> */}
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
