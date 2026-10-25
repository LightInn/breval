import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

const catalogs = {
	en: () => import('../lib/dictionaries/en.json').then(module => module.default),
	fr: () => import('../lib/dictionaries/fr.json').then(module => module.default),
}
// Payload and the site have separate HTML roots, so Next cannot expose a shared root locale param.
// Use next-intl’s supported middleware handoff, cached once per request.
export default getRequestConfig(async options => {
	const resolved = options.locale || (await options.requestLocale)
	if (!hasLocale(routing.locales, resolved)) notFound()
	return { locale: resolved, messages: await catalogs[resolved](), timeZone: 'Europe/Paris' }
})
