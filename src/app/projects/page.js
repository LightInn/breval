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
		<div className="grid animate-pulse gap-6 md:grid-cols-2 xl:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<div className="h-40 rounded-xl bg-white/5" key={i} />
			))}
		</div>
	)
}
