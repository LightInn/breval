'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Filter } from 'lucide-react' // Github icon removed as it's not in the API data
import Image from 'next/image'
import Link from 'next/link'
import ScrollObject3D from '@/components/scroll-object-3d'

export default function ProjectClientNew({ projects = [] }) {
	// Default to empty array
	const ref = useRef(null)
	const featuredRef = useRef(null)
	const isInView = useInView(ref, { once: false, amount: 0.1 })
	const isFeaturedInView = useInView(featuredRef, { once: false, amount: 0.3 })

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

	// Get the first project as featured, or use fallback if projects is empty or not an array
	const featuredProjectData =
		Array.isArray(projects) && projects.length > 0 ? projects[0] : null
	const featuredProject = featuredProjectData
		? {
				title: featuredProjectData.title || 'Projet en vedette',
				description:
					featuredProjectData.short_description ||
					featuredProjectData.description ||
					'Description non disponible.',
				// Assurez-vous que media existe et a au moins un élément
				image:
					featuredProjectData.media &&
					featuredProjectData.media.length > 0 &&
					featuredProjectData.media[0].url
						? `https://breval-api.lightin.io${featuredProjectData.media[0].url}`
						: '/placeholder.svg?height=600&width=1200',
				url: featuredProjectData.url, // Peut être undefined, géré dans le JSX
				slug: featuredProjectData.title
					? featuredProjectData.title.toLowerCase().replace(/\s+/g, '-')
					: '#', // Générer un slug simple
				tags: featuredProjectData.technologies
					? featuredProjectData.technologies.split(',').map(tech => tech.trim())
					: ['Web Development'],
			}
		: {
				title: 'Projet non disponible',
				description: 'Aucun projet à afficher en vedette pour le moment.',
				image: '/placeholder.svg?height=600&width=1200',
				url: '#',
				slug: '#',
				tags: ['Tag par défaut'],
			}

	// Process remaining projects data to match the component structure
	const processedProjects =
		Array.isArray(projects) && projects.length > 1
			? projects.slice(1).map(project => ({
					title: project.title || 'Titre non disponible',
					description:
						project.short_description ||
						project.description ||
						'Description non disponible.',
					image:
						project.media && project.media.length > 0 && project.media[0].url
							? `${project.media[0].url}`
							: '/placeholder.svg?height=300&width=500',
					url: project.url,
					slug: project.title
						? project.title.toLowerCase().replace(/\s+/g, '-')
						: '#',
					tags: project.technologies
						? project.technologies.split(',').map(tech => tech.trim())
						: ['Web Development'],
				}))
			: []

	const categories = [
		'All Projects',
		'Web Development',
		'Mobile Apps',
		'UI/UX Design',
		'3D & Interactive',
		'SaaS',
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
								<span className="text-primary">Galerie</span> de Projets
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl">
								Une vitrine de mon travail créatif et de mes projets techniques.
								Chaque projet représente un défi unique et une expérience
								d'apprentissage dans mon parcours de développeur.
							</p>
						</motion.div>

						<div className="mb-8 flex items-center justify-between">
							<div className="flex flex-wrap gap-3">
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

							<Button
								variant="outline"
								size="sm"
								className="border-primary/30 hover:bg-primary/20"
							>
								<Filter className="mr-2 h-4 w-4" />
								Trier
							</Button>
						</div>

						{/* Featured Project */}
						{featuredProjectData && (
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
												src={featuredProject.image}
												alt={featuredProject.title}
												fill
												className="object-cover"
												unoptimized // Si les images viennent d'une API externe et ne sont pas optimisées par Next/Image
											/>
											<div className="absolute left-4 top-4">
												<Badge className="bg-primary text-white">
													Projet en Vedette
												</Badge>
											</div>
										</div>
										<div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
											<div>
												<h2 className="mb-4 text-2xl font-bold md:text-3xl">
													{featuredProject.title}
												</h2>
												<p className="text-muted-foreground mb-6">
													{featuredProject.description}
												</p>
												<div className="mb-6 flex flex-wrap gap-2">
													{featuredProject.tags.map((tag, tagIndex) => (
														<Badge
															key={tagIndex}
															variant="outline"
															className="border-primary/30 bg-primary/10"
														>
															{tag}
														</Badge>
													))}
												</div>
											</div>
											<div className="flex gap-4">
												{featuredProject.url && featuredProject.url !== '#' && (
													<Link
														href={featuredProject.url}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Button className="bg-primary hover:bg-primary/80">
															<ExternalLink className="mr-2 h-4 w-4" />
															Démo Live
														</Button>
													</Link>
												)}
												<Link href={`/projects/${featuredProject.slug}`}>
													<Button
														variant="outline"
														className="border-primary hover:bg-primary/20"
													>
														Voir Détails
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
							ref={ref}
							variants={container}
							initial="hidden"
							animate={isInView ? 'show' : 'hidden'}
							className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
						>
							{processedProjects.map((project, index) => (
								<motion.div key={project.slug || index} variants={item}>
									<Card className="border-primary/20 bg-gray-900/60 hover:border-primary/50 flex h-full flex-col overflow-hidden backdrop-blur-sm transition-all duration-300">
										<div className="relative h-48 overflow-hidden">
											<Image
												src={project.image}
												alt={project.title}
												fill
												className="object-cover transition-transform duration-500 hover:scale-105"
												unoptimized // Si les images viennent d'une API externe
											/>
										</div>

										<CardContent className="flex-grow pt-6">
											<h3 className="mb-2 text-xl font-bold">
												{project.title}
											</h3>
											<p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
												{project.description}
											</p>
											<div className="flex flex-wrap gap-2">
												{project.tags.slice(0, 3).map((tag, tagIndex) => (
													<Badge
														key={tagIndex}
														variant="outline"
														className="border-primary/30 bg-primary/10"
													>
														{tag}
													</Badge>
												))}
												{project.tags.length > 3 && (
													<Badge
														variant="outline"
														className="border-primary/30 bg-primary/10"
													>
														+{project.tags.length - 3}
													</Badge>
												)}
											</div>
										</CardContent>

										<CardFooter className="flex items-center justify-between pt-4">
											<Link href={`/projects/${project.slug}`}>
												<Button
													variant="ghost"
													size="sm"
													className="hover:bg-primary/20 text-primary"
												>
													Voir Détails
												</Button>
											</Link>
											{project.url && project.url !== '#' && (
												<Link
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Button
														variant="outline"
														size="sm"
														className="border-primary hover:bg-primary/20"
													>
														<ExternalLink className="mr-2 h-4 w-4" />
														Démo Live
													</Button>
												</Link>
											)}
										</CardFooter>
									</Card>
								</motion.div>
							))}
						</motion.div>

						{/* Load More Button - Functionality to be implemented if needed */}
						{/* <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="default" className="bg-primary hover:bg-primary/80">
                Charger Plus
              </Button>
            </motion.div> */}
					</div>
				</section>
			</div>
		</main>
	)
}
