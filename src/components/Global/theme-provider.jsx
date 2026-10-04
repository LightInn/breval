'use client'

import { MotionConfig } from 'framer-motion'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }) {
	return (
		<NextThemesProvider {...props}>
			<MotionConfig reducedMotion="user">{children}</MotionConfig>
		</NextThemesProvider>
	)
}
