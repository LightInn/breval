'use client'

import { ExternalLink } from 'lucide-react'
import { useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ProjectClientNew({ projects = [] }) {
	// Default to empty array
	const [selectedCategory, setSelectedCategory] = useState('All Projects') // Added state for selected category
	const ref = useRef(null)
	const featuredRef = useRef(null)
	const isInView = useInView(ref, { once: false, amount: 0.1 })
	const isFeaturedInView = useInView(featuredRef, { once: false, amount: 0.3 })

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

	// Process all projects data to match the component structure
	const processedProjects =
		Array.isArray(projects) && projects.length > 0
			? projects.map(project => ({
					// Use main_media first, then fallback to first media item
					image:
						project.main_media?.url ||
						(project.media && project.media.length > 0 && project.media[0].url
							? project.media[0].url
							: '/placeholder.svg?height=300&width=500'),
					tags: project.skills
						? project.skills.slice(0, 3) // Limit to 3 tags for grid display
						: ['Web Development'],
					description:
						project.short_description ||
						project.description ||
						'Description non disponible.',
					title: project.title || 'Titre non disponible',
					slug: project.title ? project.title : '#',
					category: project.category || 'Other',
					url: project.url || project.live_url,
					liveUrl: project.live_url,
					githubUrl: project.url,
				}))
			: []

	// Generate dynamic categories from projects
	const projectCategories = Array.isArray(projects)
		? [...new Set(projects.map(p => p.category).filter(Boolean))]
		: []

	const categories = [
		'All Projects',
		...projectCategories,
		// Add some default categories if not present
		...[
			'Web Development',
			'Mobile Apps',
			'UI/UX Design',
			'3D & Interactive',
			'SaaS',
		].filter(cat => !projectCategories.includes(cat)),
	].slice(0, 6) // Limit to 6 categories for UI

	const handleCategoryClick = category => {
		setSelectedCategory(category)
	}

	const filteredProjects =
		selectedCategory === 'All Projects'
			? processedProjects
			: processedProjects.filter(
					project => project.category === selectedCategory
				)

	// Get the featured project based on the selected category
	const featuredProject =
		filteredProjects.length > 0
			? {
					...filteredProjects[0],
					image: filteredProjects[0].image.replace(
						'height=300&width=500',
						'height=600&width=1200'
					), // Higher resolution for featured
					tags: filteredProjects[0].tags.slice(0, 5), // Extend to 5 tags for featured display
				}
			: {
					description: 'Aucun projet à afficher pour cette catégorie.',
					image: '/placeholder.svg?height=600&width=1200',
					title: 'Aucun projet disponible',
					tags: ['Tag par défaut'],
					category: 'Other',
					githubUrl: null,
					liveUrl: null,
					slug: '#',
					url: '#',
				}

	// Remove the featured project from the grid to avoid duplication
	const gridProjects = filteredProjects.slice(1)

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="relative">
				{/* <ScrollObject3D /> */}

				<section className="relative py-20">
					<div className="retro-grid-dark pointer-events-none absolute inset-0 opacity-30"></div>
					{/* <div className="sakura-bg absolute inset-0 opacity-10"></div> */}

					<div className="container mx-auto px-4">
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="mb-12 text-center"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-shadow mb-4 text-4xl font-bold md:text-6xl">
								Project <span className="text-primary">Gallery</span>
							</h1>
							<p className="mx-auto max-w-2xl text-muted-foreground">
								A showcase of my creative work and technical projects. Each
								project represents a unique challenge and learning experience in
								my developer journey.
							</p>
						</motion.div>

						<div className="mb-8 flex items-center justify-between">
							<div className="flex flex-wrap gap-3">
								{categories.map((category, index) => (
									<Button
										className={
											selectedCategory === category
												? 'bg-primary hover:bg-primary/80'
												: 'border-primary/30 hover:bg-primary/20'
										}
										key={index}
										onClick={() => handleCategoryClick(category)} // Added onClick handler
										size="sm"
										variant={
											selectedCategory === category ? 'default' : 'outline'
										} // Updated variant based on selectedCategory
									>
										{category}
									</Button>
								))}
							</div>
						</div>

						{/* Featured Project */}
						{filteredProjects.length > 0 && (
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
												alt={featuredProject.title}
												className="object-cover"
												fill
												src={featuredProject.image}
												unoptimized // Si les images viennent d'une API externe et ne sont pas optimisées par Next/Image
											/>
											<div className="absolute left-4 top-4">
												<Badge className="bg-primary text-white">
													Featured Project
												</Badge>
											</div>
										</div>
										<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
											<div>
												<h2 className="mb-4 text-2xl font-bold md:text-3xl">
													{featuredProject.title}
												</h2>
												<p className="mb-6 text-muted-foreground">
													{featuredProject.description}
												</p>
												<div className="mb-6 flex flex-wrap gap-2">
													{featuredProject.tags.map((tag, tagIndex) => (
														<Badge
															className="border-primary/30 bg-primary/10"
															key={tagIndex}
															variant="outline"
														>
															{tag}
														</Badge>
													))}
												</div>
											</div>
											<div className="flex gap-4">
												{featuredProject.liveUrl && (
													<Link
														href={featuredProject.liveUrl}
														rel="noopener noreferrer"
														target="_blank"
													>
														<Button className="bg-primary hover:bg-primary/80">
															<ExternalLink className="mr-2 h-4 w-4" />
															Live Demo
														</Button>
													</Link>
												)}
												{featuredProject.githubUrl &&
													featuredProject.githubUrl !==
														featuredProject.liveUrl && (
														<Link
															href={featuredProject.githubUrl}
															rel="noopener noreferrer"
															target="_blank"
														>
															<Button
																className="border-primary/30 hover:bg-primary/20"
																variant="outline"
															>
																<ExternalLink className="mr-2 h-4 w-4" />
																GitHub
															</Button>
														</Link>
													)}
												<Link href={`/projects/${featuredProject.slug}`}>
													<Button
														className="border-primary hover:bg-primary/20"
														variant="outline"
													>
														View Details
													</Button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						)}

						{/* Projects Grid */}
						<motion.div
							animate={isInView ? 'show' : 'hidden'}
							className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
							initial="hidden"
							ref={ref}
							variants={container}
						>
							{gridProjects.map(
								(
									project,
									index // Use gridProjects instead of filteredProjects
								) => (
									<motion.div key={project.slug || index} variants={item}>
										<Card className="flex h-full flex-col overflow-hidden border-primary/20 bg-gray-900/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
											<div className="relative h-48 overflow-hidden">
												<Image
													alt={project.title}
													className="object-cover transition-transform duration-500 hover:scale-105"
													fill
													src={project.image}
													unoptimized
												/>
												{project.category && (
													<div className="absolute right-4 top-4">
														<Badge className="bg-primary/80 text-white">
															{project.category}
														</Badge>
													</div>
												)}
											</div>

											<CardContent className="flex-grow pt-6">
												<h3 className="mb-2 text-xl font-bold">
													{project.title}
												</h3>
												<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
													{project.description}
												</p>
												<div className="flex flex-wrap gap-2">
													{project.tags.slice(0, 3).map((tag, tagIndex) => (
														<Badge
															className="border-primary/30 bg-primary/10"
															key={tagIndex}
															variant="outline"
														>
															{tag}
														</Badge>
													))}
													{project.tags.length > 3 && (
														<Badge
															className="border-primary/30 bg-primary/10"
															variant="outline"
														>
															+{project.tags.length - 3}
														</Badge>
													)}
												</div>
											</CardContent>

											<CardFooter className="flex items-center justify-between pt-4">
												<Link href={`/projects/${project.slug}`}>
													<Button
														className="text-primary hover:bg-primary/20"
														size="sm"
														variant="ghost"
													>
														View Details
													</Button>
												</Link>
												<div className="flex gap-2">
													{project.liveUrl && (
														<Link
															href={project.liveUrl}
															rel="noopener noreferrer"
															target="_blank"
														>
															<Button
																className="border-primary hover:bg-primary/20"
																size="sm"
																variant="outline"
															>
																<ExternalLink className="mr-2 h-4 w-4" />
																Live
															</Button>
														</Link>
													)}
													{project.githubUrl &&
														project.githubUrl !== project.liveUrl && (
															<Link
																href={project.githubUrl}
																rel="noopener noreferrer"
																target="_blank"
															>
																<Button
																	className="border-primary/30 hover:bg-primary/20"
																	size="sm"
																	variant="outline"
																>
																	<ExternalLink className="mr-2 h-4 w-4" />
																	Code
																</Button>
															</Link>
														)}
												</div>
											</CardFooter>
										</Card>
									</motion.div>
								)
							)}
						</motion.div>

						{/* Load More Button - Functionality to be implemented if needed */}
						{/* <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="default" className="bg-primary hover:bg-primary/80">
                Load More
              </Button>
            </motion.div> */}
					</div>
				</section>
			</div>
		</main>
	)
}
