import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Blogs, Media, Projects, Users } from './cms/collections'
import { defaultLocale, localeLabels, locales } from './i18n/locales'

const publicStorageURL = process.env.S3_PUBLIC_ENDPOINT?.replace(/\/$/, '')
const dirname = path.dirname(fileURLToPath(import.meta.url))
const isPostgres = process.env.DATABASE_URL?.startsWith('postgres')
if (process.env.VERCEL) {
	if (!isPostgres)
		throw new Error(
			'Vercel requires a PostgreSQL DATABASE_URL; SQLite is only supported locally or on persistent storage.'
		)
	const requiredStorage = ['S3_BUCKET', 'S3_ENDPOINT', 'S3_PUBLIC_ENDPOINT', 'S3_ACCESS_KEY_ID', 'S3_ACCESS_SECRET']
	const missing = requiredStorage.filter(key => !process.env[key])
	if (missing.length) throw new Error(`Vercel requires R2 storage configuration: ${missing.join(', ')}`)
}
// Vercel functions must never create folders in the deployment bundle.
if (!isPostgres) mkdirSync(path.resolve(process.cwd(), '.data'), { recursive: true })

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || '',
	admin: {
		user: 'users',
		importMap: { baseDir: dirname },
		meta: { titleSuffix: ' · brev.al Studio', icons: { icon: '/brand-icon.svg' } },
		components: {
			graphics: { Logo: '/cms/admin/Brand#StudioLogo', Icon: '/cms/admin/Brand#StudioIcon' },
			beforeLogin: ['/cms/admin/Brand#StudioWelcome'],
			views: { dashboard: { Component: '/cms/admin/StudioDashboard#StudioDashboard' } },
			actions: ['/cms/admin/Brand#StudioSiteLink'],
		},
	},
	i18n: { supportedLanguages: { en, fr }, fallbackLanguage: 'en' },
	collections: [Users, Media, Blogs, Projects],
	localization: { locales: locales.map(code => ({ code, label: localeLabels[code] })), defaultLocale, fallback: true },
	db: isPostgres
		? postgresAdapter({
				pool: { connectionString: process.env.DATABASE_URL, max: 10, connectionTimeoutMillis: 15000 },
				push: false,
				migrationDir: path.resolve(dirname, 'migrations/postgres'),
			})
		: sqliteAdapter({
				push: process.env.NODE_ENV !== 'production',
				client: { url: process.env.DATABASE_URL || 'file:./.data/payload.db' },
				migrationDir: path.resolve(dirname, 'migrations'),
			}),
	serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
	plugins: [
		s3Storage({
			enabled: Boolean(process.env.S3_BUCKET),
			alwaysInsertFields: true,
			bucket: process.env.S3_BUCKET || '',
			collections: {
				media: {
					prefix: 'payload',
					disablePayloadAccessControl: true,
					generateFileURL: ({ filename, prefix }) =>
						`${publicStorageURL}/${prefix ? `${prefix}/` : ''}${encodeURIComponent(filename)}`,
				},
			},
			config: {
				endpoint: process.env.S3_ENDPOINT,
				region: 'auto',
				forcePathStyle: true,
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
					secretAccessKey: process.env.S3_ACCESS_SECRET || '',
				},
			},
		}),
	],
	sharp,
	typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
	telemetry: false,
})
