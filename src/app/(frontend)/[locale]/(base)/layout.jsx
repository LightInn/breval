import CursorBlob from '@/components/Global/cursor-blob'
import Footer from '@/components/Global/footer'
import Navigation from '@/components/Global/navigation'
import { ThemeProvider } from '@/components/Global/theme-provider'
import { getDictionary } from '@/lib/get-dictionary'
import { getLocale } from '@/lib/get-locale'
export default async function RootLayout({ children }) {
	const locale = await getLocale()
	const dict = await getDictionary(locale)
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			disableTransitionOnChange={false}
			enableSystem={false}
			forcedTheme={'dark'}
		>
			<CursorBlob />
			<Navigation dict={dict} />
			{children}
			<Footer />
		</ThemeProvider>
	)
}
