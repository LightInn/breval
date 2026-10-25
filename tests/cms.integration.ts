import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import path from 'node:path'
import { after, test } from 'node:test'
import type { SQLiteAdapter } from '@payloadcms/db-sqlite'
import { getPayload } from 'payload'
import sharp from 'sharp'
import type { Blog, User } from '../src/payload-types'

await mkdir('.data', { recursive: true })
const directory = await mkdtemp(path.resolve('.data/cms-test-'))
Object.assign(process.env, { NODE_ENV: 'test' })
process.env.PAYLOAD_SECRET = 'isolated-cms-test-secret-at-least-32-characters'
process.env.DATABASE_URL = `file:${path.join(directory, 'test.db').replaceAll('\\', '/')}`
process.env.PAYLOAD_MEDIA_DIR = path.join(directory, 'media')
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
after(async () => {
	const adapter = payload.db as unknown as SQLiteAdapter
	await payload.destroy()
	adapter.client.close()
	await rm(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
})

test('Payload SQLite access, translations and local uploads', async t => {
	let admin: User
	let blog: Blog
	await t.test('anonymous visitors cannot create content or users', async () => {
		await assert.rejects(
			payload.create({ collection: 'blogs', overrideAccess: false, data: { title: 'Forbidden', slug: 'forbidden' } })
		)
		await assert.rejects(
			payload.create({
				collection: 'users',
				overrideAccess: false,
				data: { email: 'forbidden@example.invalid', password: 'Do-not-create-123!' },
			})
		)
	})
	await t.test('an administrator can authenticate', async () => {
		admin = await payload.create({
			collection: 'users',
			data: { email: 'test@example.invalid', password: 'Local-Test-Password-123!' },
		})
		const login = await payload.login({
			collection: 'users',
			data: { email: admin.email, password: 'Local-Test-Password-123!' },
		})
		assert.ok(login.token)
	})
	await t.test('drafts stay private even with explicit public draft filters', async () => {
		blog = await payload.create({
			collection: 'blogs',
			data: { title: 'Private draft', slug: 'draft', _status: 'draft' },
		})
		const result = await payload.find({
			collection: 'blogs',
			draft: true,
			overrideAccess: false,
			where: { slug: { equals: 'draft' } },
		})
		assert.equal(result.totalDocs, 0)
	})
	await t.test('published Markdown and French translations are readable publicly', async () => {
		await payload.update({
			collection: 'blogs',
			id: blog.id,
			locale: 'en',
			data: { title: 'English article', slug: 'article', content: '# English', _status: 'published' },
		})
		await payload.update({
			collection: 'blogs',
			id: blog.id,
			locale: 'fr',
			data: { title: 'Article francais', slug: 'article-fr', content: '# French', _status: 'published' },
		})
		const result = await payload.find({ collection: 'blogs', locale: 'fr', overrideAccess: false })
		assert.equal(result.docs[0].title, 'Article francais')
		assert.equal(result.docs[0].content, '# French')
		assert.ok(result.docs[0].publishedAt)
	})
	await t.test('project slugs, ordering and localized fields survive reads', async () => {
		const project = await payload.create({
			collection: 'projects',
			data: { title: 'Project', slug: 'project', rank: 17, skills: ['Next.js'], _status: 'published' },
		})
		await payload.update({
			collection: 'projects',
			id: project.id,
			locale: 'fr',
			data: { title: 'Projet', _status: 'published' },
		})
		const result = await payload.find({ collection: 'projects', locale: 'fr', sort: 'id', overrideAccess: false })
		assert.equal(result.docs[0].slug, 'project')
		assert.equal(result.docs[0].title, 'Projet')
		assert.equal(typeof result.docs[0].priorityScore, 'number')
		assert.deepEqual(result.docs[0].skills, ['Next.js'])
	})
	await t.test('local uploads populate article relationships', async () => {
		const data = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#ffffff' } })
			.png()
			.toBuffer()
		const media = await payload.create({
			collection: 'media',
			data: { alt: 'Test image' },
			file: { data, name: 'test.png', mimetype: 'image/png', size: data.length },
		})
		await payload.update({ collection: 'blogs', id: blog.id, locale: 'en', data: { image: media.id } })
		const result = await payload.findByID({
			collection: 'blogs',
			id: blog.id,
			locale: 'en',
			depth: 1,
			overrideAccess: false,
		})
		assert.ok(typeof result.image === 'object' && result.image.url)
		assert.equal(new URL(result.image.url, 'http://localhost:3000').pathname, '/api/media/file/test.png')
	})
})
