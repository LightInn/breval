import 'server-only'

const dictionaries = {
	en: () => import('./dictionaries/en.json').then(module => module.default),
	fr: () => import('./dictionaries/fr.json').then(module => module.default),
}

export const getDictionary = async locale => {
	// Default to 'en' if locale is not supported
	const supportedLocale = dictionaries[locale] ? locale : 'en'
	return dictionaries[supportedLocale]()
}
