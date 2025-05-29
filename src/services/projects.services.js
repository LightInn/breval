export async function getFeaturedProjects() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*&pagination[limit]=4',
		{ cache: 'default' } // Cache for 1 hour
	)
	const data = await res.json()
	return data.data
}

// lib/getProject.ts
export async function getProjects() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*',
		{ cache: 'default' } // Cache for 1 hour
	)
	const data = await res.json()
	return data.data
}
