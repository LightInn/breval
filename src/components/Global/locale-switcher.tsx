'use client'

import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { type Locale, locales } from '@/i18n/locales'
import { usePathname, useRouter } from '@/i18n/navigation'
import { resolveLocalePath } from '@/i18n/switch-locale'

export default function LocaleSwitcher() {
	const locale = useLocale() as Locale
	const t = useTranslations('navigation')
	const pathname = usePathname()
	const query = useSearchParams()
	const router = useRouter()
	const [pending, startTransition] = useTransition()
	function switchTo(target: Locale) {
		startTransition(async () => {
			const next = await resolveLocalePath(pathname, locale, target)
			router.replace(`${next}${query.size ? `?${query.toString()}` : ''}${window.location.hash}`, {
				locale: target,
				scroll: false,
			})
		})
	}
	return (
		<fieldset
			className="flex shrink-0 rounded-full border border-primary/25 bg-card/80 p-1 backdrop-blur-md"
			aria-label={t('language')}
			aria-busy={pending}
		>
			{locales.map(language => (
				<button
					key={language}
					type="button"
					disabled={pending}
					aria-pressed={language === locale}
					aria-label={language === 'fr' ? 'Français' : 'English'}
					onClick={() => switchTo(language)}
					className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${language === locale ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
				>
					{language.toUpperCase()}
				</button>
			))}
		</fieldset>
	)
}
