'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'
export function ThemeProvider({ children, ...props }) {
	const [mounted, setMounted] = React.useState(false)
	React.useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) {
		return <>{children}</>
	}
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
