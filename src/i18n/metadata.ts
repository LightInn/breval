import { getTranslations } from 'next-intl/server'
import siteMetadata from '@/utils/siteMetaData'
import { type Locale, locales } from './locales'
import { getPathname } from './navigation'

export function localizedAlternates(pathname: string, locale: Locale, paths?: Partial<Record<Locale, string>>) {
	const absolute = (language: Locale) =>
		new URL(getPathname({ locale: language, href: paths?.[language] || pathname }), siteMetadata.siteUrl).href
	return {
		canonical: absolute(locale),
		languages: {
			...Object.fromEntries(locales.map(language => [language, absolute(language)])),
			'x-default': absolute('en'),
		},
	}
}

export async function sectionMetadata(
	pathname: string,
	locale: Locale,
	titleKey: 'metadataHome' | 'blogTitle' | 'projectsTitle' = 'metadataHome'
) {
	const t = await getTranslations({ locale, namespace: 'common' })
	const title = `${t(titleKey)} | Bréval Le Floch`
	const description = t('metadataDescription')
	const alternates = localizedAlternates(pathname, locale)
	return {
		title,
		description,
		alternates,
		openGraph: {
			title,
			description,
			url: alternates.canonical,
			locale: locale === 'fr' ? 'fr_FR' : 'en_US',
			alternateLocale: [locale === 'fr' ? 'en_US' : 'fr_FR'],
		},
	}
}
