import React from 'react'

import { rgbDataURL } from '@/services/dataurl.services'
import { notFound } from 'next/navigation'
import { slug } from 'github-slugger'
import Image from 'next/image'
import Head from 'next/head'

import BlogDetails from '/src/components/Blog/BlogDetails'
import RenderMdx from '/src/components/Blog/RenderMdx'
import getAllBlogs from '/src/services/blog.services'
import siteMetadata from '/src/utils/siteMetaData'
import Highlight from '/src/components/Highlight'
import Tag from '/src/components/Elements/Tag'

export async function generateStaticParams() {
	const allBlogs = await getAllBlogs()
	return allBlogs.map(blog => ({ slug: blog.url }))
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

export default async function BlogPage(props) {
	const params = await props.params
	const allBlogs = await getAllBlogs()
	const blog = allBlogs.find(blog => blog.url === params.slug)
	const similarArticles = allBlogs.filter(
		b => b.tags.some(tag => blog.tags.includes(tag)) && b.url !== blog.url
	)

	if (!blog) {
		notFound()
	}

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
		<>
			<Head>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
					rel="stylesheet"
				/>
			</Head>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
			<article>
				<div className="relative mb-8 h-[70vh] w-full text-center">
					<div className="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center p-0 md:p-20">
						<div className="flex h-full w-full flex-col justify-center gap-8 rounded-2xl bg-black/40 backdrop-blur-xl md:max-w-[70vw]">
							<div>
								<Tag
									className="px-6 py-2 text-sm"
									link={`/blog/categories/${slug(blog.tags[0])}`}
									name={blog.tags[0]}
								/>
							</div>
							<h1 className="relative mt-6 inline-block w-full text-center text-2xl font-semibold capitalize !leading-normal text-light md:text-3xl lg:text-5xl">
								{blog.title}
							</h1>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 top-0 h-full" />

					<Image
						alt={blog.title}
						blurDataURL={rgbDataURL(231, 183, 202)}
						className="aspect-video h-full w-full object-cover object-center"
						height={1024}
						placeholder="blur"
						priority
						sizes="100vw"
						src={blog.image}
						width={1792}
					/>
				</div>
				<BlogDetails blog={blog} slug={params.slug} />

				<div className="mt-8 grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8 sxl:gap-16">
					{/* sticky div */}
					<div className="sticky top-0 col-span-12 lg:col-span-3">
						{/* -------------------------------------------------------------------  TOC ! -----------------------------------------------------------------------------------------------------------------------  */}
						{/*<details*/}
						{/*  className="border-[1px] border-solid border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"*/}
						{/*  open*/}
						{/*>*/}
						{/*  <summary className="text-lg font-semibold capitalize cursor-pointer">*/}
						{/*    Table Of Content*/}
						{/*  </summary>*/}
						{/*  <ul className="mt-4 font-in text-base">*/}
						{/*    Not available for now*/}
						{/*  </ul>*/}
						{/*</details>*/}
						{/* -------------------------------------------------------------------  SIMILAR ARTICLES ! -----------------------------------------------------------------------------------------------------------------------  */}
						<details
							className="border-dark text-dark sticky top-6 my-8 max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border-[1px] border-solid p-4"
							open
						>
							<summary className="cursor-pointer text-lg font-semibold capitalize">
								Similar Articles
							</summary>
							<ul className="mt-4 font-in text-base">
								Not available for now
								{similarArticles.map(article => (
									<li className="mt-2" key={article.url}>
										<a
											className="hover:text-accent hover:underline"
											href={article.url}
										>
											{article.title}
										</a>
									</li>
								))}
							</ul>
						</details>
					</div>
					<RenderMdx blog={blog} />
					<Highlight />
				</div>
			</article>
		</>
	)
}
