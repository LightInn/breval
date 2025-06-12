'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Home } from 'lucide-react'

import { getDictionary } from '@/lib/get-dictionary' // These would be used in a parent server component
import { getLocale } from '@/lib/get-locale' // These would be used in a parent server component
import Link from 'next/link'

import { Button } from '@/components/ui/button'

// Note: This component is marked 'use client', so it cannot directly fetch server-side data.
// It will expect 'dict' to be passed as a prop from a parent server component.
export default function Interactive404({ dict }) {
	const notFoundDict = dict?.notFound || {}
	const [particles, setParticles] = useState([])
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const [treeShaken, setTreeShaken] = useState(false)
	const [messageRevealed, setMessageRevealed] = useState(false)
	const [interactionCount, setInteractionCount] = useState(0)
	const containerRef = useRef(null)
	const animationRef = useRef()

	// Create initial particles
	useEffect(() => {
		const initialParticles = []
		for (let i = 0; i < 20; i++) {
			initialParticles.push(createParticle(i))
		}
		setParticles(initialParticles)
	}, [])

	function createParticle(id) {
		return {
			color: ['#f472b6', '#ec4899', '#db2777', '#be185d'][
				Math.floor(Math.random() * 4)
			],
			y: Math.random() * (window.innerHeight || 1080),
			x: Math.random() * (window.innerWidth || 1920),
			rotationSpeed: (Math.random() - 0.5) * 4,
			opacity: Math.random() * 0.8 + 0.2,
			vx: (Math.random() - 0.5) * 2,
			rotation: Math.random() * 360,
			size: Math.random() * 8 + 4,
			vy: Math.random() * 2 + 1,
			id,
		}
	}

	// Animation loop
	useEffect(() => {
		const animate = () => {
			setParticles(prev =>
				prev.map(particle => {
					let newX = particle.x + particle.vx
					let newY = particle.y + particle.vy
					let newOpacity = particle.opacity

					// Gravity and wind effect
					const distanceToMouse = Math.sqrt(
						Math.pow(particle.x - mousePos.x, 2) +
							Math.pow(particle.y - mousePos.y, 2)
					)

					if (distanceToMouse < 100) {
						const angle = Math.atan2(
							particle.y - mousePos.y,
							particle.x - mousePos.x
						)
						newX += Math.cos(angle) * 0.5
						newY += Math.sin(angle) * 0.5
					}

					// Reset particle if it goes off screen
					if (newY > (window.innerHeight || 800) + 50) {
						newY = -50
						newX = Math.random() * (window.innerWidth || 1200)
						newOpacity = Math.random() * 0.8 + 0.2
					}

					if (newX < -50 || newX > (window.innerWidth || 1200) + 50) {
						newX = Math.random() * (window.innerWidth || 1200)
						newY = -50
					}

					return {
						...particle,
						rotation: particle.rotation + particle.rotationSpeed,
						opacity: newOpacity,
						x: newX,
						y: newY,
					}
				})
			)

			animationRef.current = requestAnimationFrame(animate)
		}

		animationRef.current = requestAnimationFrame(animate)
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [mousePos])

	const handleMouseMove = e => {
		const rect = containerRef.current?.getBoundingClientRect()
		if (rect) {
			setMousePos({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			})
		}
	}

	const handleTreeClick = () => {
		setTreeShaken(true)
		setInteractionCount(prev => prev + 1)

		// Add burst of new particles
		const burstParticles = []
		for (let i = 0; i < 15; i++) {
			burstParticles.push({
				...createParticle(particles.length + i),
				x: (window.innerWidth || 1200) / 2 + (Math.random() - 0.5) * 200,
				y: (window.innerHeight || 800) / 2 + (Math.random() - 0.5) * 100,
				vx: (Math.random() - 0.5) * 8,
				vy: -Math.random() * 5 - 2,
			})
		}

		setParticles(prev => [...prev, ...burstParticles])

		// Reveal message after second interaction
		if (interactionCount >= 1) {
			setTimeout(() => setMessageRevealed(true), 1000)
		}

		// Reset animation state
		setTimeout(() => setTreeShaken(false), 1000)
	}

	const handleGoBack = () => {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			window.history.back()
		} else {
			window.location.href = '/'
		}
	}

	return (
		<div
			className="relative min-h-screen cursor-none overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
			onMouseMove={handleMouseMove}
			ref={containerRef}
		>
			{/* Animated particles */}
			{particles.map(particle => (
				<div
					className="pointer-events-none absolute transition-opacity duration-1000"
					key={particle.id}
					style={{
						boxShadow: `0 0 ${particle.size}px ${particle.color}40`,
						transform: `rotate(${particle.rotation}deg)`,
						backgroundColor: particle.color,
						opacity: particle.opacity,
						height: particle.size,
						width: particle.size,
						borderRadius: '50%',
						left: particle.x,
						top: particle.y,
					}}
				/>
			))}

			{/* Custom cursor */}
			<div
				className="pointer-events-none fixed z-50 h-6 w-6 rounded-full border-2 border-pink-400 transition-transform duration-100"
				style={{
					transform: `scale(${treeShaken ? 1.5 : 1})`,
					left: mousePos.x - 12,
					top: mousePos.y - 12,
				}}
			>
				<div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-400" />
			</div>

			{/* Main content */}
			<div className="relative z-10 flex min-h-screen items-center justify-center px-4">
				<div className="mx-auto max-w-4xl text-center">
					{/* Interactive Sakura Tree */}
					<div className="relative mb-8">
						<div
							className={`flex w-full cursor-pointer items-center justify-center transition-transform duration-500 ${treeShaken ? 'scale-105 animate-pulse' : 'hover:scale-102'}`}
							onClick={handleTreeClick}
						>
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
						</div>

						{!messageRevealed && (
							<p className="mt-4 animate-pulse text-sm text-pink-300">
								{interactionCount === 0
									? notFoundDict.touchTreeInitial ||
										'🌸 Touch the sakura tree to reveal your path...'
									: notFoundDict.touchTreeSecond ||
										'🌸 The petals are stirring... touch once more...'}
							</p>
						)}
					</div>

					{/* Hidden message revelation */}
					<div
						className={`transition-all duration-1000 ${messageRevealed ? 'translate-y-0 transform opacity-100' : 'translate-y-8 transform opacity-0'}`}
					>
						<div className="relative">
							<h1 className="mb-4 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-8xl font-bold leading-none text-transparent md:text-9xl">
								{notFoundDict.fourOhFour || '404'}
							</h1>
							<div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 transform">
								<div className="h-1 w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"></div>
							</div>
						</div>

						<h2 className="mb-4 text-2xl font-semibold text-white md:text-3xl">
							{notFoundDict.title || "You've wandered off the path"}
						</h2>

						<p className="mx-auto mb-8 max-w-md leading-relaxed text-gray-400">
							{notFoundDict.description ||
								'Like petals carried by the wind, the page you seek has drifted beyond reach. But every ending is a new beginning in the garden of possibilities.'}
						</p>

						{/* Mystical path visualization */}
						<div className="relative mb-8">
							<svg
								className="mx-auto opacity-60"
								height="60"
								viewBox="0 0 300 60"
								width="300"
							>
								<path
									className="animate-pulse"
									d="M20 30 Q75 10 150 30 Q225 50 280 30"
									fill="none"
									stroke="url(#pathGradient)"
									strokeDasharray="10,5"
									strokeWidth="3"
								/>
								<defs>
									<linearGradient
										id="pathGradient"
										x1="0%"
										x2="100%"
										y1="0%"
										y2="0%"
									>
										<stop offset="0%" stopColor="#f472b6" stopOpacity="0.3" />
										<stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
										<stop offset="100%" stopColor="#db2777" stopOpacity="0.3" />
									</linearGradient>
								</defs>

								{/* Missing stepping stone */}
								<circle
									cx="150"
									cy="30"
									fill="#374151"
									opacity="0.5"
									r="8"
									stroke="#f472b6"
									strokeDasharray="2,2"
								/>
								<text
									className="fill-pink-400 text-xs opacity-60"
									textAnchor="middle"
									x="150"
									y="50"
								>
									{notFoundDict.missingStep || 'missing'}
								</text>
							</svg>
						</div>

						{/* Action buttons */}
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								className="group transform rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25"
								onClick={handleGoBack}
							>
								<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
								{notFoundDict.returnToPathButton || 'Return to the Path'}
							</Button>

							<Button
								asChild
								className="rounded-full border-pink-400 px-8 py-4 text-pink-400 backdrop-blur-sm transition-all duration-300 hover:bg-pink-400 hover:text-white"
								variant="outline"
							>
								<Link href="/">
									<Home className="mr-2 h-4 w-4" />
									{notFoundDict.gardenEntranceButton || 'Garden Entrance'}
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Ambient glow effect */}
			<div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full bg-pink-500 opacity-5 blur-3xl"></div>
		</div>
	)
}
