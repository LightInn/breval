// Removed 'use client' as this page component will fetch server-side data

import Interactive404 from '@/components/Global/interactive-404'
import { getDictionary } from '@/lib/get-dictionary'
import { getLocale } from '@/lib/get-locale'
export default async function NotFound() {
	const locale = getLocale() // Assuming getLocale is synchronous or handled by middleware
	const dict = await getDictionary(locale)
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<Interactive404 dict={dict} />
		</div>
	)
}
