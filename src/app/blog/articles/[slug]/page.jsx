import React from 'react'

import siteMetadata from '@/utils/siteMetaData'
import { notFound } from 'next/navigation'

import getAllBlogs from '@/services/blog.services'

import BlogPageClient from './BlogPageClient'

export default async function BlogPage(props) {
	const params = await props.params
	const allBlogs = await getAllBlogs()
	const blog = allBlogs.find(blog => blog.url === params.slug)

	if (!blog) {
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
		'@context': 'https://schema.org',
		description: blog.description,
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
}

export async function generateMetadata(props) {
	const params = await props.params
	const allBlogs = await getAllBlogs()
	const blog = allBlogs.find(blog => blog.url === params.slug)
	if (!blog) {
		return
	}

	const publishedAt = new Date(blog.publishedAt).toISOString()
	const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString()

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
			url: siteMetadata.siteUrl + blog.url,
			siteName: siteMetadata.title,
			description: blog.describe,
			publishedTime: publishedAt,
			modifiedTime: modifiedAt,
			title: blog.title,
			images: ogImages,
			locale: 'en_US',
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			description: blog.describe,
			title: blog.title,
			images: ogImages,
		},
		description: blog.describe,
		title: blog.title,
	}
}

export async function generateStaticParams() {
	const allBlogs = await getAllBlogs()
	return allBlogs.map(blog => ({ slug: blog.url }))
}
