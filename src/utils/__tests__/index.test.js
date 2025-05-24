import { cn, cx, sortBlogs } from '../index'

describe('cn function', () => {
	test('should handle simple string arguments', () => {
		expect(cn('class1', 'class2')).toBe('class1 class2')
	})

	test('should handle a mix of strings and objects', () => {
		expect(cn('class1', { class3: false, class2: true }, 'class4')).toBe(
			'class1 class2 class4'
		)
	})

	test('should handle conditional classes with falsy values in objects', () => {
		expect(
			cn({
				class3: undefined,
				class4: false,
				class1: true,
				class2: null,
				class5: 0,
			})
		).toBe('class1')
	})

	test('should correctly merge Tailwind CSS classes, resolving conflicts', () => {
		// Example from tailwind-merge documentation
		expect(cn('p-2', 'p-4')).toBe('p-4')
		expect(cn('px-2', 'px-4', 'py-2')).toBe('px-4 py-2')
		expect(cn('text-black', 'text-white')).toBe('text-white')
		expect(cn('bg-red-500', 'bg-blue-500', 'p-2', 'p-4')).toBe(
			'bg-blue-500 p-4'
		)
	})
})

describe('sortBlogs function', () => {
	test('should return an empty array when given an empty array', () => {
		expect(sortBlogs([])).toEqual([])
	})

	test('should return the same array if it contains a single blog post', () => {
		const singleBlog = [
			{ publishedAt: '2023-01-01T00:00:00.000Z', title: 'Blog A' },
		]
		expect(sortBlogs(singleBlog)).toEqual(singleBlog)
	})

	test('should sort multiple blog posts by publishedAt in descending order', () => {
		const blogs = [
			{ publishedAt: '2023-01-15T10:00:00.000Z', title: 'Blog A' }, // Earlier
			{ publishedAt: '2023-03-20T12:00:00.000Z', title: 'Blog B' }, // Later
			{ publishedAt: '2022-12-25T08:00:00.000Z', title: 'Blog C' }, // Oldest
			{ publishedAt: '2023-03-20T10:00:00.000Z', title: 'Blog D' }, // Same date as B, but earlier time
		]
		const expectedSortedBlogs = [
			{ publishedAt: '2023-03-20T12:00:00.000Z', title: 'Blog B' },
			{ publishedAt: '2023-03-20T10:00:00.000Z', title: 'Blog D' },
			{ publishedAt: '2023-01-15T10:00:00.000Z', title: 'Blog A' },
			{ publishedAt: '2022-12-25T08:00:00.000Z', title: 'Blog C' },
		]
		expect(sortBlogs(blogs)).toEqual(expectedSortedBlogs)
	})

	test("should handle posts with identical publishedAt times consistently (though order isn't guaranteed by sort)", () => {
		const blogs = [
			{ publishedAt: '2023-01-15T10:00:00.000Z', title: 'Blog A' },
			{ publishedAt: '2023-01-15T10:00:00.000Z', title: 'Blog B' },
		]
		// In this case, the original order might be preserved or swapped.
		// We just ensure it contains the same elements.
		// A more robust test might check if compareDesc returns 0 for these.
		// For now, this verifies the function doesn't crash.
		const sorted = sortBlogs(blogs)
		expect(sorted).toContainEqual({
			publishedAt: '2023-01-15T10:00:00.000Z',
			title: 'Blog A',
		})
		expect(sorted).toContainEqual({
			publishedAt: '2023-01-15T10:00:00.000Z',
			title: 'Blog B',
		})
		expect(sorted.length).toBe(2)
	})
})

describe('cx function', () => {
	test('should concatenate multiple string arguments', () => {
		expect(cx('class1', 'class2', 'class3')).toBe('class1 class2 class3')
	})

	test('should filter out falsy values', () => {
		expect(cx('class1', null, 'class2', undefined, false, 'class3', '')).toBe(
			'class1 class2 class3'
		)
	})

	test('should return an empty string if all arguments are falsy', () => {
		expect(cx(null, undefined, false, '')).toBe('')
	})

	test('should handle a single truthy argument', () => {
		expect(cx('class1')).toBe('class1')
	})

	test('should handle a single falsy argument', () => {
		expect(cx(null)).toBe('')
	})

	test('should handle a mix of truthy and falsy values at the beginning and end', () => {
		expect(cx(null, 'class1', 'class2', false, 'class3', undefined)).toBe(
			'class1 class2 class3'
		)
	})
})
