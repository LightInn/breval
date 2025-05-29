'use client'
import { useMemo } from 'react'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export function SectionDivider({ direction = null }) {
	const isDown = direction === 'down'
	const isUp = direction === 'up'
	return (
		<div className="relative z-20 overflow-visible py-20">
			{/* Container avec débordement vers le haut et coins arrondis */}
			<div
				className={
					'absolute inset-0 -mx-8 -my-16 overflow-visible rounded-[150px] bg-gradient-to-b ' +
					(isDown
						? ' from-transparent via-white to-white dark:via-black dark:to-black'
						: isUp
							? ' from-white via-white to-transparent dark:from-black dark:via-black'
							: ' from-transparent via-transparent to-transparent')
				}
			>
				{/* Effet de dégradé pour le fond */}

				<SvgSticker className="left-8 top-4" size="md" type="sakura" />
				<SvgSticker className="right-16 top-8" size="lg" type="mountain" />
				<SvgSticker className="bottom-4 left-1/4" size="sm" type="star" />
				<SvgSticker
					className="left-1/2 top-12 -translate-x-1/2 transform"
					size="md"
					type="cloud"
				/>
				<SvgSticker className="bottom-8 right-8" size="sm" type="diamond" />
				{/* Ajout de stickers supplémentaires pour plus de richesse visuelle */}
				<SvgSticker className="left-12 top-16" size="sm" type="star" />
				<SvgSticker className="bottom-12 right-8" size="sm" type="sakura" />
			</div>
		</div>
	)
}

export function SvgSticker({ className = '', size = 'md', type }) {
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	const sizeClasses = {
		sm: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-20 h-20', // Reduced from w-24 h-24
	}

	// Utiliser useMemo pour que chaque sticker ait une animation unique et fixe
	const animation = useMemo(() => {
		const rotations = [-360, -180, -90, 90, 180, 360]
		const delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5]
		const durations = [0.5, 0.6, 0.7, 0.8]
		const bounces = [0.3, 0.4, 0.5, 0.6]

		return {
			duration: durations[Math.floor(Math.random() * durations.length)],
			rotate: rotations[Math.floor(Math.random() * rotations.length)],
			bounce: bounces[Math.floor(Math.random() * bounces.length)],
			delay: delays[Math.floor(Math.random() * delays.length)],
		}
	}, [type, className]) // Dépendances pour créer une animation unique par sticker

	const stickers = {
		sakura: (
			<svg
				className={sizeClasses[size]}
				fill="none"
				overflow={'visible'}
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<rect
						fill={
							isDark ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 182, 193, 0.3)'
						}
						height="56"
						rx="12"
						stroke={isDark ? '#ff69b4' : '#ffb6c1'}
						strokeWidth="2"
						width="56"
						x="4"
						y="4"
					/>
					<path
						d="M32 12C32 12 38 20 32 28C26 36 32 44 32 44C32 44 26 36 32 28C38 20 32 12 32 12Z"
						fill={isDark ? '#ff69b4' : '#ff1493'}
					/>
					<path
						d="M32 12C32 12 26 20 32 28C38 36 32 44 32 44C32 44 38 36 32 28C26 20 32 12 32 12Z"
						fill={isDark ? '#ff69b4' : '#ff1493'}
					/>
					<circle cx="32" cy="28" fill="white" r="4" />
				</g>
			</svg>
		),
		mountain: (
			<svg
				className={sizeClasses[size]}
				fill="none"
				overflow={'visible'}
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<rect
						fill={
							isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(147, 197, 253, 0.3)'
						}
						height="56"
						rx="12"
						stroke={isDark ? '#93c5fd' : '#60a5fa'}
						strokeWidth="2"
						width="56"
						x="4"
						y="4"
					/>
					<path
						d="M12 48L24 24L36 32L48 16L52 48H12Z"
						fill={isDark ? '#93c5fd' : '#3b82f6'}
					/>
					<path
						d="M16 48L28 28L40 36L52 20L52 48H16Z"
						fill={isDark ? '#60a5fa' : '#2563eb'}
					/>
					<circle cx="20" cy="20" fill={isDark ? '#fbbf24' : '#f59e0b'} r="3" />
				</g>
			</svg>
		),
		diamond: (
			<svg
				className={sizeClasses[size]}
				fill="none"
				overflow={'visible'}
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<rect
						fill={
							isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(196, 181, 253, 0.3)'
						}
						height="56"
						rx="12"
						stroke={isDark ? '#8b5cf6' : '#a855f7'}
						strokeWidth="2"
						width="56"
						x="4"
						y="4"
					/>
					<path
						d="M32 16L44 28L32 48L20 28L32 16Z"
						fill={isDark ? '#8b5cf6' : '#a855f7'}
					/>
					<path
						d="M32 16L38 22L32 32L26 22L32 16Z"
						fill="white"
						opacity="0.5"
					/>
				</g>
			</svg>
		),
		cloud: (
			<svg
				className={sizeClasses[size]}
				fill="none"
				overflow={'visible'}
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<rect
						fill={
							isDark ? 'rgba(156, 163, 175, 0.2)' : 'rgba(229, 231, 235, 0.8)'
						}
						height="56"
						rx="12"
						stroke={isDark ? '#9ca3af' : '#d1d5db'}
						strokeWidth="2"
						width="56"
						x="4"
						y="4"
					/>
					<path
						d="M20 36C16 36 12 32 12 28C12 24 16 20 20 20C22 16 26 14 30 16C34 14 38 16 40 20C44 20 48 24 48 28C48 32 44 36 40 36H20Z"
						fill={isDark ? '#9ca3af' : '#e5e7eb'}
					/>
				</g>
			</svg>
		),
		star: (
			<svg
				className={sizeClasses[size]}
				fill="none"
				overflow={'visible'}
				viewBox="0 0 64 64"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<rect
						fill={
							isDark ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.3)'
						}
						height="56"
						rx="12"
						stroke={isDark ? '#fbbf24' : '#f59e0b'}
						strokeWidth="2"
						width="56"
						x="4"
						y="4"
					/>
					<path
						d="M32 16L36 28H48L38 36L42 48L32 40L22 48L26 36L16 28H28L32 16Z"
						fill={isDark ? '#fbbf24' : '#f59e0b'}
					/>
				</g>
			</svg>
		),
	}

	return (
		<motion.div
			className={`absolute ${className} overflow-visible`}
			initial={{ rotate: animation.rotate, opacity: 0, scale: 0 }}
			// Ensure stickers are above other content
			style={{ zIndex: 10 }}
			transition={{
				duration: animation.duration,
				bounce: animation.bounce,
				delay: animation.delay,
				type: 'spring',
			}}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
		>
			{stickers[type]}
		</motion.div>
	)
}
