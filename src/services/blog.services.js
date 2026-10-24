import { cache } from 'react'
import { getCMS } from '@/lib/cms'
import { getLocale } from '@/lib/get-locale'

const findBlogs = cache(async locale => {
	const cms = await getCMS()
	const { docs } = await cms.find({
		collection: 'blogs',
		locale,
		fallbackLocale: 'en',
		depth: 1,
		pagination: false,
		sort: '-publishedAt',
		overrideAccess: false,
		where: { _status: { equals: 'published' } },
	})
	return docs.map(blog => ({
		id: blog.id,
		url: blog.slug,
		title: blog.title,
		publishedAt: blog.publishedAt || blog.createdAt,
		updatedAt: blog.updatedAt,
		tags: Array.isArray(blog.tags) ? blog.tags : [],
		describe: blog.describe || '',
		image: typeof blog.image === 'object' ? blog.image?.url || '' : '',
		content: blog.content || '',
		isPublished: true,
	}))
})

export default async function getAllBlogs(locale) {
	return await findBlogs(locale || (await getLocale()))
}
