import { Suspense } from 'react'

import { getDictionary } from '@/lib/get-dictionary'
import { getLocale } from '@/lib/get-locale'

import { getProjects } from '../../../services/projects.services' // Make sure this path is correct
import ProjectClient from './ProjectClient' // The new client component

export default async function ProjectsPage() {
	try {
		const locale = await getLocale()
		const dict = await getDictionary(locale)

		const projectsData = await getProjects()
		// getProjects directly returns the array of projects (data.data)
		const projects = Array.isArray(projectsData) ? projectsData : []

		if (!Array.isArray(projectsData)) {
			console.warn(
				'getProjects did not return an array as expected. Received:',
				projectsData
			)
		}

		return (
			<Suspense fallback={<ProjectSkeleton />}>
				<ProjectClient dict={dict} projects={projects} />
			</Suspense>
		)
	} catch (error) {
		console.error('Error fetching projects in ProjectsPage:', error)
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="mb-4 text-4xl font-bold">Error loading projects</h1>
					<p className="text-red-400">
						Sorry, an error occurred while trying to load the projects.
					</p>
					{/* For debugging: <p className="text-xs text-gray-500 mt-2">Detail: {error.message}</p> */}
				</div>
			</div>
		)
	}
}

function ProjectSkeleton() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="container mx-auto px-4 py-20">
				<div className="mb-12 text-center">
					<div className="mx-auto mb-4 h-10 w-3/4 animate-pulse rounded bg-gray-800 md:h-14"></div>
					<div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-800"></div>
				</div>
				<div className="mb-8 flex items-center justify-between">
					<div className="flex flex-wrap gap-3">
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								className="h-8 w-24 animate-pulse rounded bg-gray-800"
								key={i}
							/>
						))}
					</div>
					<div className="h-8 w-20 animate-pulse rounded bg-gray-800" />
				</div>
				<div className="mb-16 animate-pulse rounded-lg border border-gray-700 bg-gray-800/50 p-6 md:p-8">
					<div className="md:flex">
						<div className="h-64 rounded bg-gray-700 md:h-auto md:w-1/2"></div>
						<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
							<div>
								<div className="mb-4 h-8 w-3/4 rounded bg-gray-700"></div>
								<div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
								<div className="mb-6 h-4 w-5/6 rounded bg-gray-700"></div>
							</div>
							<div className="flex gap-4">
								<div className="h-10 w-32 rounded bg-gray-700"></div>
								<div className="h-10 w-32 rounded bg-gray-700"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div className="h-80 animate-pulse rounded-lg bg-gray-800" key={i}>
							<div className="h-48 rounded-t-lg bg-gray-700"></div>
							<div className="p-6">
								<div className="mb-2 h-6 w-3/4 rounded bg-gray-700"></div>
								<div className="mb-1 h-4 w-full rounded bg-gray-700"></div>
								<div className="mb-4 h-4 w-5/6 rounded bg-gray-700"></div>
								<div className="flex flex-wrap gap-2">
									<div className="h-5 w-16 rounded-full bg-gray-700"></div>
									<div className="h-5 w-20 rounded-full bg-gray-700"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
