'use client'

import { Eye, X, Play, Pause, RotateCcw } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

import { motion, useInView, AnimatePresence } from 'framer-motion'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import ScrollObject3D from '@/components/scroll-object-3d'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ArtistPage() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: false, amount: 0.1 })
	const [selectedExperiment, setSelectedExperiment] = useState(null)
	const [isPlaying, setIsPlaying] = useState(true)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [backgroundAnimTime, setBackgroundAnimTime] = useState(0)

	// Auto-rotate experiments
	useEffect(() => {
		if (!isPlaying || selectedExperiment) return

		const interval = setInterval(() => {
			setCurrentIndex(prev => (prev + 1) % artExperiments.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [isPlaying, selectedExperiment])

	// Background animation timer
	useEffect(() => {
		if (!isPlaying) return

		const interval = setInterval(() => {
			setBackgroundAnimTime(prev => prev + 0.1)
		}, 100)

		return () => clearInterval(interval)
	}, [isPlaying])

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

	const artExperiments = [
		{
			description:
				'Vectorial Avatar that reacts to mouse movements, creating a dynamic and interactive digital identity.',
			image: '/placeholder.svg?height=600&width=800',
			tags: ['SVG', 'Interactive', 'Animation'],
			title: 'My Avatar',
			demo: '#',
			theme: 'organic',
			color: 'from-emerald-500/20 to-teal-600/20',
			bgPattern:
				'radial-gradient(circle at 20% 50%, rgba(0, 248, 165, 0.65) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(20,184,166,0.2) 0%, transparent 50%)',
			interactive:
				'Des deplacement qui naissent et évoluent selon vos mouvements de souris, créant un ensemble organiser et mechanique.',
		},
		// ,
		// {
		// 	description:
		// 		'Visualisations réactives au son qui transforment la musique en paysages visuels abstraits, créant une synesthésie numérique immersive.',
		// 	image: '/placeholder.svg?height=600&width=800',
		// 	tags: ['Web Audio API', 'Canvas', 'Three.js', 'Synesthesia'],
		// 	title: 'Ondes Synesthétiques',
		// 	demo: '#',
		// 	theme: 'sound',
		// 	color: 'from-purple-500/20 to-pink-600/20',
		// 	bgPattern:
		// 		'linear-gradient(45deg, rgba(168,85,247,0.1) 0%, transparent 25%, rgba(236,72,153,0.1) 50%, transparent 75%)',
		// 	interactive:
		// 		'Chaque note devient couleur, chaque rythme devient forme. Une danse visuelle qui traduit la musique en émotions pures.',
		// },
		// {
		// 	description:
		// 		'Système de particules basé sur la physique avec dynamique des fluides, simulant des écosystèmes digitaux vivants.',
		// 	image: '/placeholder.svg?height=600&width=800',
		// 	tags: ['Physics', 'Simulation', 'WebGL', 'Ecosystem'],
		// 	title: 'Écosystème Numérique',
		// 	demo: '#',
		// 	theme: 'fluid',
		// 	color: 'from-blue-500/20 to-cyan-600/20',
		// 	bgPattern:
		// 		'conic-gradient(from 0deg at 50% 50%, rgba(59,130,246,0.2) 0deg, transparent 60deg, rgba(6,182,212,0.2) 120deg, transparent 180deg)',
		// 	interactive:
		// 		'Un monde vivant où chaque particule suit les lois de la physique, créant des comportements émergents fascinants.',
		// },
	]

	return (
		<main className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 pt-20 text-white">
			<div className="relative">
				<ScrollObject3D />

				<section className="relative py-20" ref={ref}>
					{/* Animated Procedural Background */}
					<div className="absolute inset-0 overflow-hidden">
						{/* Base grid */}
						<div className="retro-grid-dark pointer-events-none absolute inset-0 opacity-30"></div>

						{/* Procedural animated shapes - Enhanced */}
						{isPlaying && (
							<div className="absolute inset-0">
								{/* Floating geometric shapes */}
								{[...Array(12)].map((_, i) => (
									<motion.div
										key={`shape-${i}`}
										className="absolute opacity-15"
										animate={{
											x: [0, 150, -75, 200, 0],
											y: [0, -120, 180, -60, 0],
											rotate: [0, 270, 540, 180, 360],
											scale: [1, 2, 0.6, 1.8, 1],
										}}
										transition={{
											duration: 20 + i * 3,
											repeat: Infinity,
											delay: i * 2,
											ease: 'easeInOut',
										}}
										style={{
											left: `${5 + i * 8}%`,
											top: `${10 + i * 7}%`,
										}}
									>
										<div
											className={`${
												i % 4 === 0
													? 'h-20 w-20'
													: i % 4 === 1
														? 'h-24 w-16'
														: i % 4 === 2
															? 'h-16 w-24'
															: 'w-18 h-18'
											} ${
												i % 3 === 0
													? 'bg-primary/25'
													: i % 3 === 1
														? 'bg-emerald-500/25'
														: 'bg-purple-500/25'
											} ${
												i % 5 === 0
													? 'rounded-full'
													: i % 5 === 1
														? 'rotate-45 rounded-lg'
														: i % 5 === 2
															? 'rotate-12 rounded-none'
															: i % 5 === 3
																? 'rounded-xl'
																: 'rounded-full'
											} blur-sm`}
										/>
									</motion.div>
								))}

								{/* Enhanced sine wave lines */}
								{[...Array(5)].map((_, i) => (
									<motion.div
										key={`wave-${i}`}
										className="absolute h-2 w-full opacity-10"
										style={{
											top: `${20 + i * 15}%`,
											background: `linear-gradient(90deg, transparent, ${
												i === 0
													? '#3b82f6'
													: i === 1
														? '#10b981'
														: i === 2
															? '#8b5cf6'
															: i === 3
																? '#f59e0b'
																: '#ef4444'
											}, transparent)`,
											transform: `rotate(${i * 12}deg)`,
										}}
										animate={{
											x: ['-120%', '120%'],
											scaleX: [0.3, 2, 0.6, 1.5, 0.3],
											scaleY: [1, 0.5, 2, 0.8, 1],
										}}
										transition={{
											duration: 12 + i * 3,
											repeat: Infinity,
											delay: i * 0.8,
											ease: 'linear',
										}}
									/>
								))}

								{/* Enhanced pulsing circles */}
								{[...Array(8)].map((_, i) => (
									<motion.div
										key={`pulse-${i}`}
										className={`absolute rounded-full border-4 ${
											i % 2 === 0
												? 'border-primary/15'
												: 'border-emerald-500/15'
										}`}
										animate={{
											scale: [0, 6, 0],
											opacity: [0, 0.4, 0],
											rotate: [0, 180, 360],
										}}
										transition={{
											duration: 8,
											repeat: Infinity,
											delay: i * 1.5,
											ease: 'easeOut',
										}}
										style={{
											left: `${15 + i * 12}%`,
											top: `${10 + i * 11}%`,
											width: '30px',
											height: '30px',
										}}
									/>
								))}

								{/* New: Spiral patterns */}
								{[...Array(3)].map((_, i) => (
									<motion.div
										key={`spiral-${i}`}
										className="absolute"
										animate={{
											rotate: [0, 360],
											scale: [0.5, 1.5, 0.8, 1.2, 0.5],
										}}
										transition={{
											duration: 15 + i * 5,
											repeat: Infinity,
											ease: 'linear',
										}}
										style={{
											left: `${30 + i * 20}%`,
											top: `${25 + i * 25}%`,
											width: '100px',
											height: '100px',
										}}
									>
										{[...Array(6)].map((_, j) => (
											<motion.div
												key={j}
												className="absolute h-3 w-3 rounded-full bg-primary/10"
												style={{
													left: `${50 + 40 * Math.cos((j * 60 * Math.PI) / 180)}%`,
													top: `${50 + 40 * Math.sin((j * 60 * Math.PI) / 180)}%`,
												}}
												animate={{
													scale: [1, 1.5, 1],
													opacity: [0.5, 1, 0.5],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													delay: j * 0.2,
												}}
											/>
										))}
									</motion.div>
								))}
							</div>
						)}
					</div>

					<div className="container mx-auto px-4">
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="mb-12 text-center"
							initial={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.5 }}
						>
							<h1 className="text-shadow mb-4 text-4xl font-bold md:text-6xl">
								<span className="text-primary">Art</span> Experiments
							</h1>
							<p className="mx-auto max-w-2xl text-muted-foreground">
								Une collection d'expériences de code créatif, d'art génératif et
								d'expériences numériques interactives. Cliquez pour plonger dans
								chaque univers.
							</p>
						</motion.div>

						{/* Artistic Carousel */}
						<div className="relative mx-auto h-[80vh] max-w-6xl">
							{/* Carousel Controls */}
							<div className="absolute right-4 top-4 z-20 flex gap-2">
								<Button
									onClick={() => setIsPlaying(!isPlaying)}
									className="border-primary/30 bg-gray-900/80 backdrop-blur-sm hover:bg-primary/20"
									size="sm"
									variant="outline"
								>
									{isPlaying ? (
										<Pause className="h-4 w-4" />
									) : (
										<Play className="h-4 w-4" />
									)}
								</Button>
								<Button
									onClick={() =>
										setCurrentIndex(
											prev =>
												(prev - 1 + artExperiments.length) %
												artExperiments.length
										)
									}
									className="border-primary/30 bg-gray-900/80 backdrop-blur-sm hover:bg-primary/20"
									size="sm"
									variant="outline"
								>
									<RotateCcw className="h-4 w-4" />
								</Button>
							</div>

							{/* Stacked Cards Carousel */}
							<div className="relative flex h-full items-center justify-center">
								{artExperiments.map((experiment, index) => {
									const offset =
										(index - currentIndex + artExperiments.length) %
										artExperiments.length
									const isActive = offset === 0
									const isNext = offset === 1
									const isPrev = offset === artExperiments.length - 1

									return (
										<motion.div
											key={index}
											className="absolute cursor-pointer"
											style={{
												zIndex: artExperiments.length - offset,
											}}
											animate={{
												x:
													offset === 0
														? 0
														: offset === 1
															? 400
															: offset === artExperiments.length - 1
																? -400
																: 800,
												y: offset === 0 ? 0 : offset * 25,
												scale: offset === 0 ? 1 : 0.75 - offset * 0.1,
												rotateY:
													offset === 0
														? 0
														: offset === 1
															? -15
															: offset === artExperiments.length - 1
																? 15
																: -30,
												opacity:
													offset < 2 || offset === artExperiments.length - 1
														? 1
														: 0,
											}}
											whileHover={
												offset === 0
													? {
															scale: 1.05,
															rotateY: 5,
															transition: { duration: 0.3 },
														}
													: offset === 1
														? {
																scale: 0.85,
																x: 380,
																transition: { duration: 0.3 },
															}
														: offset === artExperiments.length - 1
															? {
																	scale: 0.85,
																	x: -380,
																	transition: { duration: 0.3 },
																}
															: {}
											}
											transition={{
												duration: 0.8,
												ease: [0.32, 0.72, 0, 1],
											}}
											onClick={() => {
												if (isActive) {
													setSelectedExperiment(experiment)
												} else {
													setCurrentIndex(index)
													setIsPlaying(false)
												}
											}}
										>
											{/* Card with Artistic Effects - Made Larger and Wider */}
											<div
												className="relative h-[650px] w-[500px] transform-gpu"
												style={{
													background: experiment.bgPattern,
												}}
											>
												{/* Artistic Border */}
												<div className="absolute inset-0 overflow-hidden rounded-3xl border-2 border-primary/30 bg-gray-900/90 backdrop-blur-sm">
													{/* Floating Particles Effect */}
													{isActive && (
														<div className="absolute inset-0">
															{[...Array(15)].map((_, i) => {
																// Deterministic positioning to avoid hydration errors
																const leftPos = (i * 23.7) % 100
																const topPos = (i * 17.3 + 31) % 100
																return (
																	<motion.div
																		key={i}
																		className="absolute h-2 w-2 rounded-full bg-primary/30"
																		animate={{
																			x: [0, 100, -50, 0],
																			y: [0, -100, 50, 0],
																			opacity: [0, 1, 0.5, 0],
																		}}
																		transition={{
																			duration: 3 + i * 0.2,
																			repeat: Infinity,
																			delay: i * 0.1,
																		}}
																		style={{
																			left: `${leftPos}%`,
																			top: `${topPos}%`,
																		}}
																	/>
																)
															})}
														</div>
													)}

													{/* Image Container - Larger */}
													<div className="relative h-80 overflow-hidden">
														<img
															alt={experiment.title}
															className="h-full w-full object-cover"
															src={experiment.image}
														/>

														{/* Dynamic Overlay */}
														<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

														{/* Glitch Effect for Active Card */}
														{isActive && (
															<motion.div
																className="absolute inset-0 bg-primary/5"
																animate={{
																	opacity: [0, 0.3, 0],
																	scaleX: [1, 1.02, 1],
																}}
																transition={{
																	duration: 2,
																	repeat: Infinity,
																	repeatType: 'reverse',
																}}
															/>
														)}
													</div>

													{/* Content - Adjusted for larger card */}
													<div className="flex h-[270px] flex-col p-8">
														<motion.h3
															className="mb-4 text-3xl font-bold text-primary"
															animate={
																isActive
																	? {
																			textShadow: [
																				'0 0 0px #3b82f6',
																				'0 0 15px #3b82f6',
																				'0 0 0px #3b82f6',
																			],
																		}
																	: {}
															}
															transition={{ duration: 2, repeat: Infinity }}
														>
															{experiment.title}
														</motion.h3>

														<p className="mb-6 line-clamp-4 text-base text-muted-foreground">
															{experiment.description}
														</p>

														{/* Tags - Larger for bigger cards */}
														<div className="mb-6 flex flex-wrap gap-2">
															{experiment.tags
																.slice(0, 3)
																.map((tag, tagIndex) => (
																	<Badge
																		key={tagIndex}
																		className="border-primary/30 bg-primary/10 px-3 py-1 text-sm"
																		variant="outline"
																	>
																		{tag}
																	</Badge>
																))}
														</div>

														{/* Action */}
														{isActive && (
															<motion.div
																initial={{ y: 20, opacity: 0 }}
																animate={{ y: 0, opacity: 1 }}
																className="mt-auto"
															>
																<Button
																	className="w-full bg-primary text-white hover:bg-primary/80"
																	size="sm"
																>
																	<Eye className="mr-2 h-4 w-4" />
																	Plonger dans l'expérience
																</Button>
															</motion.div>
														)}
													</div>
												</div>
											</div>
										</motion.div>
									)
								})}
							</div>

							{/* Navigation Dots */}
							<div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-3">
								{artExperiments.map((_, index) => (
									<button
										key={index}
										onClick={() => {
											setCurrentIndex(index)
											setIsPlaying(false)
										}}
										className={`h-3 w-3 rounded-full transition-all duration-300 ${
											index === currentIndex
												? 'scale-125 bg-primary'
												: 'bg-primary/30 hover:bg-primary/50'
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Full Screen Experience Modal */}
			<AnimatePresence>
				{selectedExperiment && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
						onClick={() => setSelectedExperiment(null)}
					>
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							className="flex h-full items-center justify-center p-8"
							onClick={e => e.stopPropagation()}
						>
							{/* Close Button */}
							<Button
								onClick={() => setSelectedExperiment(null)}
								className="absolute right-8 top-8 border-primary/30 bg-gray-900/80 backdrop-blur-sm hover:bg-primary/20"
								size="sm"
								variant="outline"
							>
								<X className="h-4 w-4" />
							</Button>

							{/* Full Experience Container */}
							<div
								className="relative h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl"
								style={{
									background: selectedExperiment.bgPattern,
								}}
							>
								{/* Animated Background */}
								<div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm">
									{/* Enhanced Particle System */}
									{[...Array(30)].map((_, i) => {
										// Deterministic positioning to avoid hydration errors
										const leftPos = (i * 12.7 + 7) % 100
										const topPos = (i * 19.3 + 13) % 100
										return (
											<motion.div
												key={i}
												className="absolute h-1 w-1 rounded-full bg-primary/40"
												animate={{
													x: [0, 200, -100, 300, 0],
													y: [0, -150, 100, -50, 0],
													opacity: [0, 1, 0.7, 1, 0],
													scale: [0, 1, 0.5, 1, 0],
												}}
												transition={{
													duration: 5 + i * 0.1,
													repeat: Infinity,
													delay: i * 0.05,
													ease: 'linear',
												}}
												style={{
													left: `${leftPos}%`,
													top: `${topPos}%`,
												}}
											/>
										)
									})}
								</div>

								{/* Content Grid */}
								<div className="relative z-10 grid h-full grid-cols-1 gap-8 p-12 lg:grid-cols-2">
									{/* Left: Enhanced Visual */}
									<div className="relative">
										<motion.div
											initial={{ scale: 0.8 }}
											animate={{ scale: 1 }}
											className="relative h-full overflow-hidden rounded-2xl border-2 border-primary/50"
										>
											<img
												alt={selectedExperiment.title}
												className="h-full w-full object-cover"
												src={selectedExperiment.image}
											/>

											{/* Interactive Overlay */}
											<motion.div
												className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
												animate={{
													background: [
														'linear-gradient(45deg, rgba(59,130,246,0.2) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)',
														'linear-gradient(225deg, rgba(59,130,246,0.1) 0%, transparent 50%, rgba(59,130,246,0.2) 100%)',
														'linear-gradient(45deg, rgba(59,130,246,0.2) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)',
													],
												}}
												transition={{ duration: 4, repeat: Infinity }}
											/>
										</motion.div>
									</div>

									{/* Right: Enhanced Content */}
									<div className="flex flex-col justify-center space-y-8">
										<motion.div
											initial={{ x: 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ delay: 0.2 }}
										>
											<h2 className="mb-6 text-5xl font-bold text-primary">
												{selectedExperiment.title}
											</h2>

											<p className="mb-6 text-xl leading-relaxed text-muted-foreground">
												{selectedExperiment.description}
											</p>

											<p className="mb-8 text-lg italic text-primary/80">
												{selectedExperiment.interactive}
											</p>
										</motion.div>

										<motion.div
											initial={{ y: 30, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.4 }}
											className="space-y-6"
										>
											{/* Enhanced Tags */}
											<div className="flex flex-wrap gap-3">
												{selectedExperiment.tags.map((tag, tagIndex) => (
													<Badge
														key={tagIndex}
														className="border-primary/50 bg-primary/20 px-4 py-2 text-sm transition-colors hover:bg-primary/30"
														variant="outline"
													>
														{tag}
													</Badge>
												))}
											</div>

											{/* Action Buttons */}
											<div className="flex gap-4">
												<Button
													className="rounded-xl bg-primary px-8 py-4 text-lg text-white hover:bg-primary/80"
													size="lg"
												>
													<Play className="mr-3 h-5 w-5" />
													Lancer l'Expérience
												</Button>
												<Button
													className="rounded-xl border-primary/50 px-8 py-4 text-lg hover:bg-primary/20"
													variant="outline"
													size="lg"
												>
													<Eye className="mr-3 h-5 w-5" />
													Code Source
												</Button>
											</div>
										</motion.div>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	)
}
