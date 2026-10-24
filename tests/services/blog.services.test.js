import { getCMS } from '@/lib/cms'
import { getLocale } from '@/lib/get-locale'
import getAllBlogs from '@/services/blog.services'

jest.mock('@/lib/cms', () => ({ getCMS: jest.fn() }))
jest.mock('@/lib/get-locale', () => ({ getLocale: jest.fn() }))
const find = jest.fn()
beforeEach(() => {
	getCMS.mockResolvedValue({ find })
	getLocale.mockResolvedValue('fr')
})

test('reads all published articles in the requested locale with access control enabled', async () => {
	find.mockResolvedValue({ docs: [] })
	expect(await getAllBlogs()).toEqual([])
	expect(find).toHaveBeenCalledWith(
		expect.objectContaining({
			collection: 'blogs',
			locale: 'fr',
			fallbackLocale: 'en',
			pagination: false,
			overrideAccess: false,
			where: { _status: { equals: 'published' } },
		})
	)
})
test('maps uploaded media and Markdown to the existing article view model', async () => {
	find.mockResolvedValue({
		docs: [
			{
				id: 1,
				slug: 'article',
				title: 'Article',
				publishedAt: '2026-10-24T00:00:00Z',
				updatedAt: '2026-10-24T00:00:00Z',
				tags: ['web'],
				describe: 'Summary',
				content: '# Markdown',
				image: { url: '/api/media/file/test.png' },
			},
		],
	})
	expect(await getAllBlogs()).toEqual([
		{
			id: 1,
			url: 'article',
			title: 'Article',
			publishedAt: '2026-10-24T00:00:00Z',
			updatedAt: '2026-10-24T00:00:00Z',
			tags: ['web'],
			describe: 'Summary',
			content: '# Markdown',
			image: '/api/media/file/test.png',
			isPublished: true,
		},
	])
})
test('propagates database failures instead of silently replacing the site content with an empty list', async () => {
	find.mockRejectedValue(new Error('Database unavailable'))
	await expect(getAllBlogs()).rejects.toThrow('Database unavailable')
})
