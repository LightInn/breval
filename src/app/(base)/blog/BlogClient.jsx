'use client'

import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function BlogClient({ blogs = [] }) {
	const ref = useRef(null)
	const featuredRef = useRef(null)
	const isInView = useInView(ref, { amount: 0.1, once: true })
	const isFeaturedInView = useInView(featuredRef, { amount: 0.3, once: true })

	// State for category filtering
	const [selectedCategory, setSelectedCategory] = useState('Tous les articles')

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
			opacity: 1,
		},
		hidden: { opacity: 0 },
	}

	const item = {
		show: { transition: { duration: 0.5 }, opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 20 },
	}

	// Format dates and process blog data
	const formatDate = dateString => {
		if (!dateString) return 'Date non disponible'
		try {
			const date = new Date(dateString)
			return date.toLocaleDateString('fr-FR', {
				year: 'numeric',
				day: 'numeric',
				month: 'long',
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
				image: featuredBlogData.image
					? `${featuredBlogData.image}`
					: '/placeholder.svg?height=600&width=1200',
				slug:
					featuredBlogData.url ||
					`#${featuredBlogData.title?.toLowerCase().replace(/\s+/g, '-')}`,
				date: formatDate(
					featuredBlogData.publishedAt || featuredBlogData.createdAt
				),
				excerpt: featuredBlogData.describe || 'Description non disponible.',
				title: featuredBlogData.title || 'Article en vedette',
				readTime: calculateReadTime(featuredBlogData.body),
				tags: processTags(featuredBlogData.tags),
			}
		: {
				excerpt: 'Aucun article à afficher pour le moment.',
				image: '/placeholder.svg?height=600&width=1200',
				title: 'Article non disponible',
				readTime: '5 min de lecture',
				date: 'Date non disponible',
				tags: ['Blog'],
				slug: '#',
			}

	// Process remaining blogs data
	const processedBlogs =
		Array.isArray(blogs) && blogs.length > 1
			? blogs.slice(1).map(blog => ({
					image: blog.image
						? `${blog.image}`
						: '/placeholder.svg?height=300&width=500',
					slug:
						blog.url || `#${blog.title?.toLowerCase().replace(/\s+/g, '-')}`,
					excerpt: blog.describe || 'Description non disponible.',
					date: formatDate(blog.publishedAt || blog.createdAt),
					title: blog.title || 'Titre non disponible',
					readTime: calculateReadTime(blog.body),
					tags: processTags(blog.tags),
				}))
			: []

	// Extract unique categories from all blog tags
	const categories = useMemo(() => {
		const allTags = new Set(['Tous les articles'])

		// Add tags from all blogs
		if (Array.isArray(blogs)) {
			blogs.forEach(blog => {
				const tags = processTags(blog.tags)
				tags.forEach(tag => {
					if (tag !== 'Article de blog') {
						allTags.add(tag)
					}
				})
			})
		}

		return Array.from(allTags)
	}, [blogs])

	// Filter blogs based on selected category
	const filteredBlogs = useMemo(() => {
		if (selectedCategory === 'Tous les articles') {
			return processedBlogs
		}

		return processedBlogs.filter(blog =>
			blog.tags.some(tag => tag === selectedCategory)
		)
	}, [processedBlogs, selectedCategory])

	// Filter featured post as well
	const shouldShowFeatured = useMemo(() => {
		if (selectedCategory === 'Tous les articles') {
			return true
		}

		return (
			featuredBlogData &&
			featuredPost.tags.some(tag => tag === selectedCategory)
		)
	}, [selectedCategory, featuredBlogData, featuredPost])

	const handleCategoryClick = category => {
		setSelectedCategory(category)
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="relative">
				<section className="relative py-20">
					<div className="retro-grid-light pointer-events-none absolute inset-0 z-0 opacity-30"></div>
					{/* <div className="sakura-bg-light absolute inset-0 opacity-10"></div> */}

					<div className="container mx-auto px-4">
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="mb-12 text-center"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-shadow mb-4 text-4xl font-bold md:text-6xl">
								<span className="text-primary">Blog</span> & Réflexions
							</h1>
							<p className="mx-auto max-w-2xl text-muted-foreground">
								Idées, tutoriels et réflexions sur le développement créatif,
								l'art numérique et l'intersection de la technologie et de la
								créativité.
							</p>
							{selectedCategory !== 'Tous les articles' && (
								<p className="mt-4 text-sm text-primary">
									Catégorie: {selectedCategory} •{' '}
									{filteredBlogs.length + (shouldShowFeatured ? 1 : 0)} article
									{filteredBlogs.length + (shouldShowFeatured ? 1 : 0) > 1
										? 's'
										: ''}
								</p>
							)}
						</motion.div>

						<div className="mb-12 flex flex-wrap justify-center gap-3">
							{categories.map((category, index) => (
								<Button
									className={
										selectedCategory === category
											? 'bg-primary hover:bg-primary/80'
											: 'border-primary/30 hover:bg-primary/20'
									}
									key={index}
									onClick={() => handleCategoryClick(category)}
									size="sm"
									variant={
										selectedCategory === category ? 'default' : 'outline'
									}
								>
									{category}
								</Button>
							))}
						</div>

						{/* Featured Post */}
						{featuredBlogData && shouldShowFeatured && (
							<motion.div
								animate={
									isFeaturedInView
										? { opacity: 1, y: 0 }
										: { opacity: 0, y: 20 }
								}
								className="mb-16"
								initial={{ opacity: 0, y: 20 }}
								ref={featuredRef}
								transition={{ duration: 0.7 }}
							>
								<div className="relative overflow-hidden rounded-lg border border-primary/30 bg-gray-900/60 backdrop-blur-sm">
									<div className="md:flex">
										<div className="relative h-64 md:h-auto md:w-1/2">
											<Image
												alt={featuredPost.title}
												className="object-cover"
												fill
												src={featuredPost.image}
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
															className="border-primary/30 bg-primary/10"
															key={index}
															variant="outline"
														>
															{tag}
														</Badge>
													))}
												</div>
												<h2 className="mb-4 text-2xl font-bold md:text-3xl">
													{featuredPost.title}
												</h2>
												<p className="mb-6 text-muted-foreground">
													{featuredPost.excerpt}
												</p>
											</div>
											<div>
												<div className="mb-4 flex items-center text-sm text-muted-foreground">
													<Calendar className="mr-2 h-4 w-4" />
													<span>{featuredPost.date}</span>
													<span className="mx-2">•</span>
													<Clock className="mr-2 h-4 w-4" />
													<span>{featuredPost.readTime}</span>
												</div>
												<Link href={`/blog/articles/${featuredPost.slug}`}>
													<Button className="w-full bg-primary hover:bg-primary/80 md:w-auto">
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
						{filteredBlogs.length > 0 ? (
							<motion.div
								animate={isInView ? 'show' : 'hidden'}
								className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
								initial="hidden"
								ref={ref}
								variants={container}
							>
								{filteredBlogs.map((post, index) => (
									<motion.div key={post.slug || index} variants={item}>
										<Card className="flex h-full flex-col overflow-hidden border-primary/20 bg-gray-900/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
											<div className="relative h-48 overflow-hidden">
												<Image
													alt={post.title}
													className="object-cover transition-transform duration-500 hover:scale-105"
													fill
													src={post.image}
													unoptimized
												/>
											</div>

											<CardContent className="flex-grow pt-6">
												<div className="mb-3 flex flex-wrap gap-2">
													{post.tags.slice(0, 2).map((tag, tagIndex) => (
														<Badge
															className="border-primary/30 bg-primary/10"
															key={tagIndex}
															variant="outline"
														>
															{tag}
														</Badge>
													))}
												</div>
												<h3 className="mb-2 text-xl font-bold">{post.title}</h3>
												<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
													{post.excerpt}
												</p>
												<div className="flex items-center text-sm text-muted-foreground">
													<Calendar className="mr-2 h-4 w-4" />
													<span>{post.date}</span>
													<span className="mx-2">•</span>
													<Clock className="mr-2 h-4 w-4" />
													<span>{post.readTime}</span>
												</div>
											</CardContent>

											<CardFooter className="pt-0">
												<Link
													className="w-full"
													href={`/blog/articles/${post.slug}`}
												>
													<Button
														className="w-full justify-between hover:bg-primary/20 hover:text-white"
														variant="ghost"
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
						) : (
							<motion.div
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								className="py-16 text-center"
								initial={{ opacity: 0, y: 20 }}
								ref={ref}
								transition={{ duration: 0.5 }}
							>
								<div className="mx-auto max-w-md">
									<h3 className="mb-2 text-xl font-semibold">
										Aucun article trouvé
									</h3>
									<p className="mb-4 text-muted-foreground">
										Aucun article n'est disponible dans la catégorie "
										{selectedCategory}".
									</p>
									<Button
										className="border-primary/30 hover:bg-primary/20"
										onClick={() => handleCategoryClick('Tous les articles')}
										variant="outline"
									>
										Voir tous les articles
									</Button>
								</div>
							</motion.div>
						)}

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
