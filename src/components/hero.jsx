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
					>
						<span className="bg-card/80 border-primary/30 text-muted-foreground pixel-corners inline-block rounded-full border px-6 py-2 text-sm font-medium backdrop-blur-md">
							👋 Hello, I'm
						</span>
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
						<span className="text-primary dark:text-shadow-dark text-shadow-light">
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
							<div className="bg-primary/20 absolute inset-0 rounded-full blur-xl" />
							<p className="border-primary/30 bg-card/60 pixel-corners relative rounded-full border px-8 py-3 text-lg backdrop-blur-sm md:text-xl">
								Creative Developer & Digital Craftsman
							</p>
						</div>
					</motion.div>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1 }}
						className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
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
							className="magnetic-button bg-primary hover:bg-primary/90 text-primary-foreground pixel-corners rounded-full px-8 py-3"
						>
							<Play className="mr-2 h-5 w-5" />
							View My Work
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="magnetic-button border-primary/30 hover:bg-primary/10 pixel-corners rounded-full px-8 py-3"
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
				className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 transform"
			>
				<div className="flex flex-col items-center">
					<p className="text-muted-foreground mb-4 text-sm">
						Scroll to explore
					</p>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
						className="border-primary/50 bg-card/30 flex h-12 w-8 justify-center rounded-full border-2 p-2 backdrop-blur-sm"
					>
						<ArrowDown className="text-primary animate-bounce-slow h-4 w-4" />
					</motion.div>
				</div>
			</motion.div>
			{/* Bottom Gradient */}
			<div className="from-background z-5 absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t to-transparent" />
		</section>
	)
}
