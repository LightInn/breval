/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.lightin.io'
            },
			{
				protocol: 'https',
				hostname: '**.andy-cinquin.fr'
			},
			{
				protocol: 'https',
				hostname: '**.brev.al'
			},
            {
                protocol: 'http',
                hostname: '**.lightin.io, **.andy-cinquin.fr, **.brev.al'
            },
        ],
    },
    i18n: {
        locales: ['fr'],
        defaultLocale: 'fr',
    },
}
