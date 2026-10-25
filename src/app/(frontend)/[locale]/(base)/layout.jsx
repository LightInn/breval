import { Suspense } from 'react'
import CursorBlob from '@/components/Global/cursor-blob'
import Footer from '@/components/Global/footer'
import Navigation from '@/components/Global/navigation'
import { ThemeProvider } from '@/components/Global/theme-provider'
import { getDictionary } from '@/lib/get-dictionary'
export default async function RootLayout({ children, params }) {
	const { locale } = await params
	const dict = await getDictionary(locale)
	return (
		<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange={false} enableSystem>
			<CursorBlob />
			<Suspense fallback={null}>
				<Navigation dict={dict} />
			</Suspense>
			{children}
			<Suspense fallback={null}>
				<Footer locale={locale} />
			</Suspense>
		</ThemeProvider>
	)
}
