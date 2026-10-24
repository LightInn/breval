import type { MetadataRoute } from 'next'
import { type Locale, locales } from '@/i18n/locales'
import { getPathname } from '@/i18n/navigation'
import { getCMS } from '@/lib/cms'
import siteMetadata from '@/utils/siteMetaData'

export const dynamic = 'force-dynamic'
const absolute = (path: string, locale: Locale) =>
	new URL(getPathname({ locale, href: path }), siteMetadata.siteUrl).href

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const cms = await getCMS()
	const entries: MetadataRoute.Sitemap = []
	for (const route of [
		'/',
		'/projects',
		'/blog',
		'/artist',
		'/experiment/about',
		'/experiment/crow',
		'/experiment/slime',
	]) {
		const languages = Object.fromEntries(locales.map(locale => [locale, absolute(route, locale)]))
		for (const locale of locales) entries.push({ url: languages[locale], alternates: { languages } })
	}
	const documents = new Map<string, { languages: Record<string, string>; updatedAt: string }>()
	const results = await Promise.all(
		locales.flatMap(locale =>
			(['blogs', 'projects'] as const).map(async collection => {
				const result = await cms.find({
					collection,
					locale,
					fallbackLocale: 'en',
					pagination: false,
					depth: 0,
					overrideAccess: false,
					where: { _status: { equals: 'published' } },
				})
				return result.docs.map(doc => ({
					key: `${collection}:${doc.id}`,
					locale,
					url: absolute(
						`${collection === 'blogs' ? '/blog/articles/' : '/projects/'}${encodeURIComponent(doc.slug)}`,
						locale
					),
					updatedAt: doc.updatedAt,
				}))
			})
		)
	)
	for (const doc of results.flat()) {
		const entry = documents.get(doc.key) || { languages: {}, updatedAt: doc.updatedAt }
		entry.languages[doc.locale] = doc.url
		documents.set(doc.key, entry)
	}
	for (const entry of documents.values())
		for (const url of Object.values(entry.languages))
			entries.push({ url, lastModified: entry.updatedAt, alternates: { languages: entry.languages } })
	return entries
}
