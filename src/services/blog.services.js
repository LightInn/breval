import Strapi from 'strapi-sdk-js'

// function getAllBlog

async function getAllBlogs() {
	try {
		const strapi = new Strapi({ url: 'https://breval-api.lightin.io' })

		const blo = await strapi.find('blogs', { populate: 'image' })

		if (!blo || !blo.data || !Array.isArray(blo.data)) {
			console.warn('Invalid API response:', blo)
			return []
		}

		const bloa = blo.data
			.map(data => {
				if (!data || !data.title) {
					console.warn('Invalid blog data:', data)
					return null
				}

				return {
					url: data.url || data.title?.toLowerCase().replace(/\s+/g, '-'),
					publishedAt: data.publishedAt || new Date().toISOString(),
					tags: Array.isArray(data.tags) ? data.tags : [],
					describe: data.describe || '',
					image: data.image?.url ?? '',
					content: data.content || '',
					title: data.title,
				}
			})
			.filter(Boolean) // Remove null entries

		return bloa
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return []
	}
}

export default getAllBlogs
