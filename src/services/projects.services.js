// lib/getProject.ts
export async function getProjects() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*',
		{ cache: 'no-store' }
	)
	const data = await res.json()
	return data.data
}

export async function getFeaturedProjects() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=rank%3Adesc&populate=*&pagination[limit]=8',
		{ cache: 'no-store' }
	)
	const data = await res.json()
	return data.data
}
