type Project = {
	id?: number | string
	date?: string | null
	createdAt?: string | null
	legacyId?: string | null
	live_url?: string | null
	url?: string | null
	skills?: unknown
	creators?: unknown
	main_media?: unknown
	description?: string | null
	short_description?: string | null
}
const year = 365.25 * 24 * 60 * 60 * 1000
const prototypes = new Set(['xd.adobe.com', 'figma.com', 'www.figma.com', 'youtube.com', 'www.youtube.com', 'youtu.be'])
const packages = new Set(['crates.io', 'npmjs.com', 'www.npmjs.com', 'github.com', 'www.better-auth.com'])
function publicLinkPoints(value?: string | null) {
	try {
		const url = new URL(value || '')
		if (!['https:', 'http:'].includes(url.protocol)) return 0
		if (prototypes.has(url.hostname)) return 8
		if (packages.has(url.hostname)) return 18
		return 30
	} catch {
		return 0
	}
}
/** A 0–100 score from project facts. Legacy editorial priorities never enter the calculation. */
export function projectPriority(project: Project, now: number = Date.now()) {
	// Imported createdAt is the migration date, not the project's creation date.
	const date = Date.parse(project.date || (!project.legacyId ? project.createdAt || '' : ''))
	const age = Number.isFinite(date) ? Math.max(0, (now - date) / year) : 3
	const recency = 40 * 2 ** (-age / 3)
	const live = publicLinkPoints(project.live_url) || Math.min(8, publicLinkPoints(project.url))
	const skills = Array.isArray(project.skills)
		? new Set(
				project.skills
					.filter((s): s is string => typeof s === 'string' && Boolean(s.trim()))
					.map(s => s.trim().toLowerCase())
			).size
		: 0
	const contributors = Array.isArray(project.creators)
		? new Set(
				project.creators
					.map(person => (typeof person === 'string' ? person : person?.creator || person?.site))
					.filter(Boolean)
			).size
		: 0
	const collaboration = Math.min(10, contributors * 5)
	const breadth = 10 * Math.min(1, skills / 8)
	const presentation =
		(project.main_media ? 5 : 0) + (project.description?.trim() ? 3 : 0) + (project.short_description?.trim() ? 2 : 0)
	return Math.round((recency + live + collaboration + breadth + presentation) * 100) / 100
}
export function prioritizeProjects<T extends Project>(
	projects: T[],
	reference: Project[] = projects,
	now: number = Date.now()
) {
	const scores = new Map(reference.map(project => [project.id, projectPriority(project, now)]))
	return projects
		.map(project => ({ ...project, priorityScore: scores.get(project.id) ?? projectPriority(project, now) }))
		.sort(
			(a, b) => b.priorityScore - a.priorityScore || String(a.id).localeCompare(String(b.id), 'en', { numeric: true })
		)
}
