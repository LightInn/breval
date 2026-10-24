import { request as createRequest, expect, test } from '@playwright/test'

const credentials = { email: 'e2e@example.invalid', password: 'Local-E2E-Password-123!' }

test.beforeAll(async () => {
	const api = await createRequest.newContext({ baseURL: 'http://127.0.0.1:3100' })
	try {
		const registered = await api.post('/api/users/first-register', { data: credentials })
		expect(registered.ok()).toBeTruthy()
		const { token } = await registered.json()
		const headers = { Authorization: `JWT ${token}` }
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

test('public REST reads published content and rejects anonymous writes', async ({ request }) => {
	const blogs = await request.get('/api/blogs')
	expect(blogs.ok()).toBeTruthy()
	expect((await blogs.json()).docs.map(doc => doc.slug)).toEqual(['e2e-article'])
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
	expect((await page.request.get('/api/blogs', { maxRedirects: 0 })).status()).toBe(200)
	expect((await page.request.get('/admin/login', { maxRedirects: 0 })).status()).toBe(200)
})

test('admin studio supports Markdown preview and keyboard-friendly topics', async ({ page }) => {
	await page.goto('/admin/login')
	await page.locator('input[name="email"]').fill(credentials.email)
	await page.locator('input[name="password"]').fill(credentials.password)
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
