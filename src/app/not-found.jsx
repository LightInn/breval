'use client'

import { Home, Search } from 'lucide-react'

import Link from 'next/link'

import Interactive404 from '@/components/Global/interactive-404'
import { Button } from '@/components/ui/button'

export default function NotFound() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<Interactive404></Interactive404>
		</div>
	)
}
