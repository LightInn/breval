import { Suspense } from 'react'

import getAllBlogs from '../../services/blog.services'
import BlogClientNew from './BlogClientNew'

export const metadata = {
	description:
		'In this blog, I share my thoughts, my projects, my experiences and my knowledge about web and mobile development !',
	title: 'Bréval LE FLOCH | My Blog',
}

export default async function BlogPage() {
	try {
		const allBlogs = await getAllBlogs()
		const blogs = Array.isArray(allBlogs) ? allBlogs : []

		if (!Array.isArray(allBlogs)) {
			console.warn(
				"getAllBlogs n'a pas retourné un tableau comme attendu. Reçu:",
				allBlogs
			)
		}

		return (
			<Suspense fallback={<BlogSkeleton />}>
				<BlogClientNew blogs={blogs} />
			</Suspense>
		)
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des blogs dans BlogPage:',
			error
		)
		return (
			<div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="mb-4 text-4xl font-bold">
						Erreur de chargement des articles
					</h1>
					<p className="text-red-400">
						Désolé, une erreur est survenue lors de la tentative de chargement
						des articles de blog.
					</p>
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
