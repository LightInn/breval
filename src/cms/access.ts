import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)
export const publishedOrAuthenticated: Access = ({ req }) => {
	if (req.user) return true
	if (req.payloadAPI !== 'local') return false
	return { _status: { equals: 'published' } }
}

export const mediaRead: Access = ({ req }) =>
	req.payloadAPI === 'local' || Boolean(req.user) || req.pathname.includes('/media/file/')
