import { getPayload } from 'payload'
import { closeCMS } from '../src/lib/close-cms'
import config from '../src/payload.config'

async function main() {
	const payload = await getPayload({ config })
	try {
		const email = process.env.PAYLOAD_ADMIN_EMAIL
		const password = process.env.PAYLOAD_ADMIN_PASSWORD
		if (!(email && password) || password.length < 12)
			throw new Error('Set PAYLOAD_ADMIN_EMAIL and a PAYLOAD_ADMIN_PASSWORD of at least 12 characters.')
		const users = await payload.find({ collection: 'users', limit: 1 })
		if (users.totalDocs) {
			console.info('An administrator already exists; no changes made.')
			return
		}
		await payload.create({ collection: 'users', data: { email, password, name: 'Bréval' } })
		console.info('Administrator created. Sign in at /admin.')
	} finally {
		await closeCMS(payload)
	}
}
main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
