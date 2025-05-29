'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export default function Cursor() {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isPointer, setIsPointer] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const updatePosition = e => {
			setPosition({ x: e.clientX, y: e.clientY })

			const target = e.target
			const isClickable =
				target.tagName === 'BUTTON' ||
				target.tagName === 'A' ||
				target.closest('button') ||
				target.closest('a') ||
				window.getComputedStyle(target).cursor === 'pointer'

			setIsPointer(isClickable)
		}

		const handleMouseEnter = () => setIsVisible(true)
		const handleMouseLeave = () => setIsVisible(false)

		window.addEventListener('mousemove', updatePosition)
		document.addEventListener('mouseenter', handleMouseEnter)
		document.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			window.removeEventListener('mousemove', updatePosition)
			document.removeEventListener('mouseenter', handleMouseEnter)
			document.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [])

	// Don't render on mobile devices
	if (
		typeof window !== 'undefined' &&
		window.matchMedia('(max-width: 768px)').matches
	) {
		return null
	}

	return (
		<>
			<motion.div
				animate={{
					scale: isPointer ? 1.5 : 1,
					opacity: isVisible ? 1 : 0,
					x: position.x - 16,
					y: position.y - 16,
				}}
				className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border-2 border-primary mix-blend-difference"
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 30,
					mass: 0.5,
				}}
			/>
			<motion.div
				animate={{
					opacity: isVisible ? 1 : 0,
					x: position.x - 4,
					y: position.y - 4,
				}}
				className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-primary mix-blend-difference"
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 30,
					mass: 0.2,
				}}
			/>
		</>
	)
}
