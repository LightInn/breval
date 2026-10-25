import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'
import { cache } from 'react'

import { getCMS } from '@/lib/cms'
import { getLocale } from '@/lib/get-locale'
import { prioritizeProjects } from '@/lib/project-priority'

async function findProjectsData(locale) {
	'use cache: remote'
	cacheTag('cms:projects')
	cacheLife({ stale: 30, revalidate: 300, expire: 3600 })
	const cms = await getCMS()
	const result = await cms.find({
		collection: 'projects',
		locale,
		fallbackLocale: 'en',
		depth: 1,
		sort: 'id',
		pagination: false,
		overrideAccess: false,
		where: { _status: { equals: 'published' } },
	})
	const reference = locale === 'en' ? result.docs : await findProjectsData('en')
	return prioritizeProjects(result.docs, reference)
}
const findProjects = cache(findProjectsData)
export async function getFeaturedProjects(locale) {
	return (await findProjects(locale || (await getLocale()))).slice(0, 4)
}
export async function getProjects(locale) {
	return await findProjects(locale || (await getLocale()))
}
export async function getProject(slug, locale) {
	return (await findProjects(locale || (await getLocale()))).find(project => project.slug === slug) || null
}
