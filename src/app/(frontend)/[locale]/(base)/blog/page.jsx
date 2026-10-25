import { unstable_rethrow } from 'next/navigation'
import { Suspense } from 'react'
import LocalizedText from '@/components/Global/localized-text'
import RouteArt from '@/components/Global/route-art'
import { sectionMetadata } from '@/i18n/metadata'
import getAllBlogs from '@/services/blog.services'
import BlogClient from './BlogClient'

async function BlogsContent({ params }) {
	try {
		const { locale } = await params
		const allBlogs = await getAllBlogs(locale)
		const blogs = Array.isArray(allBlogs) ? allBlogs : []
		if (!Array.isArray(allBlogs)) {
			console.warn('getAllBlogs did not return an array as expected. Received:', allBlogs)
		}
		return (
			<Suspense fallback={<BlogSkeleton />}>
				<BlogClient blogs={blogs} />
			</Suspense>
		)
	} catch (error) {
		unstable_rethrow(error)
		console.error('Error fetching blogs in BlogPage:', error)
		return (
			<div className="min-h-screen bg-background pt-20 text-foreground">
				<div className="container mx-auto px-4 py-20 text-center">
					<h1 className="mb-4 text-4xl font-bold">
						<LocalizedText id="errorArticles" />
					</h1>
					<p className="text-red-400">
						<LocalizedText id="tryAgain" />
					</p>
					{/* For debugging: <p className="text-xs text-gray-500 mt-2">Detail: {error.message}</p> */}
				</div>
			</div>
		)
	}
}
function BlogSkeleton() {
	return (
		<div className="min-h-screen bg-background pt-20 text-foreground">
			<div className="container mx-auto px-4 py-20">
				<div className="mb-12 text-center">
					<div className="mx-auto mb-4 h-10 w-3/4 animate-pulse rounded bg-muted md:h-14"></div>
					<div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-muted"></div>
				</div>
				<div className="mb-8 flex flex-wrap justify-center gap-3">
					{Array.from({
						length: 5,
					}).map((_, i) => (
						<div className="h-8 w-24 animate-pulse rounded bg-muted" key={i} />
					))}
				</div>
				<div className="mb-16 animate-pulse rounded-lg border border-gray-700 bg-muted/50 p-6 md:p-8">
					<div className="md:flex">
						<div className="h-64 rounded bg-muted/60 md:h-auto md:w-1/2"></div>
						<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
							<div>
								<div className="mb-4 h-8 w-3/4 rounded bg-muted/60"></div>
								<div className="mb-2 h-4 w-full rounded bg-muted/60"></div>
								<div className="mb-6 h-4 w-5/6 rounded bg-muted/60"></div>
							</div>
							<div className="flex gap-4">
								<div className="h-10 w-32 rounded bg-muted/60"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({
						length: 6,
					}).map((_, i) => (
						<div className="h-80 animate-pulse rounded-lg bg-muted" key={i}>
							<div className="h-48 rounded-t-lg bg-muted/60"></div>
							<div className="p-6">
								<div className="mb-2 h-6 w-3/4 rounded bg-muted/60"></div>
								<div className="mb-1 h-4 w-full rounded bg-muted/60"></div>
								<div className="mb-4 h-4 w-5/6 rounded bg-muted/60"></div>
								<div className="flex flex-wrap gap-2">
									<div className="h-5 w-16 rounded-full bg-muted/60"></div>
									<div className="h-5 w-20 rounded-full bg-muted/60"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export async function generateMetadata({ params }) {
	return sectionMetadata('/blog', (await params).locale, 'blogTitle')
}

export default function BlogPage(props) {
	return (
		<>
			{
				<Suspense fallback={<BlogSkeleton />}>
					<BlogsContent {...props} />
				</Suspense>
			}
			<RouteArt kind="blog" />
		</>
	)
}
