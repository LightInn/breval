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
				className="h-1/2 w-1/2 animate-pulse"
				fill="#000000"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 511.999 511.999"
			>
				<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					strokeLinecap="round"
					strokeLinejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					{' '}
					<path
						d="M459.034,110.345c0-24.376-19.762-44.138-44.138-44.138h-29.195c-7.977,0-14.558-5.508-16.927-13.126 c-5.589-17.967-22.348-31.012-42.154-31.012H185.379c-24.376,0-44.138,19.762-44.138,44.138v105.931h317.793V110.345z"
						style={{ fill: '#dc8add' }}
					></path>
					<path
						d="M423.724,154.482c0-24.376-19.762-44.138-44.138-44.138h-23.023 c-10.988,0-20.302-7.061-24.583-17.181c-6.701-15.842-22.388-26.957-40.67-26.957H150.069c-3.023,0-5.975,0.31-8.828,0.889V128 H97.103v70.621c0,24.376,19.762,44.138,44.138,44.138h132.414v-70.621h150.069V154.482z"
						style={{ fill: '#c061cb' }}
					></path>
					<path
						d="M300.138,233.931v44.138c0,14.603-11.88,26.483-26.483,26.483h-8.828v-79.448h-17.655v44.138h-44.138 c-14.603,0-26.483-11.88-26.483-26.483v-52.966h-17.655v52.966c0,24.337,19.801,44.138,44.138,44.138h44.138v194.207h17.655V322.207 h8.828c24.337,0,44.138-19.801,44.138-44.138v-44.138H300.138z"
						style={{ fill: '#785353' }}
					></path>
					<g>
						{' '}
						<rect
							height="26.483"
							style={{ fill: '#643C3E' }}
							width="17.655"
							x="158.896"
							y="189.793"
						></rect>
						<rect
							height="35.31"
							style={{ fill: '#643C3E' }}
							width="17.655"
							x="247.172"
							y="225.103"
						></rect>
						<rect
							height="26.483"
							style={{ fill: '#643C3E' }}
							width="17.655"
							x="300.138"
							y="233.931"
						></rect>{' '}
					</g>
					<path
						d="M317.793,489.931H194.207c-4.879,0-8.828-3.953-8.828-8.828s3.948-8.828,8.828-8.828h123.586 c4.879,0,8.828,3.953,8.828,8.828S322.672,489.931,317.793,489.931z"
						style={{ fill: '#dc8add' }}
					></path>
					<g>
						{' '}
						<path
							d="M227.62,66.207H105.931c-19.806,0-36.565,13.046-42.154,31.012 c-2.369,7.617-8.95,13.126-16.927,13.126h-0.815c-23.052,0-43.639,16.854-45.827,39.802c-2.51,26.325,18.123,48.473,43.93,48.473 h123.586c19.806,0,36.565-13.046,42.154-31.012c2.369-7.616,8.951-13.126,16.927-13.126h2.712c25.807,0,46.441-22.148,43.93-48.473 C271.259,83.06,250.672,66.207,227.62,66.207z"
							style={{ fill: '#ecaadd' }}
						></path>
						<path
							d="M465.965,110.345h-86.379c-19.806,0-36.565,13.046-42.154,31.012 c-2.369,7.616-8.951,13.126-16.927,13.126h-44.953c-23.052,0-43.639,16.854-45.827,39.802c-2.51,26.325,18.123,48.473,43.93,48.473 h88.276c19.806,0,36.565-13.046,42.154-31.012c2.369-7.616,8.951-13.126,16.927-13.126h46.85c25.807,0,46.441-22.148,43.931-48.473 C509.604,127.198,489.017,110.345,465.965,110.345z"
							style={{ fill: '#ecaadd' }}
						></path>{' '}
					</g>
					<g>
						{' '}
						<path
							d="M88.483,150.146c2.188-22.948,22.775-39.801,45.827-39.801h0.815c7.977,0,14.558-5.51,16.927-13.126 c5.589-17.967,22.348-31.012,42.154-31.012h-88.276c-19.806,0-36.565,13.045-42.154,31.012 c-2.369,7.616-8.951,13.126-16.927,13.126h-0.815c-23.053,0-43.639,16.853-45.827,39.801c-2.51,26.326,18.123,48.474,43.93,48.474 h88.276C106.606,198.62,85.973,176.472,88.483,150.146z"
							style={{ fill: '#dc8add' }}
						></path>
						<path
							d="M273.862,194.284c2.188-22.948,22.775-39.801,45.827-39.801h-44.138 c-23.053,0-43.639,16.853-45.827,39.801c-2.51,26.326,18.123,48.474,43.93,48.474h44.138 C291.985,242.758,271.352,220.61,273.862,194.284z"
							style={{ fill: '#dc8add' }}
						></path>
						<path
							d="M381.57,141.357c5.589-17.967,22.348-31.012,42.154-31.012h-44.138 c-19.806,0-36.565,13.045-42.154,31.012c-2.369,7.616-8.951,13.126-16.927,13.126h44.138 C372.62,154.482,379.201,148.973,381.57,141.357z"
							style={{ fill: '#dc8add' }}
						></path>{' '}
					</g>{' '}
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
