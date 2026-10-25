import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const invalidateContent: CollectionAfterChangeHook & CollectionAfterDeleteHook = ({ doc, req, collection }) => {
	// CLI imports have no Next.js request/cache context. Their deployment starts a fresh cache.
	if (req.payloadAPI === 'local' && !req.headers.has('cookie') && !req.headers.has('next-action')) return doc
	const tags = collection.slug === 'media' ? ['blogs', 'projects'] : [collection.slug]
	for (const tag of tags) revalidateTag(`cms:${tag}`, { expire: 0 })
	return doc
}
