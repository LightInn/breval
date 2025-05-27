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
				className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-luminosity"
				animate={{
					x: position.x - 20,
					y: position.y - 20,
					scale: isHovering ? 1.5 : 1,
				}}
				transition={{
					type: 'spring',
					damping: 30,
					stiffness: 200,
					mass: 0.5,
				}}
				// Force opacity to always be 1
				style={{ opacity: 1 }}
			>
				<div className="h-10 w-10 rounded-full bg-primary opacity-80 blur-sm" />
			</motion.div>
			{/* Inner cursor dot */}
			<motion.div
				className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
				animate={{
					x: position.x - 2,
					y: position.y - 2,
				}}
				transition={{
					type: 'spring',
					damping: 30,
					stiffness: 400,
					mass: 0.2,
				}}
				// Force opacity to always be 1
				style={{ opacity: 1 }}
			>
				<div className="h-1 w-1 rounded-full bg-primary" />
			</motion.div>
			{/* Magnetic effect ring */}
			{isHovering && (
				<motion.div
					className="pointer-events-none fixed left-0 top-0 z-40"
					animate={{
						x: position.x - 30,
						y: position.y - 30,
					}}
					transition={{
						type: 'spring',
						damping: 20,
						stiffness: 150,
					}}
					// Force opacity
					style={{ opacity: 0.6 }}
				>
					<div className="w-15 h-15 animate-pulse rounded-full border-2 border-primary" />
				</motion.div>
			)}
		</>
	)
}
