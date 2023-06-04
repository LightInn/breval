/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.lightin.io',
			},
			{
				protocol: 'http',
				hostname: '**.lightin.io',
			},
		],
	},
	i18n: {
		locales: ['fr'],
		defaultLocale: 'fr',
	},
}
