import React from 'react'

import siteMetadata from '@/utils/siteMetaData'
import { notFound } from 'next/navigation'

import getAllBlogs from '@/services/blog.services'

import BlogPageClient from './BlogPageClient'

export default async function BlogPage(props) {
	try {
		const params = await props.params
		const allBlogs = await getAllBlogs()

		if (!Array.isArray(allBlogs)) {
			console.warn('getAllBlogs did not return an array:', allBlogs)
			notFound()
		}

		const blog = allBlogs.find(blog => blog.url === params.slug)

		if (!blog) {
			notFound()
		}

		// Validate blog data
		if (!blog.title || !blog.publishedAt) {
			console.warn('Invalid blog data for slug:', params.slug, blog)
			notFound()
		}

		// Filter similar articles only after confirming blog exists
		const similarArticles = allBlogs.filter(b => {
			// Ensure both blogs have tags arrays
			if (!Array.isArray(blog.tags) || !Array.isArray(b.tags)) {
				return false
			}
			return b.tags.some(tag => blog.tags.includes(tag)) && b.url !== blog.url
		})

		let imageList = [siteMetadata.socialBanner]
		if (blog.image) {
			imageList =
				typeof blog.image.filePath === 'string'
					? [siteMetadata.siteUrl + blog.image]
					: blog.image
		}

		const jsonLd = {
			author: [
				{
					name: blog?.author ? [blog.author] : siteMetadata.author,
					url: siteMetadata.twitter,
					'@type': 'Person',
				},
			],
			dateModified: new Date(blog.updatedAt || blog.publishedAt).toISOString(),
			datePublished: new Date(blog.publishedAt).toISOString(),
			description: blog.description || blog.describe || '',
			'@context': 'https://schema.org',
			'@type': 'NewsArticle',
			headline: blog.title,
			image: imageList,
		}

		return (
			<BlogPageClient
				blog={blog}
				jsonLd={jsonLd}
				similarArticles={similarArticles}
				slug={params.slug}
			/>
		)
	} catch (error) {
		console.error('Error in BlogPage component:', error)
		notFound()
	}
}

export async function generateMetadata(props) {
	try {
		const params = await props.params
		const allBlogs = await getAllBlogs()

		if (!Array.isArray(allBlogs)) {
			return {
				description: 'The requested article could not be found.',
				title: 'Article not found',
			}
		}

		const blog = allBlogs.find(blog => blog.url === params.slug)
		if (!blog) {
			return {
				description: 'The requested article could not be found.',
				title: 'Article not found',
			}
		}

		const publishedAt = new Date(blog.publishedAt || new Date()).toISOString()
		const modifiedAt = new Date(
			blog.updatedAt || blog.publishedAt || new Date()
		).toISOString()

		let imageList = [siteMetadata.socialBanner]
		if (blog.image) {
			imageList =
				typeof blog.image === 'string'
					? [siteMetadata.siteUrl + blog.image]
					: blog.image
		}
		const ogImages = imageList.map(img => {
			return { url: img.includes('http') ? img : siteMetadata.siteUrl + img }
		})

		const authors = blog?.author ? [blog.author] : siteMetadata.author

		return {
			openGraph: {
				authors: authors.length > 0 ? authors : [siteMetadata.author],
				description: blog.describe || blog.description || '',
				url: siteMetadata.siteUrl + blog.url,
				siteName: siteMetadata.title,
				publishedTime: publishedAt,
				modifiedTime: modifiedAt,
				title: blog.title,
				images: ogImages,
				locale: 'en_US',
				type: 'article',
			},
			twitter: {
				description: blog.describe || blog.description || '',
				card: 'summary_large_image',
				title: blog.title,
				images: ogImages,
			},
			description: blog.describe || blog.description || '',
			title: blog.title,
			alternates: { canonical: `${siteMetadata.siteUrl}/blog/articles/${params.slug}` },
		}
	} catch (error) {
		console.error('Error generating metadata:', error)
		return {
			description: 'The requested article could not be found.',
			title: 'Article not found',
		}
	}
}

export async function generateStaticParams() {
	try {
		const allBlogs = await getAllBlogs()
		if (!Array.isArray(allBlogs)) {
			console.warn(
				'getAllBlogs did not return an array in generateStaticParams:',
				allBlogs
			)
			return []
		}
		return allBlogs
			.filter(blog => blog && blog.url)
			.map(blog => ({ slug: blog.url }))
	} catch (error) {
		console.error('Error in generateStaticParams:', error)
		return []
	}
}
