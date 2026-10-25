export const instant = false

import { notFound } from 'next/navigation'
import { connection } from 'next/server'
export default async function MissingPage() {
	await connection()
	notFound()
}
