'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import ScrollObject3D from '@/components/scroll-object-3d'

export default function ArtistPage() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: false, amount: 0.1 })

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

	const artExperiments = [
		{
			title: 'Generative Art Experiment #1',
			description:
				'Exploring procedural generation with WebGL and fragment shaders.',
			tags: ['WebGL', 'GLSL', 'Generative Art'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
		{
			title: 'Interactive Sound Visualization',
			description:
				'Audio-reactive visuals that respond to music and sound input.',
			tags: ['Web Audio API', 'Canvas', 'Three.js'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
		{
			title: 'Particle Flow Simulation',
			description: 'Physics-based particle system with fluid dynamics.',
			tags: ['Physics', 'Simulation', 'WebGL'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
		{
			title: 'Neural Network Art',
			description:
				'Artwork generated using machine learning and neural style transfer.',
			tags: ['AI', 'Machine Learning', 'TensorFlow.js'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
		{
			title: 'Fractal Explorer',
			description: 'Interactive visualization of Mandelbrot and Julia sets.',
			tags: ['Fractals', 'Mathematics', 'Interactive'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
		{
			title: 'Voxel Sculpture',
			description:
				'3D voxel-based digital sculptures with interactive elements.',
			tags: ['Voxel', '3D', 'WebGL'],
			image: '/placeholder.svg?height=300&width=500',
			demo: '#',
		},
	]

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="relative">
				<ScrollObject3D />

				<section className="relative py-20">
					<div className="retro-grid-dark pointer-events-none absolute inset-0 opacity-30"></div>
					{/* <div className="sakura-bg absolute inset-0 opacity-10"></div> */}

					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="mb-12 text-center"
						>
							<h1 className="text-shadow mb-4 text-4xl font-bold md:text-6xl">
								<span className="text-primary">Art</span> Experiments
							</h1>
							<p className="mx-auto max-w-2xl text-muted-foreground">
								A collection of creative coding experiments, generative art, and
								interactive digital experiences. These projects explore the
								intersection of code, art, and human interaction.
							</p>
						</motion.div>

						<motion.div
							ref={ref}
							variants={container}
							initial="hidden"
							animate={isInView ? 'show' : 'hidden'}
							className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
						>
							{artExperiments.map((experiment, index) => (
								<motion.div key={index} variants={item}>
									<Card className="h-full overflow-hidden border-primary/20 bg-gray-900/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
										<div className="relative h-48 overflow-hidden">
											<div className="dithered-light absolute inset-0 opacity-30"></div>
											<img
												src={experiment.image || '/placeholder.svg'}
												alt={experiment.title}
												className="h-full w-full object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
											<div className="absolute bottom-4 left-4">
												<h3 className="text-xl font-bold text-white">
													{experiment.title}
												</h3>
											</div>
										</div>

										<CardContent className="pt-6">
											<p className="mb-4 text-muted-foreground">
												{experiment.description}
											</p>
											<div className="flex flex-wrap gap-2">
												{experiment.tags.map((tag, tagIndex) => (
													<Badge
														key={tagIndex}
														variant="outline"
														className="border-primary/30 bg-primary/10"
													>
														{tag}
													</Badge>
												))}
											</div>
										</CardContent>

										<CardFooter className="mt-auto">
											<Button
												variant="outline"
												size="sm"
												className="w-full border-primary hover:bg-primary/20"
											>
												<Eye className="mr-2 h-4 w-4" />
												View Experiment
											</Button>
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
							<Button
								variant="default"
								className="bg-primary hover:bg-primary/80"
							>
								Load More Experiments
							</Button>
						</motion.div>
					</div>
				</section>
			</div>
		</main>
	)
}
