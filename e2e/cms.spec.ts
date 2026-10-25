import { request as createRequest, expect, test } from '@playwright/test'
import sharp from 'sharp'

const credentials = { email: 'e2e@example.invalid', password: 'Local-E2E-Password-123!' }

test.beforeAll(async () => {
	const api = await createRequest.newContext({ baseURL: 'http://127.0.0.1:3100' })
	try {
		const registered = await api.post('/api/users/first-register', { data: credentials })
		if (!registered.ok()) {
			const login = await api.post('/api/users/login', { data: credentials })
			expect(login.ok()).toBeTruthy()
			return
		}
		const { token } = await registered.json()
		const headers = { Authorization: `JWT ${token}` }
		const buffer = await sharp({ create: { width: 320, height: 200, channels: 3, background: '#d6d6d8' } })
			.png()
			.toBuffer()
		const uploaded = await api.post('/api/media', {
			headers,
			multipart: { file: { name: 'project-cover.png', mimeType: 'image/png', buffer } },
		})
		expect(uploaded.status()).toBe(201)
		const cover = (await uploaded.json()).doc.id

		for (const [slug, status] of [
			['e2e-article', 'published'],
			['e2e-draft', 'draft'],
		]) {
			const response = await api.post('/api/blogs', {
				headers,
				data: {
					title: slug === 'e2e-article' ? 'Payload test article' : 'Private draft',
					slug,
					content: '# Content from Payload',
					_status: status,
				},
			})
			expect(response.ok()).toBeTruthy()
			if (status === 'published') {
				const created = await response.json()
				const translated = await api.patch(`/api/blogs/${created.doc.id}?locale=fr`, {
					headers,
					data: {
						title: 'Article Payload français',
						slug: 'article-payload',
						content: '# Contenu français',
						_status: 'published',
					},
				})
				expect(translated.ok()).toBeTruthy()
			}
		}
		const project = await api.post('/api/projects', {
			headers,
			data: {
				title: 'Payload test project',
				main_media: cover,
				slug: 'e2e-project',
				description: 'Project from local SQLite',
				skills: ['Next.js'],
				_status: 'published',
			},
		})
		expect(project.ok()).toBeTruthy()
	} finally {
		await api.dispose()
	}
})

test('public website data stays internal and REST rejects anonymous reads and writes', async ({ request }) => {
	const blogs = await request.get('/api/blogs')
	expect(blogs.status()).toBe(403)
	expect((await request.get('/api/projects')).status()).toBe(403)
	expect((await request.get('/api/media')).status()).toBe(403)
	const forbidden = await request.post('/api/projects', { data: { title: 'Forbidden', slug: 'forbidden' } })
	expect(forbidden.status()).toBe(403)
	const sitemap = await request.get('/sitemap.xml')
	expect(await sitemap.text()).toContain('/blog/articles/e2e-article')
	expect(await sitemap.text()).not.toContain('e2e-draft')
	const robots = await request.get('/robots.txt')
	expect(robots.status()).toBe(200)
	expect(await robots.text()).toContain('Disallow: /admin')
})

test('the website renders Payload articles and hides drafts', async ({ page, request }) => {
	const errors = []
	page.on('pageerror', error => errors.push(error.message))
	await page.goto('/en/blog/articles/e2e-article')
	await expect(page.getByRole('heading', { name: 'Payload test article', exact: true }).first()).toBeVisible()
	expect((await request.get('/blog/articles/e2e-draft')).status()).toBe(404)
	expect(errors).toEqual([])
})

test('project detail pages use the integrated CMS', async ({ page }) => {
	await page.goto('/en/projects/e2e-project')
	await expect(page.getByRole('heading', { name: 'Payload test project', exact: true }).first()).toBeVisible()
})

test('administrator signs in and opens the article collection', async ({ page }) => {
	await page.goto('/admin/login')
	await page.locator('input[name="email"]').fill(credentials.email)
	await page.locator('input[name="password"]').fill(credentials.password)
	await page.getByRole('button', { name: /login/i }).click()
	await expect(page).toHaveURL(/\/admin\/?$/)
	await page.goto('/admin/collections/blogs')
	await expect(page.getByRole('link', { name: 'Payload test article', exact: true }).first()).toBeVisible()
	await page.screenshot({ path: '.tmp/studio-collection.png', fullPage: true })
})

test('language switching preserves article identity, query and preference', async ({ page }) => {
	await page.goto('/en/blog/articles/e2e-article?ref=studio')
	await page.getByRole('button', { name: 'Français', exact: true }).click()
	await expect(page).toHaveURL(/\/fr\/blog\/articles\/article-payload\?ref=studio$/)
	await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
	await expect(page.getByRole('heading', { name: 'Article Payload français', exact: true }).first()).toBeVisible()
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/fr\/blog\/articles\/article-payload$/)
	await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/en\/blog\/articles\/e2e-article$/)
	const redirect = await page.request.get('/projects', { maxRedirects: 0 })
	expect(redirect.status()).toBe(307)
	expect(redirect.headers().location).toContain('/fr/projects')
	expect((await page.request.get('/api/blogs', { maxRedirects: 0 })).status()).toBe(403)
	expect((await page.request.get('/admin/login', { maxRedirects: 0 })).status()).toBe(200)
})

test('admin studio supports Markdown preview and keyboard-friendly topics', async ({ page }) => {
	await page.goto('/admin/login')
	await page.locator('input[name="email"]').fill(credentials.email)
	await page.locator('input[name="password"]').fill(credentials.password)
	await expect(page.locator('.studio-logo__mark svg')).toBeVisible()
	await expect(page.locator('link[rel="icon"][href="/brand-icon.svg"]')).toHaveCount(1)
	await page.screenshot({ path: '.tmp/studio-login.png', fullPage: true })
	await page.getByRole('button', { name: /login/i }).click()
	await expect(page.locator('.studio-dashboard')).toBeVisible()
	await page.goto('/admin?locale=fr')
	await expect(page.getByRole('link', { name: /Write an article/ })).toHaveAttribute(
		'href',
		'/admin/collections/blogs/create?locale=fr'
	)
	await page.goto('/admin?locale=en')
	await page.screenshot({ path: '.tmp/studio-dashboard.png', fullPage: true })
	await page.locator('.studio-recent').getByRole('link').first().click()
	await expect(page.locator('.studio-editor')).toBeVisible()
	await expect(page.getByRole('link', { name: 'API', exact: true })).toHaveCount(0)
	const icon = await page.locator('.step-nav__home:visible .studio-brand-icon').boundingBox()
	const slot = await page.locator('.step-nav__home:visible').boundingBox()
	expect(icon.width).toBeLessThanOrEqual(slot.width)
	expect(icon.height).toBeLessThanOrEqual(slot.height)
	await page.screenshot({ path: '.tmp/admin-header-fixed.png' })
	const editURL = new URL(page.url())
	const apiURL = new URL(editURL)
	apiURL.pathname += '/api'
	apiURL.search = '?locale=en'
	await page.goto(apiURL.href)
	editURL.search = '?locale=en'
	await expect(page.getByRole('heading', { name: 'Nothing found', exact: true })).toBeVisible()
	await page.goto(editURL.href)
	await expect(page.locator('.studio-editor')).toBeVisible()

	await page.locator('.studio-editor textarea').fill('# A clearer writing experience')
	await page.getByRole('button', { name: 'Preview', exact: true }).click()
	await expect(
		page.locator('.studio-editor__preview').getByRole('heading', { name: 'A clearer writing experience' })
	).toBeVisible()
	await page.getByText('Cover & topics', { exact: true }).click()
	const input = page.getByPlaceholder('Add a keyword…')
	await input.fill('Design')
	await input.press('Enter')
	await expect(page.getByRole('button', { name: 'Remove Design', exact: true })).toBeVisible()
	await page.getByRole('button', { name: 'Remove Design', exact: true }).click()
	await expect(page.getByRole('button', { name: 'Remove Design', exact: true })).toHaveCount(0)
	await page.screenshot({ path: '.tmp/studio-editor.png', fullPage: true })
})

test('French article listings use translated interface text', async ({ page }) => {
	await page.goto('/fr/blog')
	await expect(page.getByRole('heading', { name: 'Idées, notes et récits', exact: true })).toBeVisible()
	await expect(page.getByRole('link', { name: 'Lire l’article', exact: true })).toHaveAttribute(
		'href',
		'/fr/blog/articles/article-payload'
	)
})

test('studio remains readable in French on a small dark screen', async ({ browser }) => {
	const context = await browser.newContext({
		baseURL: 'http://127.0.0.1:3100',
		locale: 'fr-FR',
		colorScheme: 'dark',
		viewport: { width: 390, height: 844 },
	})
	try {
		await context.addCookies([{ name: 'payload-theme', value: 'dark', url: 'http://127.0.0.1:3100' }])
		const page = await context.newPage()
		await page.goto('/admin/login')
		await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
		await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
		await expect(page.getByRole('heading', { name: 'Administration', exact: true })).toBeVisible()
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
		await page.screenshot({ path: '.tmp/studio-mobile-dark.png', fullPage: true })
	} finally {
		await context.close()
	}
})

for (const [locale, greeting, role, projects, art] of [
	['fr', 'Bonjour, je suis', 'Développeur créatif & artisan numérique', 'PROJETS', 'Expériences artistiques'],
	['en', 'Hello, I am', 'Creative Developer & Digital Artisan', 'PROJECTS', 'Art experiments'],
]) {
	test(`standard page copy is translated in ${locale}`, async ({ page }) => {
		await page.goto(`/${locale}`)
		await expect(page.getByText(greeting, { exact: false }).first()).toBeVisible()
		await expect(page.getByText(role, { exact: true }).first()).toBeVisible()
		await expect(page.getByRole('navigation').getByRole('link', { name: projects, exact: true })).toBeVisible()
		const journey = page.locator('#journey')
		await journey.scrollIntoViewIfNeeded()
		await expect(
			journey.getByRole('heading', { name: locale === 'fr' ? 'Mon parcours' : 'My Journey', exact: true })
		).toBeVisible()
		await expect(journey.locator('ol > li')).toHaveCount(4)
		const first = journey.locator('details').first()
		await first.locator('summary').focus()
		await page.keyboard.press('Enter')
		await expect(first).toHaveAttribute('open', '')
		await expect(
			first.getByRole('heading', { name: locale === 'fr' ? 'La découverte de la 3D' : '3D Discovery' })
		).toBeVisible()
		await first.locator('summary').focus()
		await page.keyboard.press('Enter')
		await expect(first).not.toHaveAttribute('open', '')
		await page.evaluate(() => {
			if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
		})
		await journey.screenshot({ path: `.tmp/journey-${locale}-desktop.png` })
		await page.setViewportSize({ width: 390, height: 844 })
		await journey.scrollIntoViewIfNeeded()
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
		await journey.screenshot({ path: `.tmp/journey-${locale}-mobile.png` })
		await page.setViewportSize({ width: 1280, height: 720 })

		await page.goto(`/${locale}/artist`)
		await expect(page.getByRole('heading', { name: art, exact: true })).toBeVisible()
		await page.goto(`/${locale}/experiment/slime`)
		await expect(
			page.getByText(
				locale === 'fr'
					? 'Les propriétés du slime changent à chaque actualisation.'
					: 'Slime properties change with each refresh.',
				{ exact: true }
			)
		).toBeVisible()
		await page.goto(`/${locale}/experiment/about`)
		await expect(
			page
				.getByText(locale === 'fr' ? 'Je suis développeur créatif' : 'I’m a creative developer', { exact: false })
				.first()
		).toBeVisible()
		await page.goto(`/${locale}/projects`)
		await expect(
			page.getByRole('button', { name: locale === 'fr' ? 'Tous les projets' : 'All projects', exact: true })
		).toBeVisible()
		await page.goto(`/${locale}/blog/categories/all`)
		await expect(
			page.getByText(
				locale === 'fr'
					? 'Découvrez d’autres catégories pour enrichir vos connaissances !'
					: 'Discover more categories and expand your knowledge!',
				{ exact: true }
			)
		).toBeVisible()
	})
}

test('project navigation uses native shared element transitions', async ({ page }) => {
	await page.addInitScript(() => {
		if (!document.startViewTransition) return
		const start = document.startViewTransition.bind(document)
		Object.assign(window, { nativeTransitionCount: 0 })
		document.startViewTransition = (...args) => {
			Object.assign(window, { nativeTransitionCount: Reflect.get(window, 'nativeTransitionCount') + 1 })
			return start(...args)
		}
	})
	await page.goto('/en/projects')
	const link = page.getByRole('link', { name: 'Payload test project', exact: true }).last()
	await expect(link).toBeVisible()
	await link.hover()
	await link.click()
	await expect(page).toHaveURL(/\/en\/projects\/e2e-project$/)
	await expect(page.getByRole('heading', { name: 'Payload test project', exact: true })).toBeVisible()
	await expect.poll(() => page.evaluate(() => Reflect.get(window, 'nativeTransitionCount'))).toBeGreaterThan(0)
})

test('CMS edits invalidate cached content and depublishing removes it', async ({ request }) => {
	const auth = await request.post('/api/users/login', { data: credentials })
	expect(auth.status()).toBe(200)
	const { token } = await auth.json()
	const headers = { Authorization: `JWT ${token}` }
	const projects = await (await request.get('/api/projects?locale=en', { headers })).json()
	const project = projects.docs.find(doc => doc.slug === 'e2e-project')
	expect(await (await request.get('/en/projects/e2e-project')).text()).toContain('Payload test project')
	const edited = await request.patch(`/api/projects/${project.id}?locale=en`, {
		headers,
		data: { title: 'Updated cached project' },
	})
	expect(edited.status()).toBe(200)
	const refreshed = await (await request.get('/en/projects/e2e-project')).text()
	expect(refreshed).toContain('Updated cached project')
	const unpublished = await request.patch(`/api/projects/${project.id}?locale=en`, {
		headers,
		data: { _status: 'draft' },
	})
	expect(unpublished.status()).toBe(200)
	const removed = await request.get('/en/projects/e2e-project')
	expect(removed.status()).toBe(404)
	expect(await removed.text()).not.toContain('Updated cached project')
})

test('appearance follows system changes and remembers explicit choices', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' })
	await page.goto('/en/projects')
	await expect(page.locator('html')).toHaveClass(/light/)
	const choose = async (name: string) => {
		await page.getByRole('button', { name: 'Appearance', exact: true }).click()
		await page.getByRole('menuitemradio', { name, exact: true }).click()
	}
	await choose('Dark')
	await expect(page.locator('html')).toHaveClass(/dark/)
	await page.reload()
	await expect(page.locator('html')).toHaveClass(/dark/)
	await choose('Light')
	await expect(page.locator('html')).toHaveClass(/light/)
	await choose('System')
	await page.emulateMedia({ colorScheme: 'dark' })
	await expect(page.locator('html')).toHaveClass(/dark/)
	await page.emulateMedia({ colorScheme: 'light' })
	await expect(page.locator('html')).toHaveClass(/light/)
})

test('mobile pages keep readable margins and working legal links', async ({ page }) => {
	for (const width of [320, 390]) {
		await page.setViewportSize({ width, height: 844 })
		for (const path of [
			'/fr',
			'/fr/projects',
			'/fr/blog',
			'/fr/blog/articles/article-payload',
			'/fr/privacy',
			'/fr/terms',
		]) {
			const response = await page.goto(path)
			expect(response.status()).toBe(200)
			await expect(page.getByRole('button', { name: 'Apparence', exact: true })).toBeVisible()
			expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy()
		}
	}
	await page.getByRole('contentinfo').getByRole('link', { name: 'Confidentialité', exact: true }).click()
	await expect(page).toHaveURL(/\/fr\/privacy$/)
	await expect(page.getByRole('heading', { name: 'Confidentialité', exact: true })).toBeVisible()
	await page.getByRole('contentinfo').getByRole('link', { name: 'Conditions d’utilisation', exact: true }).click()
	await expect(page).toHaveURL(/\/fr\/terms$/)
	await expect(page.getByRole('heading', { name: 'Conditions d’utilisation', exact: true })).toBeVisible()
	await page.screenshot({ path: '.tmp/mobile-legal.png', fullPage: true })
	await page.goto('/fr/projects')
	await page.screenshot({ path: '.tmp/mobile-projects.png', fullPage: true })
})
