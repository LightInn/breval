// filepath: /home/lightin/Desktop/repos/breval/src/app/blog/page.jsx
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
			<div className="from-gray-950 to-gray-900 min-h-screen bg-gradient-to-b pt-20 text-white">
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
		<div className="from-gray-950 to-gray-900 min-h-screen bg-gradient-to-b pt-20 text-white">
			<div className="container mx-auto px-4 py-20">
				<div className="mb-12 text-center">
					<div className="bg-gray-800 mx-auto mb-4 h-10 w-3/4 animate-pulse rounded md:h-14"></div>
					<div className="bg-gray-800 mx-auto h-4 w-1/2 animate-pulse rounded"></div>
				</div>
				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="bg-gray-800 h-8 w-24 animate-pulse rounded"
						/>
					))}
				</div>
				<div className="border-gray-700 bg-gray-800/50 mb-16 animate-pulse rounded-lg border p-6 md:p-8">
					<div className="md:flex">
						<div className="bg-gray-700 h-64 rounded md:h-auto md:w-1/2"></div>
						<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
							<div>
								<div className="bg-gray-700 mb-4 h-8 w-3/4 rounded"></div>
								<div className="bg-gray-700 mb-2 h-4 w-full rounded"></div>
								<div className="bg-gray-700 mb-6 h-4 w-5/6 rounded"></div>
							</div>
							<div className="flex gap-4">
								<div className="bg-gray-700 h-10 w-32 rounded"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="bg-gray-800 h-80 animate-pulse rounded-lg">
							<div className="bg-gray-700 h-48 rounded-t-lg"></div>
							<div className="p-6">
								<div className="bg-gray-700 mb-2 h-6 w-3/4 rounded"></div>
								<div className="bg-gray-700 mb-1 h-4 w-full rounded"></div>
								<div className="bg-gray-700 mb-4 h-4 w-5/6 rounded"></div>
								<div className="flex flex-wrap gap-2">
									<div className="bg-gray-700 h-5 w-16 rounded-full"></div>
									<div className="bg-gray-700 h-5 w-20 rounded-full"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
