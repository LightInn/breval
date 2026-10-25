import RouteArt from '@/components/Global/route-art'
export const instant = false

import { notFound } from 'next/navigation'
import { localizedAlternates } from '@/i18n/metadata'
import { getProject } from '@/services/projects.services'
import ProjectDetailClient from './ProjectDetailClient'
export async function generateMetadata({ params }) {
	const { id, locale } = await params
	const project = await getProject(id, locale)
	if (!project) notFound()
	const alternates = localizedAlternates(`/projects/${project.slug}`, locale)
	const image = project.main_media?.url || project.media?.[0]?.url || '/logo.png'
	return {
		title: `${project.title} | Bréval Le Floch`,
		description: (project.short_description || project.description || '').slice(0, 160),
		alternates,
		openGraph: {
			title: project.title,
			url: alternates.canonical,
			locale: locale === 'fr' ? 'fr_FR' : 'en_US',
			images: [{ url: image }],
			type: 'article',
		},
	}
}
export default async function ProjectDetail(props) {
	const params = await props.params
	const { id, locale } = params
	const project = await getProject(id, locale)

	// Add proper error handling
	if (!project) {
		notFound()
	}
	return (
		<>
			{<ProjectDetailClient project={project} />}
			<RouteArt kind="project" />
		</>
	)
}
