'use client'

import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getFeaturedProjects } from '@/services/projects.services'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Projects() {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.1, once: true })
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
								tags = project.skills
									.split(',')
									.map(s => s.trim())
									.filter(Boolean)
									.slice(0, 4)
							}
						}
					}

					return {
						image:
							project.main_media?.url ||
							(project.media && project.media.length > 0
								? project.media[0].url
								: '/placeholder.svg?height=300&width=500'),
						description:
							project.short_description ||
							project.description ||
							'Description non disponible.',
						category: project.category || 'Web Development',
						title: project.title || 'Projet sans titre',
						demo: project.live_url || '#',
						github: project.url || '#',
						rank: project.rank || 0,
						featured: index === 0, // Le premier projet (plus haut rank) est featured
						tags,
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

	// Skeleton component pour l'état de chargement
	const ProjectSkeleton = () => (
		<Card className="h-full overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm">
			<div className="relative h-48 overflow-hidden">
				<div className="h-full w-full animate-pulse bg-muted" />
			</div>
			<CardContent className="pt-6">
				<div className="space-y-2">
					<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
					<div className="h-3 w-full animate-pulse rounded bg-muted" />
					<div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					{[1, 2, 3].map(i => (
						<div className="h-6 w-16 animate-pulse rounded bg-muted" key={i} />
					))}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className="h-8 w-20 animate-pulse rounded bg-muted" />
				<div className="h-8 w-24 animate-pulse rounded bg-muted" />
			</CardFooter>
		</Card>
	)

	return (
		<section className="relative py-20" id="projects">
			<div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
			<div className="container mx-auto px-4">
				<motion.div
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					className="mb-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
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
					animate={isInView ? 'show' : 'hidden'}
					className="grid grid-cols-1 gap-6 md:grid-cols-2"
					initial="hidden"
					ref={ref}
					variants={container}
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
											alt={project.title}
											className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
											src={project.image || '/placeholder.svg'}
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
												className={`font-bold dark:text-white ${project.featured ? 'text-2xl' : 'text-xl'}`}
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
													className="pixel-corners border-primary/30 bg-primary/10"
													key={tagIndex}
													variant="outline"
												>
													{tag}
												</Badge>
											))}
										</div>
									</CardContent>

									<CardFooter className="flex justify-between">
										{project.github && project.github !== '#' ? (
											<Button
												className="magnetic-button pixel-corners hover:bg-primary/20"
												onClick={() => window.open(project.github, '_blank')}
												size="sm"
												variant="ghost"
											>
												<Github className="mr-2 h-4 w-4" />
												Code
											</Button>
										) : (
											<Button
												className="magnetic-button pixel-corners hover:bg-primary/20"
												disabled
												size="sm"
												variant="ghost"
											>
												<Github className="mr-2 h-4 w-4" />
												Code
											</Button>
										)}
										{project.demo && project.demo !== '#' ? (
											<Button
												className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
												onClick={() => window.open(project.demo, '_blank')}
												size="sm"
												variant="outline"
											>
												<ExternalLink className="mr-2 h-4 w-4" />
												Live Demo
											</Button>
										) : (
											<Button
												className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
												disabled
												size="sm"
												variant="outline"
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
						<motion.div className="md:col-span-2" variants={item}>
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
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					className="mt-12 text-center"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
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
