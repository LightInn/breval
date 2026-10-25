export const instant = false

import config from '@payload-config'
import { connection } from 'next/server'
import '@payloadcms/next/css'
import './studio.css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { importMap } from './admin/importMap'

const serverFunction: ServerFunctionClient = async args => {
	'use server'
	return await handleServerFunctions({ ...args, config, importMap })
}
export default async function Layout({ children }: { children: ReactNode }) {
	await connection()
	return (
		<RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
			{children}
		</RootLayout>
	)
}
