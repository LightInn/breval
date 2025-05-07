import Strapi from 'strapi-sdk-js'

// function getAllBlog

async function getAllBlogs() {
	const strapi = new Strapi({ url: 'https://breval-api.lightin.io' })

	const blo = await strapi.find('blogs', { populate: 'image' })

	const bloa = blo.data.map(data => {
		return {
			image: data.attributes.image.data?.attributes.url ?? '',
			publishedAt: data.attributes.publishedAt,
			describe: data.attributes.describe,
			content: data.attributes.content,
			title: data.attributes.title,
			tags: data.attributes.tags,
			url: data.attributes.url,
		}
	})

	// console.debug(bloa)

	return bloa
}

export default getAllBlogs
