'use client'

import { useRef, useEffect, useState } from 'react'
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

	useEffect(() => {
		async function loadProjects() {
			try {
				const projectsData = await getFeaturedProjects()
				if (projectsData && projectsData.length > 0) {
					setProjects(projectsData)
				} else {
					console.warn(
						"Aucun projet retourné par l'API, utilisation des projets par défaut"
					)
					setProjects([]) // Will trigger the failsafe in transformedProjects
				}
			} catch (error) {
				console.error('Erreur lors du chargement des projets:', error)
				console.warn("Utilisation des projets par défaut suite à l'erreur")
				setProjects([]) // Will trigger the failsafe in transformedProjects
			} finally {
				setLoading(false)
			}
		}
		loadProjects()
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

	// Failsafe: projets par défaut si l'API ne retourne rien
	const defaultProjects = [
		{
			id: 'default-1',
			title: 'Portfolio Project',
			description:
				'A showcase of creative work and technical expertise in modern web development.',
			tags: ['Next.js', 'React', 'Tailwind CSS'],
			image: '/placeholder.svg?height=300&width=500',
			github: '#',
			demo: '#',
			featured: true,
			rank: null,
			category: 'Web Development',
			slug: 'portfolio-project',
		},
		{
			id: 'default-2',
			title: 'SaaS Platform',
			description:
				'A scalable software as a service platform with modern architecture.',
			tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
			image: '/placeholder.svg?height=300&width=500',
			github: '#',
			demo: '#',
			featured: false,
			rank: null,
			category: 'SaaS',
			slug: 'saas-platform',
		},
		{
			id: 'default-3',
			title: 'Mobile Application',
			description: 'Cross-platform mobile application with native performance.',
			tags: ['React Native', 'Firebase', 'Redux'],
			image: '/placeholder.svg?height=300&width=500',
			github: '#',
			demo: '#',
			featured: false,
			rank: null,
			category: 'Mobile',
			slug: 'mobile-application',
		},
	]

	// Transform API data to component format, use default projects if API fails
	const transformedProjects =
		projects && projects.length > 0
			? projects.map((project, index) => ({
					id: project.id,
					title: project.title,
					description:
						project.short_description ||
						project.description?.substring(0, 150) + '...',
					tags: project.skills?.slice(0, 5) || [],
					image:
						project.main_media?.url ||
						project.media?.[0]?.url ||
						'/placeholder.svg?height=300&width=500',
					github: project.url,
					demo: project.live_url,
					featured: index < 4, // Les 4 premiers projets (meilleurs ranks) sont en featured
					rank: project.rank,
					category: project.category,
					slug: project.title.toLowerCase().replace(/\s+/g, '-'),
				}))
			: defaultProjects

	if (loading) {
		return (
			<section id="projects" className="relative py-20">
				<div className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
				<div className="container mx-auto px-4">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl font-bold md:text-4xl">
							Featured <span className="text-primary">Projects</span>
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							Chargement des projets...
						</p>
					</div>
				</div>
			</section>
		)
	}

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
					{transformedProjects.map((project, index) => (
						<motion.div key={project.id} variants={item}>
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
									{project.rank && (
										<div className="absolute right-4 top-4">
											<Badge className="pixel-corners bg-secondary text-secondary-foreground">
												Rank #{project.rank}
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
									{project.category && (
										<div className="mt-3">
											<Badge variant="secondary" className="pixel-corners">
												{project.category}
											</Badge>
										</div>
									)}
								</CardContent>

								<CardFooter className="flex justify-between">
									{project.github && (
										<Button
											variant="ghost"
											size="sm"
											className="magnetic-button pixel-corners hover:bg-primary/20"
											asChild
										>
											<Link
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
											>
												<Github className="mr-2 h-4 w-4" />
												Code
											</Link>
										</Button>
									)}
									{project.demo && (
										<Button
											variant="outline"
											size="sm"
											className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
											asChild
										>
											<Link
												href={project.demo}
												target="_blank"
												rel="noopener noreferrer"
											>
												<ExternalLink className="mr-2 h-4 w-4" />
												Live Demo
											</Link>
										</Button>
									)}
									{!project.demo && !project.github && (
										<Button
											variant="outline"
											size="sm"
											className="magnetic-button pixel-corners border-primary hover:bg-primary/20"
											asChild
										>
											<Link href={`/projects/${project.slug}`}>
												<ArrowRight className="mr-2 h-4 w-4" />
												Voir plus
											</Link>
										</Button>
									)}
								</CardFooter>
							</Card>
						</motion.div>
					))}
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
