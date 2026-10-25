import { expect, test } from '@playwright/test'

test('Hairline figures replace decorative layers on public routes', async ({ page }) => {
	for (const path of [
		'/fr',
		'/fr/projects',
		'/fr/blog',
		'/fr/artist',
		'/fr/privacy',
		'/fr/terms',
		'/fr/experiment/about',
		'/fr/experiment/slime',
		'/fr/experiment/crow',
	]) {
		await page.goto(path)
		const figure = page.locator('.route-art')
		await expect(figure).toHaveCount(1)
		await figure.scrollIntoViewIfNeeded()
		await expect(figure.locator('svg')).toBeVisible()
		expect(await figure.locator('svg path').count()).toBeGreaterThan(3)
		await expect(page.locator('.sakura-bg-light, .retro-grid-dark, .retro-grid-light')).toHaveCount(0)
	}
	await page.goto('/fr/projects')
	const figure = page.locator('.route-art')
	await figure.scrollIntoViewIfNeeded()
	await expect(figure.locator('svg')).toBeVisible()
	const before = await figure.locator('svg').innerHTML()
	await figure.locator('svg').hover({ position: { x: 150, y: 100 } })
	await expect.poll(() => figure.locator('svg').innerHTML()).not.toBe(before)
	await figure.screenshot({ path: '.tmp/hairline-projects.png' })
})

test('light theme tokens meet normal text contrast requirements', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' })
	await page.goto('/en/projects')
	await expect(page.locator('html')).toHaveClass(/light/)
	const ratios = await page.evaluate(() => {
		function color(variable: string) {
			const node = document.createElement('span')
			node.style.color = `hsl(var(--${variable}))`
			document.body.append(node)
			const rgb = getComputedStyle(node)
				.color.match(/[\d.]+/g)
				.map(Number)
				.slice(0, 3)
			node.remove()
			return rgb
		}
		function luminance(rgb: number[]) {
			const [r, g, b] = rgb.map(value => {
				const v = value / 255
				return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
			})
			return 0.2126 * r + 0.7152 * g + 0.0722 * b
		}
		function contrast(a: string, b: string) {
			const x = luminance(color(a)),
				y = luminance(color(b))
			return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
		}
		return [
			contrast('foreground', 'background'),
			contrast('muted-foreground', 'background'),
			contrast('primary', 'background'),
			contrast('primary-foreground', 'primary'),
		]
	})
	for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5)
})

test('desktop scrolling preserves the central pill without a full-width backdrop', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 })
	await page.goto('/en/projects')
	await page.evaluate(() => window.scrollTo(0, 500))
	await expect(page.locator('.site-header')).toHaveAttribute('data-scrolled', 'true')
	const box = await page.locator('.site-header__surface').boundingBox()
	expect(box.width).toBeLessThanOrEqual(1120)
	expect(box.x).toBeGreaterThan(100)
	expect(box.height).toBeLessThan(85)
	await expect(page.locator('.site-header__menu')).toBeHidden()
	const pill = page.locator('.site-header__links')
	await expect(pill).toHaveCSS('border-radius', '9999px')
	const pillBox = await pill.boundingBox()
	expect(Math.abs(pillBox.x + pillBox.width / 2 - 720)).toBeLessThan(2)
	await expect(page.locator('.site-header__surface')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
	await page.screenshot({ path: '.tmp/header-desktop.png' })
})
