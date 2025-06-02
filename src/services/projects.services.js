import { getLocale } from '@/lib/get-locale'

export async function getFeaturedProjects() {
	const locale = await getLocale()

	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*&pagination[limit]=4&locale=' +
			locale,
		{ cache: 'default' } // Cache for 1 hour
	)
	const data = await res.json()
	return data.data
}

// lib/getProject.ts
export async function getProjects() {
	const locale = await getLocale()

	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*&locale=' +
			locale,
		{ cache: 'default' } // Cache for 1 hour
	)
	const data = await res.json()
	return data.data
}
