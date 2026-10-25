import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { connection } from 'next/server'
import { importMap } from '../importMap'

type Args = { params: Promise<{ segments: string[] }>; searchParams: Promise<Record<string, string | string[]>> }
export const generateMetadata = async ({ params, searchParams }: Args) => {
	await connection()
	return generatePageMetadata({ config, params, searchParams })
}
export default async function Page({ params, searchParams }: Args) {
	await connection()
	return RootPage({ config, params, searchParams, importMap })
}
