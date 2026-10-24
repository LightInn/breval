import { sectionMetadata } from '@/i18n/metadata'
export async function generateMetadata({ params }) {
	return sectionMetadata('/experiment/slime', (await params).locale)
}
export default function SlimeLayout({ children }) {
	return <>{children}</>
}
