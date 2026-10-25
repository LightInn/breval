'use client'
import { useMessages } from 'next-intl'
import Interactive404 from '@/components/Global/interactive-404'
export default function NotFound() {
	const messages = useMessages()
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<Interactive404 dict={{ notFound: messages.notFound }} />
		</div>
	)
}
