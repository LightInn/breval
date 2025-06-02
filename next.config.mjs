/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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

export default nextConfig
