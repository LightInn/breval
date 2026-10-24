import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	serverExternalPackages: ['@libsql/client'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.lightin.io',
			},
			{
				protocol: 'https',
				hostname: '**.andy-cinquin.fr',
			},
			{
				protocol: 'https',
				hostname: '**.brev.al',
			},
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '/**',
			},
		],
	},
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
export default withPayload(withNextIntl(nextConfig))
