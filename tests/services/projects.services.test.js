import { getCMS } from '@/lib/cms'
import { getLocale } from '@/lib/get-locale'
import { getFeaturedProjects, getProject, getProjects } from '@/services/projects.services'

jest.mock('@/lib/cms', () => ({ getCMS: jest.fn() }))
jest.mock('@/lib/get-locale', () => ({ getLocale: jest.fn() }))
const find = jest.fn()
beforeEach(() => {
	getCMS.mockResolvedValue({ find })
	getLocale.mockResolvedValue('fr')
	find.mockResolvedValue({ docs: [] })
})
test('lists published projects by rank in the current locale', async () => {
	await getProjects()
	expect(find).toHaveBeenCalledWith(
		expect.objectContaining({ collection: 'projects', locale: 'fr', sort: '-rank', overrideAccess: false })
	)
})
test('returns at most four featured projects', async () => {
	find.mockResolvedValue({ docs: [1, 2, 3, 4, 5] })
	expect(await getFeaturedProjects()).toEqual([1, 2, 3, 4])
})
test('filters a project by slug and explicit locale', async () => {
	find.mockResolvedValue({ docs: [{ title: 'Projet' }] })
	expect(await getProject('projet', 'fr')).toEqual({ title: 'Projet' })
	expect(find.mock.calls[0][0].where.and).toContainEqual({ slug: { equals: 'projet' } })
})
test('returns null for an unknown slug', async () => {
	expect(await getProject('missing', 'en')).toBeNull()
})
