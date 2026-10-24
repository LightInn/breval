import { notFound } from 'next/navigation'
import { localizedAlternates } from '@/i18n/metadata'
import { getLocale } from '@/lib/get-locale'
import { getProject } from '@/services/projects.services'
import ProjectDetailClient from './ProjectDetailClient'
export async function generateMetadata({ params }) {
	const { id, locale } = await params
	const project = await getProject(id, locale)
	if (!project) return { title: 'Project not found', robots: { index: false } }
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
	const { id } = params
	const locale = await getLocale()
	const project = await getProject(id, locale)

	// Add proper error handling
	if (!project) {
		notFound()
	}
	return <ProjectDetailClient project={project} />
}
