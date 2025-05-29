'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export default function CursorBlob() {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)

		const updatePosition = e => {
			setPosition({ x: e.clientX, y: e.clientY })

			const target = e.target
			const isInteractive =
				target.tagName === 'BUTTON' ||
				target.tagName === 'A' ||
				target.closest('button') ||
				target.closest('a') ||
				target.closest('.magnetic-button') ||
				window.getComputedStyle(target).cursor === 'pointer'

			setIsHovering(isInteractive)
		}

		window.addEventListener('mousemove', updatePosition)

		return () => {
			window.removeEventListener('mousemove', updatePosition)
		}
	}, [])

	// Always render on desktop, but check if mounted first
	if (!isMounted) return null

	// Only hide on mobile devices
	if (
		typeof window !== 'undefined' &&
		window.matchMedia('(max-width: 768px)').matches
	) {
		return null
	}

	return (
		<>
			{/* Main cursor blob */}
			<motion.div
				animate={{
					scale: isHovering ? 1.5 : 1,
					x: position.x - 20,
					y: position.y - 20,
				}}
				className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-luminosity"
				// Force opacity to always be 1
				style={{ opacity: 1 }}
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 30,
					mass: 0.5,
				}}
			>
				<div className="h-10 w-10 rounded-full bg-primary opacity-80 blur-sm" />
			</motion.div>
			{/* Inner cursor dot */}
			<motion.div
				animate={{
					x: position.x - 2,
					y: position.y - 2,
				}}
				className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
				// Force opacity to always be 1
				style={{ opacity: 1 }}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 30,
					mass: 0.2,
				}}
			>
				<div className="h-1 w-1 rounded-full bg-primary" />
			</motion.div>
			{/* Magnetic effect ring */}
			{isHovering && (
				<motion.div
					animate={{
						x: position.x - 30,
						y: position.y - 30,
					}}
					className="pointer-events-none fixed left-0 top-0 z-40"
					// Force opacity
					style={{ opacity: 0.6 }}
					transition={{
						type: 'spring',
						stiffness: 150,
						damping: 20,
					}}
				>
					<div className="w-15 h-15 animate-pulse rounded-full border-2 border-primary" />
				</motion.div>
			)}
		</>
	)
}
