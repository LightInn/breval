import { revalidateTag } from 'next/cache'
import { mediaRead, publishedOrAuthenticated } from '@/cms/access'
import { invalidateContent } from '@/cms/revalidate'

beforeEach(() => jest.clearAllMocks())
test('anonymous HTTP reads are disabled while local reads remain published-only', () => {
	expect(publishedOrAuthenticated({ req: { payloadAPI: 'REST' } } as never)).toBe(false)
	expect(publishedOrAuthenticated({ req: { payloadAPI: 'GraphQL' } } as never)).toBe(false)
	expect(publishedOrAuthenticated({ req: { payloadAPI: 'local' } } as never)).toEqual({
		_status: { equals: 'published' },
	})
	expect(publishedOrAuthenticated({ req: { payloadAPI: 'REST', user: { id: 1 } } } as never)).toBe(true)
})
test('public media files remain readable without exposing the media metadata API', () => {
	expect(mediaRead({ req: { payloadAPI: 'REST', pathname: '/api/media/file/cover.png' } } as never)).toBe(true)
	expect(mediaRead({ req: { payloadAPI: 'REST', pathname: '/api/media' } } as never)).toBe(false)
})
test('admin writes expire affected cached data immediately', () => {
	const doc = { id: 1 }
	expect(
		invalidateContent({
			doc,
			req: { payloadAPI: 'REST', headers: new Headers() },
			collection: { slug: 'projects' },
		} as never)
	).toBe(doc)
	expect(revalidateTag).toHaveBeenCalledWith('cms:projects', { expire: 0 })
})
test('media edits invalidate article and project caches', () => {
	invalidateContent({
		doc: {},
		req: { payloadAPI: 'REST', headers: new Headers() },
		collection: { slug: 'media' },
	} as never)
	expect(revalidateTag).toHaveBeenCalledWith('cms:blogs', { expire: 0 })
	expect(revalidateTag).toHaveBeenCalledWith('cms:projects', { expire: 0 })
})
test('standalone imports do not require a Next.js request context', () => {
	invalidateContent({
		doc: {},
		req: { payloadAPI: 'local', headers: new Headers() },
		collection: { slug: 'blogs' },
	} as never)
	expect(revalidateTag).not.toHaveBeenCalled()
})
