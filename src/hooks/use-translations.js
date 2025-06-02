'use client'

import { useState, useEffect } from 'react'

// Client-side locale detection
function getClientLocale() {
	if (typeof window === 'undefined') return 'en'

	const language = navigator.language || navigator.languages?.[0] || 'en'
	const langCode = language.split('-')[0]

	// Return 'fr' if French, otherwise default to 'en'
	// return langCode === 'fr' ? 'fr' : 'en'
	return 'fr'
}

export function useTranslations() {
	const [dict, setDict] = useState(null)
	const [locale, setLocale] = useState('en')

	useEffect(() => {
		const clientLocale = getClientLocale()
		setLocale(clientLocale)

		// Dynamically import the appropriate dictionary
		const loadDict = async () => {
			try {
				const dictionary =
					clientLocale === 'fr'
						? await import('@/lib/dictionaries/fr.json')
						: await import('@/lib/dictionaries/en.json')
				setDict(dictionary.default)
			} catch (error) {
				// Fallback to English if there's an error
				const fallback = await import('@/lib/dictionaries/en.json')
				setDict(fallback.default)
			}
		}

		loadDict()
	}, [])

	const t = key => {
		if (!dict) return key

		const keys = key.split('.')
		let value = dict

		for (const k of keys) {
			if (value && typeof value === 'object' && k in value) {
				value = value[k]
			} else {
				return key // Return the key if translation is not found
			}
		}

		return typeof value === 'string' ? value : key
	}

	return { t, locale, isLoaded: dict !== null }
}
