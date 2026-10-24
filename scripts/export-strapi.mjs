import { mkdir, writeFile } from 'node:fs/promises'

const source = process.env.STRAPI_EXPORT_URL || 'https://breval-api.lightin.io'
const snapshot = { exportedAt: new Date().toISOString(), source, locales: {} }
for (const locale of ['en', 'fr']) {
	snapshot.locales[locale] = {}
	for (const collection of ['blogs', 'projets']) {
		const docs = []
		let page = 1
		let pageCount = 1
		do {
			const url = new URL(`/api/${collection}`, source)
			for (const [key, value] of Object.entries({
				locale,
				populate: '*',
				'pagination[pageSize]': '100',
				'pagination[page]': String(page),
			}))
				url.searchParams.set(key, value)
			const headers = process.env.STRAPI_EXPORT_TOKEN
				? { Authorization: `Bearer ${process.env.STRAPI_EXPORT_TOKEN}` }
				: {}
			const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) })
			if (!response.ok) throw new Error(`Export ${collection}/${locale} failed: ${response.status}`)
			const body = await response.json()
			if (!Array.isArray(body.data)) throw new Error('Invalid export response')
			docs.push(...body.data)
			pageCount = body.meta?.pagination?.pageCount || 0
			page++
		} while (page <= pageCount)
		snapshot.locales[locale][collection] = docs
		console.info(`${locale}/${collection}: ${docs.length}`)
	}
}
await mkdir('.data', { recursive: true })
await writeFile(process.argv[2] || '.data/strapi-export.json', JSON.stringify(snapshot, null, 2))
