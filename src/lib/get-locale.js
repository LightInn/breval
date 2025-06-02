import { headers } from 'next/headers'

export async function getLocale() {
	// Get the Accept-Language header from the request
	const headersList = await headers()
	const acceptLanguage = headersList.get('accept-language') || ''

	// Parse the accept-language header to find the preferred language
	const languages = acceptLanguage
		.split(',')
		.map(lang => {
			const [code, quality = '1'] = lang.trim().split(';q=')
			return {
				code: code.split('-')[0], // Get only the language part (e.g., 'fr' from 'fr-FR')
				quality: parseFloat(quality),
			}
		})
		.sort((a, b) => b.quality - a.quality)

	// Supported locales
	const supportedLocales = ['en', 'fr']

	// Find the first supported language
	for (const lang of languages) {
		if (supportedLocales.includes(lang.code)) {
			return lang.code
		}
	}

	// Default to English if no supported language is found
	return 'en'
}
