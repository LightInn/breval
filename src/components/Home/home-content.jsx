import { Suspense } from 'react'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'
import MyJourneySection from '@/components/Home/journey'
import Projects from '@/components/Home/projects'
import LoadingScreen from '@/components/loading-screen'
import { getDictionary } from '@/lib/get-dictionary'
import { getFeaturedProjects } from '@/services/projects.services'
export default async function HomeContent({ params }) {
	const { locale } = await params
	const [dict, projects] = await Promise.all([getDictionary(locale), getFeaturedProjects(locale)])
	return (
		<main className="relative min-h-screen bg-background text-foreground">
			{/* <ScrollObject3D /> */}
			<Suspense fallback={<LoadingScreen dict={dict} />}>
				<div className="overflow-x-hidden">
					<Hero dict={dict} />
					<About dict={dict} />
					<Projects dict={dict} projects={projects} />
					<MyJourneySection dict={dict} />
				</div>
			</Suspense>
		</main>
	)
}
