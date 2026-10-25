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
test('lists published projects by automatic priority in the current locale', async () => {
	await getProjects()
	expect(find).toHaveBeenCalledWith(
		expect.objectContaining({ collection: 'projects', locale: 'fr', sort: 'id', overrideAccess: false })
	)
})
test('returns at most four featured projects', async () => {
	find.mockResolvedValue({ docs: [1, 2, 3, 4, 5].map(id => ({ id })) })
	expect((await getFeaturedProjects()).map(project => project.id)).toEqual([1, 2, 3, 4])
})
test('filters a project by slug and explicit locale', async () => {
	find.mockResolvedValue({ docs: [{ title: 'Projet', slug: 'projet' }] })
	expect(await getProject('projet', 'fr')).toEqual(
		expect.objectContaining({ title: 'Projet', priorityScore: expect.any(Number) })
	)
	expect(find.mock.calls[0][0].locale).toBe('fr')
})
test('returns null for an unknown slug', async () => {
	expect(await getProject('missing', 'en')).toBeNull()
})
