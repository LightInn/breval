'use server'

import { hasLocale } from 'next-intl'
import { getCMS } from '@/lib/cms'
import { type Locale, locales } from './locales'

const contentPath = /^\/(blog\/articles|projects)\/([^/]+)$/

export async function resolveLocalePath(pathname: string, from: Locale, to: Locale) {
	if (!(hasLocale(locales, from) && hasLocale(locales, to))) throw new Error('Unsupported locale')
	const match = pathname.match(contentPath)
	if (!match) return pathname.startsWith('/') && !pathname.startsWith('//') ? pathname : '/'
	const collection = match[1] === 'projects' ? 'projects' : 'blogs'
	const cms = await getCMS()
	const result = await cms.find({
		collection,
		locale: from,
		fallbackLocale: 'en',
		limit: 1,
		depth: 0,
		overrideAccess: false,
		where: { slug: { equals: decodeURIComponent(match[2]) } },
	})
	if (!result.docs[0]) return pathname
	const translated = await cms.findByID({
		collection,
		id: result.docs[0].id,
		locale: to,
		fallbackLocale: 'en',
		depth: 0,
		overrideAccess: false,
	})
	return `/${match[1]}/${encodeURIComponent(translated.slug)}`
}
