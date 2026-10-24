export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const localeLabels = { en: 'English', fr: 'Français' }
