import React from 'react'

import siteMetaData from '@/utils/siteMetaData'
import { notFound } from 'next/navigation'

import ProjectDetailClient from './ProjectDetailClient'
import { getLocale } from '@/lib/get-locale'

export async function generateMetadata({ params }) {
	const resolvedParams = await params
	const { id } = resolvedParams
	const project = await getProject(id)

	if (!project) {
		return {
			description: 'The requested project could not be found.',
			title: 'Project Not Found | Bréval Le Floch', // Aligned name
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
			title: `${project.title} | Bréval Le Floch - Creative Developer`, // Aligned name and made more descriptive
			url: `${siteMetaData.siteUrl}/projects/${id}`, // Used siteMetaData
			published_time: project.date, // Corrected property name
			type: 'article',
		},
		twitter: {
			description:
				project.short_description || project.description?.substring(0, 160),
			title: `${project.title} | Bréval Le Floch - Creative Developer`, // Aligned name and made more descriptive
			card: 'summary_large_image',
			images: [imageUrl],
		},
		description:
			project.short_description ||
			project.description?.substring(0, 160) ||
			`Explore the ${project.title} project by Bréval Le Floch.`, // More dynamic fallback
		alternates: {
			canonical: `${siteMetaData.siteUrl}/projects/${id}`, // Used siteMetaData
		},
		title: `${project.title} | Bréval Le Floch - Creative Developer`, // Aligned name and made more descriptive
		keywords: project.skills?.join(', ') || '',
	}
}

export async function generateStaticParams() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?fields=slug'
	)
	const data = await res.json()

	console.log(data)

	const paths = data.data.map(project => ({
		id: project.slug.toLowerCase(),
	}))

	return paths
}

export default async function ProjectDetail(props) {
	const params = await props.params
	const { id } = params
	const locale = await getLocale()
	const project = await getProject(id, locale)

	// Add proper error handling
	if (!project) {
		notFound()
	}

	return <ProjectDetailClient project={project} />
}

async function getProject(title, locale = 'en') {
	try {
		const res = await fetch(
			`https://breval-api.lightin.io/api/projets?filters[title][$eq]=${title}&populate=*&locale=${locale}`,
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
