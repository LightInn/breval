'use client'
import { Environment, Float } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { useScroll } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { Crow } from './projects/Crow_tree'

export default function ScrollObject3D() {
	const containerRef = useRef(null)
	const [isMounted, setIsMounted] = useState(false)
	const [use3D, setUse3D] = useState(true)

	useEffect(() => {
		setIsMounted(true)

		// Check if WebGL is supported
		try {
			const canvas = document.createElement('canvas')
			const gl =
				canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
			if (!gl) {
				setUse3D(false)
			}
		} catch (e) {
			setUse3D(false)
		}
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		// <></>
		<div
			ref={containerRef}
			className="pointer-events-none fixed right-0 top-0 z-50 hidden h-72 w-72 md:h-96 md:w-96 lg:block"
			style={{
				top: '120px',
				right: '5%',
			}}
		>
			{use3D ? (
				<Canvas camera={{ position: [0, 18, 48], fov: 40 }}>
					<SceneSmall />
				</Canvas>
			) : (
				<FallbackSVG />
			)}
		</div>
	)
}

// Fallback SVG component for when 3D fails to load
function FallbackSVG() {
	const { scrollY } = useScroll()
	const [rotation, setRotation] = useState(0)
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	useEffect(() => {
		const unsubscribe = scrollY.onChange(latest => {
			setRotation(latest * 0.5)
		})
		return () => unsubscribe()
	}, [scrollY])

	return (
		<div className="flex h-full w-full items-center justify-center">
			<svg
				className="animate-float"
				fill="none"
				height="80"
				style={{ transform: `rotate(${rotation}deg)` }}
				viewBox="0 0 80 80"
				width="80"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<linearGradient
						id="diamondGradient"
						x1="0%"
						x2="100%"
						y1="0%"
						y2="100%"
					>
						<stop offset="0%" stopColor={isDark ? '#ff69b4' : '#ff1493'} />
						<stop offset="100%" stopColor={isDark ? '#ff1493' : '#ff69b4'} />
					</linearGradient>
				</defs>
				<path
					d="M40 10L60 30L40 70L20 30L40 10Z"
					fill="url(#diamondGradient)"
					stroke={isDark ? '#ff69b4' : '#ff1493'}
					strokeWidth="2"
				/>
				<path d="M40 10L50 20L40 40L30 20L40 10Z" fill="white" opacity="0.3" />
			</svg>
		</div>
	)
}

// Small scene used by the floating widget: shows only the tree (Crow) and rotates around it
function SceneSmall() {
	const { scrollYProgress } = useScroll()
	const scrollRef = useRef(0)
	const groupRef = useRef()

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange(latest => {
			scrollRef.current = latest
		})
		return () => unsubscribe()
	}, [scrollYProgress])

	useFrame(() => {
		if (!groupRef.current) return
		// Rotate around the Y axis based on scroll (full rotation when scrolled to bottom)
		groupRef.current.rotation.y = scrollRef.current * Math.PI * 2
		// small idle bob (optional)
		groupRef.current.position.y = -6 + Math.sin(Date.now() * 0.001) * 0.02
	})

	return (
		<>
			{/* <ambientLight intensity={0.9} /> */}
			<directionalLight intensity={0.8} position={[10, 20, 10]} />

			{/* group is positioned/scaled to frame the whole tree inside the small widget */}
			{/* scaled down and lowered so the full tree fits inside the widget */}
			<group ref={groupRef} position={[0, -8, 0]} scale={[0.45, 0.45, 0.45]}>
				{/* Keep the crow/tree animations running by passing step=1 */}
				<Crow step={1} />
			</group>

			{/* Use a neutral/studio environment without background to avoid extra HDRI brightness */}
			<Environment
				background={false}
				preset={'dawn'}
				environmentIntensity={0.3}
			/>
		</>
	)
}
