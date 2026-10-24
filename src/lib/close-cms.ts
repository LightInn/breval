import type { Payload } from 'payload'

// Payload clears its ORM state but does not close the adapter's database clients.
export async function closeCMS(payload: Payload) {
	const adapter = payload.db as unknown as {
		client?: { close: () => void }
		pool?: { end: () => Promise<void> }
	}
	await payload.destroy()
	adapter.client?.close()
	await adapter.pool?.end()
}
