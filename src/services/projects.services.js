'use server'

import { cache } from 'react'

import { getCMS } from '@/lib/cms'
import { getLocale } from '@/lib/get-locale'

const findProjects = cache(async (locale, limit, slug) => {
	const cms = await getCMS()
	const result = await cms.find({
		collection: 'projects',
		locale,
		fallbackLocale: 'en',
		depth: 1,
		sort: '-rank',
		pagination: false,
		...(limit ? { limit } : {}),
		overrideAccess: false,
		where: { and: [{ _status: { equals: 'published' } }, ...(slug ? [{ slug: { equals: slug } }] : [])] },
	})
	return result.docs
})
export async function getFeaturedProjects(locale) {
	return (await findProjects(locale || (await getLocale()), 4, undefined)).slice(0, 4)
}
export async function getProjects(locale) {
	return await findProjects(locale || (await getLocale()), undefined, undefined)
}
export async function getProject(slug, locale) {
	return (await findProjects(locale || (await getLocale()), 1, slug))[0] || null
}
