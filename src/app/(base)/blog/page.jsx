import { Suspense } from 'react'

import siteMetaData from '@/utils/siteMetaData'

import getAllBlogs from '../../../services/blog.services'
import BlogClient from './BlogClient'

export const metadata = {
	openGraph: {
		images: [
			{
				url: siteMetaData.socialBanner || '/og-image.png',
				alt: 'Bréval Le Floch - Blog',
				width: 1200,
				height: 630,
			},
		],
		description:
			'Explore insightful articles and tutorials on web development, creative coding, UI/UX design, and tech by Bréval Le Floch.',
		title: 'Blog | Bréval Le Floch - Creative Developer',
		url: `${siteMetaData.siteUrl}/blog`,
		type: 'website', // Or 'article' if you consider the blog listing itself an article collection
	},
	description:
		'Explore insightful articles and tutorials on web development, creative coding, UI/UX design, and tech by Bréval Le Floch.',
	title: 'Blog | Bréval Le Floch - Creative Developer',
	alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
	try {
		const allBlogs = await getAllBlogs()
		const blogs = Array.isArray(allBlogs) ? allBlogs : []

		if (!Array.isArray(allBlogs)) {
			console.warn(
				'getAllBlogs did not return an array as expected. Received:',
				allBlogs
			)
		}

		return (
			<Suspense fallback={<BlogSkeleton />}>
				<BlogClient blogs={blogs} />
			</Suspense>
		)
	} catch (error) {
		console.error('Error fetching blogs in BlogPage:', error)
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="mb-4 text-4xl font-bold">Error loading articles</h1>
					<p className="text-red-400">
						Sorry, an error occurred while trying to load the blog articles.
						Sorry, an error occurred while trying to load the blog articles.
					</p>
					{/* For debugging: <p className="text-xs text-gray-500 mt-2">Detail: {error.message}</p> */}
				</div>
			</div>
		)
	}
}

function BlogSkeleton() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="container mx-auto px-4 py-20">
				<div className="mb-12 text-center">
					<div className="mx-auto mb-4 h-10 w-3/4 animate-pulse rounded bg-gray-800 md:h-14"></div>
					<div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-gray-800"></div>
				</div>
				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							className="h-8 w-24 animate-pulse rounded bg-gray-800"
							key={i}
						/>
					))}
				</div>
				<div className="mb-16 animate-pulse rounded-lg border border-gray-700 bg-gray-800/50 p-6 md:p-8">
					<div className="md:flex">
						<div className="h-64 rounded bg-gray-700 md:h-auto md:w-1/2"></div>
						<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
							<div>
								<div className="mb-4 h-8 w-3/4 rounded bg-gray-700"></div>
								<div className="mb-2 h-4 w-full rounded bg-gray-700"></div>
								<div className="mb-6 h-4 w-5/6 rounded bg-gray-700"></div>
							</div>
							<div className="flex gap-4">
								<div className="h-10 w-32 rounded bg-gray-700"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div className="h-80 animate-pulse rounded-lg bg-gray-800" key={i}>
							<div className="h-48 rounded-t-lg bg-gray-700"></div>
							<div className="p-6">
								<div className="mb-2 h-6 w-3/4 rounded bg-gray-700"></div>
								<div className="mb-1 h-4 w-full rounded bg-gray-700"></div>
								<div className="mb-4 h-4 w-5/6 rounded bg-gray-700"></div>
								<div className="flex flex-wrap gap-2">
									<div className="h-5 w-16 rounded-full bg-gray-700"></div>
									<div className="h-5 w-20 rounded-full bg-gray-700"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
