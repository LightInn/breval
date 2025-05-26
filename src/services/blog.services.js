import Strapi from 'strapi-sdk-js'

// function getAllBlog

async function getAllBlogs() {
	const strapi = new Strapi({ url: 'https://breval-api.lightin.io' })

	const blo = await strapi.find('blogs', { populate: 'image' })

	const bloa = blo.data.map(data => {
		return {
			image: data.image?.url ?? '',
			publishedAt: data.publishedAt,
			describe: data.describe,
			content: data.content,
			title: data.title,
			tags: data.tags,
			url: data.url,
		}
	})

	// console.debug(bloa)

	return bloa
}

export default getAllBlogs
