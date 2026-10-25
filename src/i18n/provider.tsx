'use client'
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import type { ReactNode } from 'react'
export default function WebsiteIntl({
	locale,
	messages,
	children,
}: {
	locale: string
	messages: AbstractIntlMessages
	children: ReactNode
}) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
			{children}
		</NextIntlClientProvider>
	)
}
