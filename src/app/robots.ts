import type { MetadataRoute } from 'next'
import siteMetadata from '@/utils/siteMetaData'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
		sitemap: new URL('/sitemap.xml', siteMetadata.siteUrl).href,
	}
}
