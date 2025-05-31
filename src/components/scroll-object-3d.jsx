// TODO delete: Potentially unused component. Rendering logic is commented out.
'use client'
import { Environment, Float } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { useScroll } from 'framer-motion'
import { useTheme } from 'next-themes'

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
		<></>
		// <div
		//   ref={containerRef}
		//   className="fixed top-0 right-0 w-32 h-32 md:w-48 md:h-48 z-20 pointer-events-none"
		//   style={{
		//     top: "120px",
		//     right: "5%",
		//   }}>
		//   {use3D ? (
		//     <Canvas camera={{ position: [0, 0, 5], fov: 45 }} onError={() => setUse3D(false)}>
		//       <Scene />
		//     </Canvas>
		//   ) : (
		//     <FallbackSVG />
		//   )}
		// </div>
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

function FloatingObject({ scrollYProgress }) {
	const meshRef = useRef(null)
	const { theme } = useTheme()
	const isDark = theme === 'dark'

	useFrame(state => {
		if (!meshRef.current) return

		// Rotate based on scroll position
		meshRef.current.rotation.y = scrollYProgress.current * Math.PI * 4
		meshRef.current.rotation.x = scrollYProgress.current * Math.PI * 2

		// Scale based on scroll position
		const scale = 1 + scrollYProgress.current * 0.3
		meshRef.current.scale.set(scale, scale, scale)

		// Add floating animation
		meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
		meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.2
	})

	return (
		<mesh ref={meshRef}>
			{/* Voxel-style diamond shape */}
			<octahedronGeometry args={[1.2, 0]} />
			<meshStandardMaterial
				color={isDark ? '#ff69b4' : '#ff1493'}
				emissive={isDark ? '#ff69b4' : '#ff1493'}
				emissiveIntensity={isDark ? 0.3 : 0.2}
				metalness={0.9}
				roughness={0.2}
			/>
		</mesh>
	)
}

function Scene() {
	const { scrollYProgress } = useScroll()
	const scrollRef = useRef(0)
	const { theme } = useTheme()

	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange(latest => {
			scrollRef.current = latest
		})
		return () => unsubscribe()
	}, [scrollYProgress])

	return (
		<>
			<ambientLight intensity={0.6} />
			<spotLight
				angle={0.15}
				castShadow
				intensity={1.2}
				penumbra={1}
				position={[10, 10, 10]}
			/>
			<Float floatIntensity={0.8} rotationIntensity={0.3} speed={1.5}>
				<FloatingObject scrollYProgress={scrollRef} />
			</Float>
			<Environment preset={theme === 'dark' ? 'night' : 'dawn'} />
		</>
	)
}
