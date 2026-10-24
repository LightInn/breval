import { sectionMetadata } from '@/i18n/metadata'
export async function generateMetadata({ params }) {
	return sectionMetadata('/artist', (await params).locale)
}
export default function ArtistLayout({ children }) {
	return <>{children}</>
}
