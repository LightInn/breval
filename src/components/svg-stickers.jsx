'use client'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export function SvgSticker({ type, className = '', size = 'md' }) {
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
			rotate: rotations[Math.floor(Math.random() * rotations.length)],
			delay: delays[Math.floor(Math.random() * delays.length)],
			duration: durations[Math.floor(Math.random() * durations.length)],
			bounce: bounces[Math.floor(Math.random() * bounces.length)],
		}
	}, [type, className]) // Dépendances pour créer une animation unique par sticker

	const stickers = {
		sakura: (
			<svg
				overflow={'visible'}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={sizeClasses[size]}
			>
				<g>
					<rect
						x="4"
						y="4"
						width="56"
						height="56"
						rx="12"
						fill={
							isDark ? 'rgba(255, 105, 180, 0.2)' : 'rgba(255, 182, 193, 0.3)'
						}
						stroke={isDark ? '#ff69b4' : '#ffb6c1'}
						strokeWidth="2"
					/>
					<path
						d="M32 12C32 12 38 20 32 28C26 36 32 44 32 44C32 44 26 36 32 28C38 20 32 12 32 12Z"
						fill={isDark ? '#ff69b4' : '#ff1493'}
					/>
					<path
						d="M32 12C32 12 26 20 32 28C38 36 32 44 32 44C32 44 38 36 32 28C26 20 32 12 32 12Z"
						fill={isDark ? '#ff69b4' : '#ff1493'}
					/>
					<circle cx="32" cy="28" r="4" fill="white" />
				</g>
			</svg>
		),
		mountain: (
			<svg
				overflow={'visible'}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={sizeClasses[size]}
			>
				<g>
					<rect
						x="4"
						y="4"
						width="56"
						height="56"
						rx="12"
						fill={
							isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(147, 197, 253, 0.3)'
						}
						stroke={isDark ? '#93c5fd' : '#60a5fa'}
						strokeWidth="2"
					/>
					<path
						d="M12 48L24 24L36 32L48 16L52 48H12Z"
						fill={isDark ? '#93c5fd' : '#3b82f6'}
					/>
					<path
						d="M16 48L28 28L40 36L52 20L52 48H16Z"
						fill={isDark ? '#60a5fa' : '#2563eb'}
					/>
					<circle cx="20" cy="20" r="3" fill={isDark ? '#fbbf24' : '#f59e0b'} />
				</g>
			</svg>
		),
		star: (
			<svg
				overflow={'visible'}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={sizeClasses[size]}
			>
				<g>
					<rect
						x="4"
						y="4"
						width="56"
						height="56"
						rx="12"
						fill={
							isDark ? 'rgba(251, 191, 36, 0.2)' : 'rgba(251, 191, 36, 0.3)'
						}
						stroke={isDark ? '#fbbf24' : '#f59e0b'}
						strokeWidth="2"
					/>
					<path
						d="M32 16L36 28H48L38 36L42 48L32 40L22 48L26 36L16 28H28L32 16Z"
						fill={isDark ? '#fbbf24' : '#f59e0b'}
					/>
				</g>
			</svg>
		),
		cloud: (
			<svg
				overflow={'visible'}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={sizeClasses[size]}
			>
				<g>
					<rect
						x="4"
						y="4"
						width="56"
						height="56"
						rx="12"
						fill={
							isDark ? 'rgba(156, 163, 175, 0.2)' : 'rgba(229, 231, 235, 0.8)'
						}
						stroke={isDark ? '#9ca3af' : '#d1d5db'}
						strokeWidth="2"
					/>
					<path
						d="M20 36C16 36 12 32 12 28C12 24 16 20 20 20C22 16 26 14 30 16C34 14 38 16 40 20C44 20 48 24 48 28C48 32 44 36 40 36H20Z"
						fill={isDark ? '#9ca3af' : '#e5e7eb'}
					/>
				</g>
			</svg>
		),
		diamond: (
			<svg
				overflow={'visible'}
				viewBox="0 0 64 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={sizeClasses[size]}
			>
				<g>
					<rect
						x="4"
						y="4"
						width="56"
						height="56"
						rx="12"
						fill={
							isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(196, 181, 253, 0.3)'
						}
						stroke={isDark ? '#8b5cf6' : '#a855f7'}
						strokeWidth="2"
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
	}

	return (
		<motion.div
			className={`absolute ${className} overflow-visible`}
			initial={{ opacity: 0, scale: 0, rotate: animation.rotate }}
			whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
			transition={{
				duration: animation.duration,
				type: 'spring',
				bounce: animation.bounce,
				delay: animation.delay,
			}}
			viewport={{ once: true }}
			// Ensure stickers are above other content
			style={{ zIndex: 10 }}
		>
			{stickers[type]}
		</motion.div>
	)
}

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

				<SvgSticker type="sakura" className="left-8 top-4" size="md" />
				<SvgSticker type="mountain" className="right-16 top-8" size="lg" />
				<SvgSticker type="star" className="bottom-4 left-1/4" size="sm" />
				<SvgSticker
					type="cloud"
					className="left-1/2 top-12 -translate-x-1/2 transform"
					size="md"
				/>
				<SvgSticker type="diamond" className="bottom-8 right-8" size="sm" />
				{/* Ajout de stickers supplémentaires pour plus de richesse visuelle */}
				<SvgSticker type="star" className="left-12 top-16" size="sm" />
				<SvgSticker type="sakura" className="bottom-12 right-8" size="sm" />
			</div>
		</div>
	)
}
