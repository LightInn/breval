'use client'
import { useTranslations } from 'next-intl'
export default function LocalizedText({ id }: { id: string }) {
	const t = useTranslations('ui')
	return t(id)
}
