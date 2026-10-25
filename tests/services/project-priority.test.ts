import { prioritizeProjects, projectPriority } from '@/lib/project-priority'

const now = Date.parse('2026-10-25T00:00:00Z')
const base = { id: 1, date: '2025-01-01', live_url: 'https://example.com', skills: ['React'], creators: [] }
test('recent projects outrank otherwise identical older work', () => {
	expect(projectPriority(base, now)).toBeGreaterThan(projectPriority({ ...base, date: '2021-01-01' }, now))
})
test('a published product link contributes more than a prototype or invalid link', () => {
	expect(projectPriority(base, now)).toBeGreaterThan(
		projectPriority({ ...base, live_url: 'https://xd.adobe.com/view/demo' }, now)
	)
	expect(projectPriority({ ...base, live_url: 'javascript:alert(1)' }, now)).toBe(
		projectPriority({ ...base, live_url: null }, now)
	)
})
test('contributors and unique skills improve ranking without unlimited tag inflation', () => {
	const rich = { ...base, creators: [{ creator: 'Alice' }], skills: ['React', 'TypeScript'] }
	expect(projectPriority(rich, now)).toBeGreaterThan(projectPriority(base, now))
	expect(projectPriority({ ...base, skills: ['React', ' react ', 'REACT'] }, now)).toBe(projectPriority(base, now))
	expect(
		projectPriority({ ...base, skills: Array.from({ length: 100 }, (_, i) => String(i)) }, now)
	).toBeLessThanOrEqual(100)
})
test('migration timestamps and legacy manual scores never control ranking', () => {
	const imported = { ...base, date: null, legacyId: 'strapi-1', createdAt: '2026-10-25' }
	expect(projectPriority(imported, now)).toBe(projectPriority({ ...imported, createdAt: '2020-01-01' }, now))
	const projects = [
		{ ...base, id: 1, rank: 0 },
		{ ...base, id: 2, rank: 20 },
	]
	expect(prioritizeProjects(projects, projects, now).map(p => p.id)).toEqual([1, 2])
})
test('translations use the canonical score and stable ID tie breaks without changing inputs', () => {
	const projects = [
		{ ...base, id: 2, live_url: null },
		{ ...base, id: 1, live_url: null },
	]
	const copy = JSON.parse(JSON.stringify(projects))
	const ranked = prioritizeProjects(
		projects,
		[
			{ ...base, id: 1 },
			{ ...base, id: 2 },
		],
		now
	)
	expect(ranked.map(p => p.id)).toEqual([1, 2])
	expect(ranked[0].priorityScore).toBe(projectPriority(base, now))
	expect(projects).toEqual(copy)
})
