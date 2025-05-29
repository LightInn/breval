import React from 'react'

import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import ProjectDetailClient from './ProjectDetailClient'

export async function generateMetadata({ params }) {
	const resolvedParams = await params
	const { id } = resolvedParams
	const project = await getProject(id)

	if (!project) {
		return {
			description: 'The requested project could not be found.',
			title: 'Project Not Found | Bréval LE FLOCH',
		}
	}

	const imageUrl =
		project.main_media?.url ||
		(project.media && project.media.length > 0
			? project.media[0].url
			: '/placeholder.svg')

	return {
		openGraph: {
			images: [
				{
					height:
						project.main_media?.height || project.media?.[0]?.height || 630,
					width: project.main_media?.width || project.media?.[0]?.width || 1200,
					alt: project.title,
					url: imageUrl,
				},
			],
			description:
				project.short_description || project.description?.substring(0, 160),
			title: `${project.title} | Bréval LE FLOCH`,
			url: `https://brev.al/projects/${id}`,
			publishedTime: project.date,
			type: 'article',
		},
		twitter: {
			description:
				project.short_description || project.description?.substring(0, 160),
			title: `${project.title} | Bréval LE FLOCH`,
			card: 'summary_large_image',
			images: [imageUrl],
		},
		description:
			project.short_description ||
			project.description?.substring(0, 160) ||
			'Project by Bréval LE FLOCH',
		alternates: {
			canonical: `https://brev.al/projects/${id}`,
		},
		title: `${project.title} | Bréval LE FLOCH`,
		keywords: project.skills?.join(', ') || '',
	}
}

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

	return <ProjectDetailClient project={project} />
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
