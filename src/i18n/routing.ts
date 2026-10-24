import { defineRouting } from 'next-intl/routing'
import { defaultLocale, locales } from './locales'

export const routing = defineRouting({
	locales,
	defaultLocale,
	localePrefix: 'always',
	localeCookie: { name: 'NEXT_LOCALE', maxAge: 31536000, sameSite: 'lax' },
})
