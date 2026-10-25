import LegalPage from '@/components/Global/legal-page'
import { localizedAlternates } from '@/i18n/metadata'
import { legalCopy } from '@/lib/legal-copy'

type Props = { params: Promise<{ locale: 'en' | 'fr' }> }
export async function generateMetadata({ params }: Props) {
	const { locale } = await params
	const copy = legalCopy[locale === 'fr' ? 'fr' : 'en'].terms
	return { title: copy.title, description: copy.intro, alternates: localizedAlternates('/terms', locale) }
}
export default async function Page({ params }: Props) {
	const { locale } = await params
	return <LegalPage locale={locale} kind="terms" />
}
