import { Suspense } from 'react'
import RouteArt from '@/components/Global/route-art'
import { ThreeScene } from '@/components/projects/ThreeScene'
import { getProjects } from '@/services/projects.services'

async function CrowContent({ params }) {
	const { locale } = await params
	const projects = await getProjects(locale)
	return (
		<div className="h-screen w-screen bg-slate-100">
			<ThreeScene projects={projects} />
		</div>
	)
}

export default function Page(props) {
	return (
		<>
			{
				<Suspense fallback={<div className="min-h-screen bg-background" aria-busy="true" />}>
					<CrowContent {...props} />
				</Suspense>
			}
			<RouteArt kind="project" />
		</>
	)
}
