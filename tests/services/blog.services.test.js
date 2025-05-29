import getAllBlogs from '@/services/blog.services'
import Strapi from 'strapi-sdk-js'

// Mock the Strapi SDK
const mockStrapiFind = jest.fn()
jest.mock('strapi-sdk-js', () => {
	return jest.fn().mockImplementation(() => {
		return { find: mockStrapiFind }
	})
})

describe('Blog Services (src/services/blog.services.js)', () => {
	beforeEach(() => {
		// Clear mock history before each test
		Strapi.mockClear()
		mockStrapiFind.mockClear()
	})

	describe('getAllBlogs', () => {
		test('should initialize Strapi and call find with correct parameters', async () => {
			mockStrapiFind.mockResolvedValueOnce({ data: [] }) // Return empty data for this test
			await getAllBlogs()

			expect(Strapi).toHaveBeenCalledTimes(1)
			expect(Strapi).toHaveBeenCalledWith({
				url: 'https://breval-api.lightin.io',
			})
			expect(mockStrapiFind).toHaveBeenCalledTimes(1)
			expect(mockStrapiFind).toHaveBeenCalledWith('blogs', {
				populate: 'image',
			})
		})

		test('should correctly map blog data from Strapi response', async () => {
			const mockRawBlogData = [
				{
					id: 1,

					// Strapi v4 typically wraps data in attributes
					publishedAt: '2023-01-01T00:00:00.000Z',
					image: { url: '/uploads/image1.jpg' }, // Nested structure for image
					describe: 'Test Description 1',
					content: 'Test Content 1',
					title: 'Test Title 1',
					tags: ['tag1', 'tag2'],
					url: '/blog/test-title-1',
				},
				{
					id: 2,

					publishedAt: '2023-01-02T00:00:00.000Z',
					image: null, // Test case for missing image
					describe: 'Test Description 2',
					content: 'Test Content 2',
					title: 'Test Title 2',
					tags: ['tag3'],
					url: '/blog/test-title-2',
				},
			]
			// The service seems to expect data directly, not nested in attributes, let's adjust mock response
			const mockServiceInputData = mockRawBlogData.map(item => ({
				...item,
				id: item.id,
			}))

			mockStrapiFind.mockResolvedValueOnce({ data: mockServiceInputData })

			const blogs = await getAllBlogs()

			expect(blogs).toHaveLength(2)
			expect(blogs[0]).toEqual({
				publishedAt: '2023-01-01T00:00:00.000Z',
				image: '/uploads/image1.jpg',
				describe: 'Test Description 1',
				content: 'Test Content 1',
				title: 'Test Title 1',
				tags: ['tag1', 'tag2'],
				url: '/blog/test-title-1',
			})
			expect(blogs[1]).toEqual({
				publishedAt: '2023-01-02T00:00:00.000Z',
				image: '', // Expect empty string for missing image
				describe: 'Test Description 2',
				content: 'Test Content 2',
				title: 'Test Title 2',
				tags: ['tag3'],
				url: '/blog/test-title-2',
			})
		})

		test('should handle empty data array from Strapi', async () => {
			mockStrapiFind.mockResolvedValueOnce({ data: [] })
			const blogs = await getAllBlogs()
			expect(blogs).toEqual([])
		})

		test('should handle Strapi find error gracefully (e.g., return empty array or throw)', async () => {
			// The actual implementation catches errors and returns an empty array
			mockStrapiFind.mockRejectedValueOnce(new Error('Strapi API error'))

			const blogs = await getAllBlogs()
			expect(blogs).toEqual([])
		})
	})
})
