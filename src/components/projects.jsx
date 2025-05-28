'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedProjects } from '@/services/projects.services'

export default function Projects() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)

	// Charger les projets featured depuis l'API
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true)
				const data = await getFeaturedProjects()
				
				// Transformer les données de l'API au format attendu par le composant
				const transformedProjects = data.map((project, index) => {
					// Parser les skills de différents formats possibles
					let tags = ['Web Development'] // Valeur par défaut
					if (project.skills) {
						if (Array.isArray(project.skills)) {
							tags = project.skills.slice(0, 4) // Limiter à 4 tags
						} else if (typeof project.skills === 'string') {
							// Si c'est une chaîne, essayer de la parser (JSON ou séparée par virgules)
							try {
								const parsed = JSON.parse(project.skills)
								if (Array.isArray(parsed)) {
									tags = parsed.slice(0, 4)
								}
							} catch {
								// Si ce n'est pas du JSON, essayer de séparer par virgules
								tags = project.skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4)
							}
						}
					}

					return {
						title: project.title || 'Projet sans titre',
						description: project.short_description || project.description || 'Description non disponible.',
						tags,
						image: project.main_media?.url || 
							(project.media && project.media.length > 0 ? project.media[0].url : '/placeholder.svg?height=300&width=500'),
						github: project.url || '#',
						demo: project.live_url || '#',
						featured: index === 0, // Le premier projet (plus haut rank) est featured
						category: project.category || 'Web Development',
						rank: project.rank || 0,
					}
				})

				setProjects(transformedProjects)
			} catch (error) {
				console.error('Erreur lors du chargement des projets:', error)
				// En cas d'erreur, utiliser des données par défaut
				setProjects([])
			} finally {
				setLoading(false)
			}
		}

		fetchProjects()
	}, [])

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

	// Skeleton component pour l'état de chargement
	const ProjectSkeleton = () => (
		<Card className="h-full overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm">
			<div className="relative overflow-hidden h-48">
				<div className="h-full w-full bg-muted animate-pulse" />
			</div>
			<CardContent className="pt-6">
				<div className="space-y-2">
					<div className="h-4 bg-muted animate-pulse rounded w-3/4" />
					<div className="h-3 bg-muted animate-pulse rounded w-full" />
					<div className="h-3 bg-muted animate-pulse rounded w-2/3" />
				</div>
				<div className="flex flex-wrap gap-2 mt-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="h-6 w-16 bg-muted animate-pulse rounded" />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className="h-8 w-20 bg-muted animate-pulse rounded" />
				<div className="h-8 w-24 bg-muted animate-pulse rounded" />
			</CardFooter>
		</Card>
	)

	return (
		<section id="projects" className="relative py-20">
			<div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="mb-12 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">
						Featured <span className="text-primary">Projects</span>
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						A showcase of my creative work and technical projects. Each project
						represents a unique challenge and learning experience.
					</p>
				</motion.div>

				<motion.div
					ref={ref}
					variants={container}
					initial="hidden"
					animate={isInView ? 'show' : 'hidden'}
					className="grid grid-cols-1 gap-6 md:grid-cols-2"
				>
					{loading ? (
						// Afficher des skeletons pendant le chargement
						Array.from({ length: 4 }, (_, index) => (
							<motion.div key={index} variants={item}>
								<div className={index === 0 ? 'md:col-span-2' : ''}>
									<ProjectSkeleton />
								</div>
							</motion.div>
						))
					) : projects.length > 0 ? (
						// Afficher les projets chargés
						projects.map((project, index) => (
							<motion.div key={index} variants={item}>
								<Card
									className={`h-full overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 ${project.featured ? 'md:col-span-2' : ''}`}
								>
									<div
										className={`relative overflow-hidden ${project.featured ? 'h-64' : 'h-48'}`}
									>
										<div className="dark:dithered-dark dithered-light absolute inset-0 opacity-30" />
										<img
											src={project.image || '/placeholder.svg'}
											alt={project.title}
											className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
										{project.featured && (
											<div className="absolute left-4 top-4">
												<Badge className="pixel-corners bg-primary text-primary-foreground">
													Featured
												</Badge>
											</div>
										)}
										<div className="absolute bottom-4 left-4">
											<h3
												className={`font-bold text-white ${project.featured ? 'text-2xl' : 'text-xl'}`}
											>
												{project.title}
											</h3>
										</div>
									</div>

									<CardContent className="pt-6">
										<p className="mb-4 text-muted-foreground">
											{project.description}
										</p>
										<div className="flex flex-wrap gap-2">
											{project.tags.map((tag, tagIndex) => (
												<Badge
													key={tagIndex}
													variant="outline"
													className="pixel-corners border-primary/30 bg-primary/10"
												>
													{tag}
												</Badge>
											))}
										</div>
									</CardContent>

									<CardFooter className="flex justify-between">
										{project.github && project.github !== '#' ? (
											<Button
												variant="ghost"
												size="sm"
												className="magnetic-button pixel-corners hover:bg-primary/20"
												onClick={() => window.open(project.github, '_blank')}
											>
												<Github className="mr-2 h-4 w-4" />
												Code
											</Button>
										) : (
											<Button
												variant="ghost"
												size="sm"
												className="magnetic-button pixel-corners hover:bg-primary/20"
												disabled
											>
												<Github className="mr-2 h-4 w-4" />
												Code
											</Button>
										)}
										{project.demo && project.demo !== '#' ? (
											<Button
												variant="outline"
												size="sm"
												className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
												onClick={() => window.open(project.demo, '_blank')}
											>
												<ExternalLink className="mr-2 h-4 w-4" />
												Live Demo
											</Button>
										) : (
											<Button
												variant="outline"
												size="sm"
												className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
												disabled
											>
												<ExternalLink className="mr-2 h-4 w-4" />
												Live Demo
											</Button>
										)}
									</CardFooter>
								</Card>
							</motion.div>
						))
					) : (
						// Afficher un message si aucun projet n'est disponible
						<motion.div variants={item} className="md:col-span-2">
							<Card className="h-full overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm">
								<CardContent className="pt-6 text-center">
									<p className="text-muted-foreground">
										Aucun projet disponible pour le moment.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mt-12 text-center"
				>
					<Link href="/projects">
						<Button className="magnetic-button pixel-corners bg-primary hover:bg-primary/90">
							View All Projects
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
