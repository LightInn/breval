// app/projects/page.jsx
import { Suspense } from 'react'
import { getProjects } from '@/services/projects.services'
import ProjectClient from './ProjectClient'



export default async function ProjectPage() {
	const projects = await getProjects() // fetch fait ici

	return (
		<Suspense fallback={<Skeleton />}>
			<ProjectClient projects={projects} />
		</Suspense>
	)
}



function Skeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 animate-pulse">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="h-40 bg-white/5 rounded-xl" />
			))}
		</div>
	)
}