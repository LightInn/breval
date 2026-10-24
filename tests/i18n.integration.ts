import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { NextRequest } from 'next/server'
import { createTranslator } from 'next-intl'
import createMiddleware from 'next-intl/middleware'
import { routing } from '../src/i18n/routing'

const handle = createMiddleware(routing)

test('legacy URLs negotiate a locale while preserving query parameters', () => {
	const response = handle(
		new NextRequest('http://localhost/projects?tag=web', { headers: { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' } })
	)
	assert.equal(response.status, 307)
	assert.equal(response.headers.get('location'), 'http://localhost/fr/projects?tag=web')
})
test('an explicit URL locale wins over the browser preference', () => {
	const response = handle(new NextRequest('http://localhost/en/projects', { headers: { 'accept-language': 'fr' } }))
	assert.equal(response.status, 200)
	assert.equal(response.headers.get('location'), null)
})
test('the saved language wins over Accept-Language on legacy URLs', () => {
	const response = handle(
		new NextRequest('http://localhost/blog', { headers: { cookie: 'NEXT_LOCALE=fr', 'accept-language': 'en' } })
	)
	assert.equal(response.headers.get('location'), 'http://localhost/fr/blog')
})
test('unsupported browser languages fall back to English', () => {
	const response = handle(new NextRequest('http://localhost/projects', { headers: { 'accept-language': 'de-DE' } }))
	assert.equal(response.headers.get('location'), 'http://localhost/en/projects')
})
function keys(value: Record<string, unknown>, prefix = ''): string[] {
	return Object.entries(value).flatMap(([key, entry]) => {
		const name = prefix ? `${prefix}.${key}` : key
		return entry && typeof entry === 'object' && !Array.isArray(entry)
			? keys(entry as Record<string, unknown>, name)
			: [name]
	})
}
test('the language catalogs have identical keys and valid common ICU messages', async () => {
	const en = JSON.parse(await readFile('src/lib/dictionaries/en.json', 'utf8'))
	const fr = JSON.parse(await readFile('src/lib/dictionaries/fr.json', 'utf8'))
	assert.deepEqual(keys(en).sort(), keys(fr).sort())
	const t = createTranslator({ locale: 'fr', messages: fr, namespace: 'common' })
	assert.equal(t('minRead', { minutes: 3 }), '3 min de lecture')
	assert.equal(t('viewProject'), 'Voir le projet')
})

test('French page copy is translated across every standard section', async () => {
	const fr = JSON.parse(await readFile('src/lib/dictionaries/fr.json', 'utf8'))
	assert.equal(fr.home.hero.hello, 'Bonjour, je suis')
	assert.equal(fr.home.hero.title, 'Développeur créatif & artisan numérique')
	assert.equal(fr.navigation.projects, 'PROJETS')
	assert.equal(fr.home.journey.nodes.blender.title, 'La découverte de la 3D')
	assert.equal(fr.footer.privacyPolicy, 'Confidentialité')
	assert.equal(fr.ui.artTitle, 'Expériences artistiques')
	assert.equal(fr.ui.slimeRefresh, 'Les propriétés du slime changent à chaque actualisation.')
	const t = createTranslator({ locale: 'fr', messages: fr, namespace: 'common' })
	assert.equal(t('categoryCount', { category: 'Design', count: 2 }), 'Design · 2 articles')
})
