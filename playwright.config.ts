import { randomUUID } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from '@playwright/test'

const directory = path.resolve('.data', `e2e-${randomUUID()}`)
mkdirSync(directory, { recursive: true })
export default defineConfig({
	testDir: './e2e',
	workers: 1,
	timeout: 60000,
	use: { baseURL: 'http://127.0.0.1:3100', headless: true },
	outputDir: '.tmp/playwright-results',
	webServer: {
		command:
			'node node_modules/payload/bin.js migrate && node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100',
		url: 'http://127.0.0.1:3100/robots.txt',
		timeout: 120000,
		reuseExistingServer: false,
		env: {
			NODE_ENV: 'production',
			NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1:3100',
			PAYLOAD_SECRET: 'isolated-end-to-end-test-secret-at-least-32-characters',
			DATABASE_URL: `file:${path.join(directory, 'test.db').replaceAll('\\', '/')}`,
			PAYLOAD_MEDIA_DIR: path.join(directory, 'media'),
		},
	},
})
