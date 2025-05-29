import React from 'react'
import { notFound } from 'next/navigation'
import Head from 'next/head'
import ProjectDetailClient from './ProjectDetailClient'

export async function generateStaticParams() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?fields=title'
	)
	const data = await res.json()

	const paths = data.data.map(project => ({
		id: project.title.toLowerCase().replace(/\s+/g, '-'),
	}))

	return paths
}

export default async function ProjectDetail(props) {
	const params = await props.params
	const { id } = params
	const project = await getProject(id)

	// Add proper error handling
	if (!project) {
		notFound()
	}

	// Ensure media is always an array and handle the structure from your API
	const mediaArray = Array.isArray(project?.media) ? project.media : []

	return (
		<>
			<Head>
				<title>Bréval LE FLOCH | {project?.title} </title>

				<meta
					content={project?.title + ' : ' + project?.short_description}
					name="description"
				/>
				<link
					href={'https://brev.al/projet/' + project?.title}
					key="canonical"
					rel="canonical"
				/>

				<link href="https://fonts.googleapis.com" rel="preconnect" />

				{/*@ts-ignore*/}
				<link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />
				<link
					href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ProjectDetailClient project={project} />
		</>
	)
}

async function getProject(title) {
	try {
		const res = await fetch(
			`https://breval-api.lightin.io/api/projets?filters[title][$eq]=${title}&populate=*`,
			{ next: { revalidate: 3600 } } // Cache for 1 hour
		)

		if (!res.ok) {
			console.error(`Failed to fetch project: ${res.status}`)
			return null
		}

		const data = await res.json()

		if (!data?.data || data.data.length === 0) {
			return null
		}

		const projectData = data.data[0]
		return projectData?.attributes
			? {
					...projectData.attributes,
					id: projectData.id,
				}
			: projectData
	} catch (error) {
		console.error('Error fetching project:', error)
		return null
	}
}
