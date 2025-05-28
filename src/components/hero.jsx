'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Play } from 'lucide-react'
import SakuraFall from '@/components/sakura-fall'

export default function Hero() {
	const videoRef = useRef(null)

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch(() => {
				// Fallback if autoplay fails
				console.log('Autoplay prevented')
			})
		}
	}, [])

	return (
		<section className="relative clear-both m-0 flex h-[100vh] h-screen w-[100vw] max-w-[100vw] items-center justify-center overflow-hidden overflow-x-hidden p-0">
			{/* Video Overlay Grid Pattern */}
			<div className="video-overlay" />
			{/* Video Background */}
			<iframe
				allow="autoplay"
				allowFullScreen
				className={
					'absolute left-1/2 top-1/2 border-0 ' +
					'animate-video bg-slate-900 opacity-75 dark:mix-blend-soft-light'
				}
				style={{
					width: 'max(100vw, calc(100vh * 16/9))',
					height: 'max(100vh, calc(100vw * 9/16))',
					transform: 'translate(-50%, -50%)',
					transformOrigin: 'center center',
				}}
				data-ready="true"
				id="topHeroVideo"
				src="https://player.vimeo.com/video/879007060?background=1&autoplay=1&loop=1&muted=1"
				title={'landing page background video'}
			></iframe>
			{/* Sakura Fall Effect */}
			<SakuraFall />
			{/* Background Patterns */}
			<div className="retro-grid-dark absolute inset-0 opacity-30" />
			<div className="dark:sakura-bg-dark sakura-bg-light absolute inset-0 opacity-20" />
			<div className="dark:mountain-bg-dark mountain-bg-light absolute bottom-0 left-0 right-0 opacity-40" />
			<div className="container relative z-10 mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-center"
				>
					{/* Greeting */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="mb-6"
						whileHover="hover" // Add whileHover to trigger children's hover animation
					>
						<div className="pixel-corners inline-block rounded-full border border-primary/30 bg-card/80 px-6 py-2 text-sm font-medium text-muted-foreground backdrop-blur-md">
							<motion.span
								variants={{
									hover: {
										scale: [1, 1.5, 1.3, 1.5, 1],
										rotate: [0, -15, 15, -15, 0],
										transition: {
											duration: 0.7,
											ease: 'easeInOut',
											times: [0, 0.2, 0.5, 0.8, 1],
										},
									},
								}}
								className="inline-block"
							>
								👋
							</motion.span>{' '}
							Hello, I'm
						</div>
					</motion.div>

					{/* Main Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="mb-6 text-5xl font-bold tracking-wider md:text-7xl lg:text-8xl"
					>
						<span className="dark:text-shadow-dark text-shadow-light">
							BRÉVAL
						</span>
						<br />
						<span className="dark:text-shadow-dark text-shadow-light text-primary">
							LE FLOCH
						</span>
					</motion.h1>

					{/* Subtitle */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
						className="mb-8"
					>
						<div className="relative inline-block">
							<div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
							<p className="pixel-corners relative rounded-full border border-primary/30 bg-card/60 px-8 py-3 text-lg backdrop-blur-sm md:text-xl">
								Creative Developer & Digital Craftsman
							</p>
						</div>
					</motion.div>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1 }}
						className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground"
					>
						CTO of ForMenu, Co-founder of multiple startups, and passionate
						about exploring the infinite possibilities of technology and
						creative development.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="flex flex-col items-center justify-center gap-4 sm:flex-row"
					>
						<Button
							size="lg"
							className="magnetic-button pixel-corners rounded-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90"
						>
							<Play className="mr-2 h-5 w-5" />
							View My Work
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="magnetic-button pixel-corners rounded-full border-primary/30 px-8 py-3 hover:bg-primary/10"
						>
							Get In Touch
						</Button>
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1.4 }}
				className="absolute inset-x-0 bottom-12 z-10 z-30 flex justify-center"
			>
				<div className="flex flex-col items-center">
					<p className="mb-4 text-sm text-muted-foreground">
						Scroll to explore
					</p>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
						className="flex h-12 w-8 justify-center rounded-full border-2 border-primary/50 bg-card/30 p-2 backdrop-blur-sm"
					>
						<ArrowDown className="animate-bounce-slow h-4 w-4 text-primary" />
					</motion.div>
				</div>
			</motion.div>
			{/* Bottom Gradient */}
			<div className="z-5 absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
		</section>
	)
}
