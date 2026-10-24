import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'

const production: NodeJS.ProcessEnv = {
	...process.env,
	NODE_ENV: 'production',
	VERCEL: '1',
	PAYLOAD_SECRET: 'serverless-config-regression-secret-for-tests',
	DATABASE_URL: 'postgresql://fixture:fixture@localhost:5432/fixture',
	S3_BUCKET: 'fixture',
	S3_ENDPOINT: 'https://fixture.r2.cloudflarestorage.com',
	S3_PUBLIC_ENDPOINT: 'https://cdn.example.com',
	S3_ACCESS_KEY_ID: 'fixture',
	S3_ACCESS_SECRET: 'fixture',
}
const source = `
 import assert from 'node:assert/strict';
 import fs from 'node:fs';
 import {syncBuiltinESMExports} from 'node:module';
 fs.mkdirSync = () => { throw new Error('READ_ONLY_FILESYSTEM: mkdir is forbidden'); };
 syncBuiltinESMExports();
 const {default: pending} = await import('./src/payload.config.ts');
 const config = await pending;
 assert.equal(config.db.name, 'postgres');
 assert.equal(config.collections.find(c => c.slug === 'media').upload.disableLocalStorage, true);
`

test('PostgreSQL/R2 config loads on a read-only serverless filesystem', () => {
	const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', source], {
		env: production,
		encoding: 'utf8',
		timeout: 30000,
	})
	assert.equal(result.status, 0, result.stderr)
})

for (const [name, unset, expected] of [
	['missing PostgreSQL', ['DATABASE_URL'], 'Vercel requires a PostgreSQL DATABASE_URL'],
	['missing R2', ['S3_BUCKET', 'S3_ACCESS_SECRET'], 'S3_BUCKET, S3_ACCESS_SECRET'],
] as const) {
	test(`serverless configuration reports ${name} before any disk write`, () => {
		const env: NodeJS.ProcessEnv = { ...production }
		for (const key of unset) delete env[key]
		const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', source], {
			env,
			encoding: 'utf8',
			timeout: 30000,
		})
		assert.equal(result.status, 1)
		assert.ok(result.stderr.includes(expected), result.stderr)
		assert.ok(!result.stderr.includes('READ_ONLY_FILESYSTEM'), result.stderr)
	})
}
