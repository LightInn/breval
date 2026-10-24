import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload, type Payload } from 'payload'
import { closeCMS } from '../src/lib/close-cms'
import config from '../src/payload.config'
import type { Blog, Project } from '../src/payload-types'

type LegacyMedia = { url: string; alternativeText?: string; name?: string; mime?: string }
type LegacyDoc = {
	id: number
	documentId?: string
	title: string
	publishedAt?: string
	url?: string
	slug?: string
	describe?: string
	content?: string
	tags?: Blog['tags']
	description?: string
	short_description?: string
	date?: string
	live_url?: string
	creators?: Project['creators']
	skills?: Project['skills']
	category?: Project['category']
	rank?: number
	image?: LegacyMedia
	main_media?: LegacyMedia
	media?: LegacyMedia[]
}
type Locale = 'en' | 'fr'
type Snapshot = {
	source: string
	media?: LegacyMedia[]
	locales: Record<Locale, { blogs: LegacyDoc[]; projets: LegacyDoc[] }>
}

function createMediaImporter(payload: Payload, source: string) {
	const cache = new Map<string, Promise<number>>()
	let created = 0
	async function download(file: LegacyMedia, sourceURL: string) {
		const existing = await payload.find({ collection: 'media', where: { sourceURL: { equals: sourceURL } }, limit: 1 })
		if (existing.docs[0]) return existing.docs[0].id
		const response = await fetch(sourceURL, { signal: AbortSignal.timeout(120000) })
		if (!response.ok) throw new Error(`Media download failed (${response.status}): ${sourceURL}`)
		const data = Buffer.from(await response.arrayBuffer())
		const saved = await payload.create({
			collection: 'media',
			data: { alt: file.alternativeText || file.name || '', sourceURL },
			file: {
				data,
				mimetype: file.mime || response.headers.get('content-type') || 'application/octet-stream',
				name: path.basename(file.name || new URL(sourceURL).pathname),
				size: data.length,
			},
		})
		created++
		return saved.id
	}
	return {
		count: () => created,
		import(file: LegacyMedia | null | undefined) {
			if (!file?.url) return Promise.resolve(undefined)
			const url = new URL(file.url, source).href
			let saved = cache.get(url)
			if (!saved) {
				saved = download(file, url)
				cache.set(url, saved)
			}
			return saved
		},
	}
}
type MediaImporter = ReturnType<typeof createMediaImporter>

async function recordData(record: LegacyDoc, collection: 'blogs' | 'projects', media: MediaImporter) {
	const common = {
		title: record.title,
		legacyId: String(record.documentId || record.id),
		_status: record.publishedAt ? ('published' as const) : ('draft' as const),
	}
	if (collection === 'blogs')
		return {
			...common,
			slug: record.url || undefined,
			describe: record.describe,
			content: record.content,
			tags: record.tags,
			publishedAt: record.publishedAt,
			image: await media.import(record.image),
		}
	return {
		...common,
		slug: record.slug || undefined,
		description: record.description,
		short_description: record.short_description,
		date: record.date,
		url: record.url,
		live_url: record.live_url,
		creators: record.creators,
		skills: record.skills,
		category: record.category || 'Web Development',
		rank: record.rank ?? 10,
		main_media: await media.import(record.main_media),
		media: await Promise.all((record.media || []).map(file => media.import(file))),
	}
}

async function importCollection(
	payload: Payload,
	records: LegacyDoc[],
	collection: 'blogs' | 'projects',
	locale: Locale,
	media: MediaImporter
) {
	for (const record of records) {
		const legacyId = String(record.documentId || record.id)
		const existing = await payload.find({ collection, locale, where: { legacyId: { equals: legacyId } }, limit: 1 })
		const data = await recordData(record, collection, media)
		if (existing.docs[0]) await payload.update({ collection, id: existing.docs[0].id, locale, data })
		else await payload.create({ collection, locale, data })
	}
	return records.length
}

async function main() {
	const snapshot: Snapshot = JSON.parse(await readFile(process.argv[2] || '.data/strapi-export.json', 'utf8'))
	const payload = await getPayload({ config })
	const media = createMediaImporter(payload, snapshot.source)
	const summary = { blogs: 0, projects: 0, media: 0 }
	try {
		for (const file of snapshot.media || []) await media.import(file)
		for (const locale of ['en', 'fr'] as const) {
			const content = snapshot.locales[locale]
			if (!content) continue
			summary.blogs += await importCollection(payload, content.blogs || [], 'blogs', locale, media)
			summary.projects += await importCollection(payload, content.projets || [], 'projects', locale, media)
		}
		summary.media = media.count()
		console.info('Imported:', summary)
	} finally {
		await closeCMS(payload)
	}
}
main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
