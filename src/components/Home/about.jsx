'use client'

import { Code, Cpu, ExternalLink, Github, Globe, Linkedin } from 'lucide-react'
import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function About() {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.3, once: true })

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
			opacity: 1,
		},
		hidden: { opacity: 0 },
	}

	const item = {
		show: { transition: { duration: 0.5 }, opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 20 },
	}

	const roles = [
		{
			description: 'image meta-description generation platform',
			icon: <Globe className="h-4 w-4" />,
			title: 'CTO of the start-up',
			url: 'https://forvoyez.com',
			link: 'ForVoyez',
		},
		{
			description: 'a platform to reference makeup artists',
			icon: <Code className="h-4 w-4" />,
			url: 'https://my-makeup.fr',
			title: 'Co-founder of',
			link: 'My-Makeup',
		},
		{
			description: 'an e-commerce website for art',
			icon: <Code className="h-4 w-4" />,
			title: 'CTO of the start-up',
			url: 'https://formenu.fr',
			link: 'ForMenu',
		},
		{
			description: 'the hub for our bees',
			icon: <Cpu className="h-4 w-4" />,
			url: 'https://forhives.fr',
			title: 'Co-founder of',
			link: 'ForHives',
		},
	]

	return (
		<section className="relative overflow-hidden py-20" id="about">
			<div className="dark:retro-grid-dark retro-grid-light absolute inset-0 opacity-20" />
			<div className="dark:sakura-bg-dark sakura-bg-light absolute inset-0 opacity-10" />
			<div className="container mx-auto px-4">
				<motion.div
					animate={isInView ? 'show' : 'hidden'}
					className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2"
					initial="hidden"
					ref={ref}
					variants={container}
				>
					{/* Left Column - Introduction */}
					<div className="order-2 lg:order-1">
						<motion.h2
							className="mb-6 text-3xl font-bold md:text-4xl"
							variants={item}
						>
							Hello, my name is{' '}
							<span className="text-primary">Bréval Le Floch</span>
						</motion.h2>

						<motion.div className="mb-8 space-y-4" variants={item}>
							{roles.map((role, index) => (
								<Card
									className="border-primary/20 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40"
									key={index}
								>
									<CardContent className="p-4">
										<div className="flex items-start">
											<div className="mr-3 mt-1 text-primary">{role.icon}</div>
											<p className="text-sm">
												{role.title}{' '}
												<a
													className="magnetic-button font-medium text-primary hover:underline"
													href={role.url}
												>
													{role.link}
												</a>
												{role.description && <span>, {role.description}</span>}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</motion.div>

						<motion.div className="mb-8 space-y-4" variants={item}>
							<p className="text-muted-foreground">
								I'm a work-study student living in Nantes. From my youngest age,
								I am very fascinated by the infinite possibilities of computers
								and new technologies.
							</p>
							<p className="text-muted-foreground">
								As I continue to learn and explore this ever-evolving universe,
								I'm driven by my passion to discover new worlds and their new
								rules. Currently focused on front-end development while
								maintaining a deep interest in all aspects of computer science.
							</p>
							<p className="text-muted-foreground">
								When I'm not coding, you'll find me exploring indie games or
								working on creative projects that push the boundaries of what's
								possible with technology.
							</p>
						</motion.div>

						<motion.div className="flex flex-wrap gap-4" variants={item}>
							<Link
								className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
								href="https://github.com/LightInn/"
								target="_blank"
							>
								<Button
									className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
									variant="outline"
								>
									<Github className="mr-2 h-4 w-4" />
									GitHub
								</Button>
							</Link>

							<Link
								className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
								href="https://www.linkedin.com/in/breval-lefloch/"
								target="_blank"
							>
								<Button
									className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
									variant="outline"
								>
									<Linkedin className="mr-2 h-4 w-4" />
									LinkedIn
								</Button>
							</Link>

							<Link
								className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
								href="/Resume.pdf"
								target="_blank"
							>
								<Button
									className="magnetic-button pixel-corners border-primary/30 hover:bg-primary/10"
									variant="outline"
								>
									<ExternalLink className="mr-2 h-4 w-4" />
									Resume
								</Button>
							</Link>
						</motion.div>
					</div>

					{/* Right Column - Photo & Journey */}
					<div className="order-1 space-y-8 lg:order-2">
						<motion.div className="flex justify-center" variants={item}>
							<div className="relative">
								<div className="absolute -inset-4 rounded-full bg-primary/20 blur-xl" />
								<div className="pixel-corners dark:dithered-dark dithered-light relative rounded-2xl border border-primary/30 bg-card/80 p-1 backdrop-blur-sm">
									<div className="overflow-hidden rounded-xl bg-card/90 p-4">
										<Image
											alt="Bréval Le Floch"
											className="rounded-xl"
											height={400}
											src="/home/breval_long_wood.png?height=400&width=400"
											width={400}
										/>
										<div className="absolute bottom-8 left-8 right-8 rounded-lg border border-primary/30 bg-card/90 p-3 backdrop-blur-sm">
											<p className="text-center text-sm font-bold text-primary">
												BRÉVAL LE FLOCH
											</p>
											<p className="text-center text-xs text-muted-foreground">
												Creative Developer
											</p>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
