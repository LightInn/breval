'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollObject3D from '@/components/scroll-object-3d'

export default function BlogClientNew({ blogs = [] }) {
	const ref = useRef(null)
	const featuredRef = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })
	const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.3 })

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	}

	// Format dates and process blog data
	const formatDate = dateString => {
		if (!dateString) return 'Date non disponible'
		try {
			const date = new Date(dateString)
			return date.toLocaleDateString('fr-FR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		} catch (error) {
			return 'Date non disponible'
		}
	}

	const calculateReadTime = content => {
		if (!content) return '5 min de lecture'
		const wordsPerMinute = 200
		const wordCount = content.split(' ').length
		const readTime = Math.ceil(wordCount / wordsPerMinute)
		return `${readTime} min de lecture`
	}

	// Utility function to safely process tags
	const processTags = tags => {
		if (!tags) return ['Article de blog']

		// If tags is already an array
		if (Array.isArray(tags)) {
			return tags.length > 0 ? tags : ['Article de blog']
		}

		// If tags is a string
		if (typeof tags === 'string') {
			return tags
				.split(',')
				.map(tag => tag.trim())
				.filter(tag => tag.length > 0)
		}

		// Fallback
		return ['Article de blog']
	}

	// Get the first blog as featured, or use fallback
	const featuredBlogData =
		Array.isArray(blogs) && blogs.length > 0 ? blogs[0] : null
	const featuredPost = featuredBlogData
		? {
				title: featuredBlogData.title || 'Article en vedette',
				excerpt: featuredBlogData.description || 'Description non disponible.',
				date: formatDate(
					featuredBlogData.publishedAt || featuredBlogData.createdAt
				),
				readTime: calculateReadTime(featuredBlogData.body),
				image: featuredBlogData.media?.url
					? `${featuredBlogData.image.url}`
					: '/placeholder.svg?height=600&width=1200',
				tags: processTags(featuredBlogData.tags),
				slug:
					featuredBlogData.slug ||
					`#${featuredBlogData.title?.toLowerCase().replace(/\s+/g, '-')}`,
			}
		: {
				title: 'Article non disponible',
				excerpt: 'Aucun article à afficher pour le moment.',
				date: 'Date non disponible',
				readTime: '5 min de lecture',
				image: '/placeholder.svg?height=600&width=1200',
				tags: ['Blog'],
				slug: '#',
			}

	// Process remaining blogs data
	const processedBlogs =
		Array.isArray(blogs) && blogs.length > 1
			? blogs.slice(1).map(blog => ({
					title: blog.title || 'Titre non disponible',
					excerpt: blog.description || 'Description non disponible.',
					date: formatDate(blog.publishedAt || blog.createdAt),
					readTime: calculateReadTime(blog.body),
					image: blog.image?.url
						? `https://breval-api.lightin.io${blog.image.url}`
						: '/placeholder.svg?height=300&width=500',
					tags: processTags(blog.tags),
					slug:
						blog.slug || `#${blog.title?.toLowerCase().replace(/\s+/g, '-')}`,
				}))
			: []

	const categories = [
		'Tous les articles',
		'Développement créatif',
		'Développement Web',
		'Design',
		'Graphiques 3D',
		'Tutoriels',
		'Études de cas',
	]

	return (
		<main className="from-gray-950 to-gray-900 min-h-screen bg-gradient-to-b pt-20 text-white">
			<div className="relative">
				<ScrollObject3D />

				<section className="relative py-20">
					<div className="retro-grid absolute inset-0 opacity-30"></div>
					<div className="sakura-bg absolute inset-0 opacity-10"></div>

					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-12 text-center"
						>
							<h1 className="text-shadow mb-4 text-4xl font-bold md:text-6xl">
								<span className="text-primary">Blog</span> & Réflexions
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl">
								Idées, tutoriels et réflexions sur le développement créatif,
								l'art numérique et l'intersection de la technologie et de la
								créativité.
							</p>
						</motion.div>

						<div className="mb-12 flex flex-wrap justify-center gap-3">
							{categories.map((category, index) => (
								<Button
									key={index}
									variant={index === 0 ? 'default' : 'outline'}
									size="sm"
									className={
										index === 0
											? 'bg-primary hover:bg-primary/80'
											: 'border-primary/30 hover:bg-primary/20'
									}
								>
									{category}
								</Button>
							))}
						</div>

						{/* Featured Post */}
						{featuredBlogData && (
							<motion.div
								ref={featuredRef}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isFeaturedInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.7 }}
								className="mb-16"
							>
								<div className="border-primary/30 bg-gray-900/60 relative overflow-hidden rounded-lg border backdrop-blur-sm">
									<div className="dithered absolute inset-0 opacity-20"></div>
									<div className="md:flex">
										<div className="relative h-64 md:h-auto md:w-1/2">
											<Image
												src={featuredPost.image}
												alt={featuredPost.title}
												fill
												className="object-cover"
												unoptimized
											/>
											<div className="absolute left-4 top-4">
												<Badge className="bg-primary text-white">
													En vedette
												</Badge>
											</div>
										</div>
										<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
											<div>
												<div className="mb-4 flex flex-wrap gap-2">
													{featuredPost.tags.map((tag, index) => (
														<Badge
															key={index}
															variant="outline"
															className="border-primary/30 bg-primary/10"
														>
															{tag}
														</Badge>
													))}
												</div>
												<h2 className="mb-4 text-2xl font-bold md:text-3xl">
													{featuredPost.title}
												</h2>
												<p className="text-muted-foreground mb-6">
													{featuredPost.excerpt}
												</p>
											</div>
											<div>
												<div className="text-muted-foreground mb-4 flex items-center text-sm">
													<Calendar className="mr-2 h-4 w-4" />
													<span>{featuredPost.date}</span>
													<span className="mx-2">•</span>
													<Clock className="mr-2 h-4 w-4" />
													<span>{featuredPost.readTime}</span>
												</div>
												<Link href={`/blog/${featuredPost.slug}`}>
													<Button className="bg-primary hover:bg-primary/80 w-full md:w-auto">
														Lire l'article
														<ArrowRight className="ml-2 h-4 w-4" />
													</Button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}

						{/* Blog Posts Grid */}
						<motion.div
							ref={ref}
							variants={container}
							initial="hidden"
							animate={isInView ? 'show' : 'hidden'}
							className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
						>
							{processedBlogs.map((post, index) => (
								<motion.div key={post.slug || index} variants={item}>
									<Card className="border-primary/20 bg-gray-900/60 hover:border-primary/50 flex h-full flex-col overflow-hidden backdrop-blur-sm transition-all duration-300">
										<div className="relative h-48 overflow-hidden">
											<Image
												src={post.image}
												alt={post.title}
												fill
												className="object-cover transition-transform duration-500 hover:scale-105"
												unoptimized
											/>
										</div>

										<CardContent className="flex-grow pt-6">
											<div className="mb-3 flex flex-wrap gap-2">
												{post.tags.slice(0, 2).map((tag, tagIndex) => (
													<Badge
														key={tagIndex}
														variant="outline"
														className="border-primary/30 bg-primary/10"
													>
														{tag}
													</Badge>
												))}
											</div>
											<h3 className="mb-2 text-xl font-bold">{post.title}</h3>
											<p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
												{post.excerpt}
											</p>
											<div className="text-muted-foreground flex items-center text-sm">
												<Calendar className="mr-2 h-4 w-4" />
												<span>{post.date}</span>
												<span className="mx-2">•</span>
												<Clock className="mr-2 h-4 w-4" />
												<span>{post.readTime}</span>
											</div>
										</CardContent>

										<CardFooter className="pt-0">
											<Link href={`/blog/${post.slug}`} className="w-full">
												<Button
													variant="ghost"
													className="hover:bg-primary/20 w-full justify-between hover:text-white"
												>
													Lire l'article
													<ArrowRight className="ml-2 h-4 w-4" />
												</Button>
											</Link>
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>

						{/* Load More Button - Commented out for now */}
						{/* <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="default" className="bg-primary hover:bg-primary/80">
                Charger plus d'articles
              </Button>
            </motion.div> */}
					</div>
				</section>
			</div>
		</main>
	)
}
