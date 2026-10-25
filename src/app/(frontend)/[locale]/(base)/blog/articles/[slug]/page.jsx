import RouteArt from '@/components/Global/route-art'
export const instant = false

import { notFound } from 'next/navigation'
import { localizedAlternates } from '@/i18n/metadata'
import getAllBlogs from '@/services/blog.services'
import siteMetadata from '@/utils/siteMetaData'
import BlogPageClient from './BlogPageClient'

function articleImage(blog) {
	return new URL(blog.image || siteMetadata.socialBanner || '/logo.png', siteMetadata.siteUrl).href
}

export default async function BlogPage({ params }) {
	const { slug, locale } = await params
	const allBlogs = await getAllBlogs(locale)
	const blog = allBlogs.find(article => article.url === slug)
	if (!blog) notFound()
	const similarArticles = allBlogs.filter(
		article => article.url !== blog.url && article.tags.some(tag => blog.tags.includes(tag))
	)
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: blog.title,
		description: blog.describe,
		image: [articleImage(blog)],
		datePublished: blog.publishedAt,
		dateModified: blog.updatedAt || blog.publishedAt,
		author: [{ '@type': 'Person', name: siteMetadata.author, url: siteMetadata.siteUrl }],
	}
	return (
		<>
			{<BlogPageClient blog={blog} jsonLd={jsonLd} similarArticles={similarArticles} slug={slug} />}
			<RouteArt kind="article" />
		</>
	)
}

export async function generateMetadata({ params }) {
	const { slug, locale } = await params
	const blogs = await getAllBlogs(locale)
	const blog = blogs.find(article => article.url === slug)
	if (!blog) notFound()
	const [english, french] = await Promise.all([getAllBlogs('en'), getAllBlogs('fr')])
	const paths = {
		en: `/blog/articles/${english.find(article => article.id === blog.id)?.url || blog.url}`,
		fr: `/blog/articles/${french.find(article => article.id === blog.id)?.url || blog.url}`,
	}
	const alternates = localizedAlternates(`/blog/articles/${blog.url}`, locale, paths)
	const url = alternates.canonical
	const images = [articleImage(blog)]
	return {
		title: blog.title,
		description: blog.describe,
		alternates,
		openGraph: {
			title: blog.title,
			description: blog.describe,
			url,
			siteName: siteMetadata.title,
			type: 'article',
			locale: locale === 'fr' ? 'fr_FR' : 'en_US',
			images,
			authors: [siteMetadata.author],
			publishedTime: blog.publishedAt,
			modifiedTime: blog.updatedAt || blog.publishedAt,
		},
		twitter: { card: 'summary_large_image', title: blog.title, description: blog.describe, images },
	}
}
