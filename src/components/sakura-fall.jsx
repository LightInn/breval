'use client'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export default function SakuraFall() {
	const [petals, setPetals] = useState([])

	useEffect(() => {
		const generatePetals = () => {
			const newPetals = []
			const count = Math.min(window.innerWidth / 25, 25) // Responsive petal count

			for (let i = 0; i < count; i++) {
				newPetals.push({
					duration: 10 + Math.random() * 15,
					rotation: Math.random() * 360,
					size: 8 + Math.random() * 12,
					y: -10 - Math.random() * 20,
					delay: Math.random() * 15,
					x: Math.random() * 100,
					id: i,
				})
			}

			setPetals(newPetals)
		}

		generatePetals()

		const handleResize = () => {
			generatePetals()
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
			{petals.map(petal => (
				<motion.div
					animate={{
						x: [
							`${petal.x}vw`,
							`${petal.x + (Math.random() * 15 - 7.5)}vw`,
							`${petal.x + (Math.random() * 30 - 15)}vw`,
						],
						rotate: [
							petal.rotation,
							petal.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
						],
						y: [`${petal.y}vh`, `${110 + Math.random() * 20}vh`],
						opacity: [0, 0.7, 0],
					}}
					className="absolute"
					initial={{
						rotate: petal.rotation,
						x: `${petal.x}vw`,
						y: `${petal.y}vh`,
						opacity: 0,
					}}
					key={petal.id}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						duration: petal.duration,
						delay: petal.delay,
						ease: 'linear',
					}}
				>
					<svg
						fill="none"
						height={petal.size}
						viewBox="0 0 24 24"
						width={petal.size}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C12 2 14 6 12 10C10 14 12 18 12 18C12 18 10 14 12 10C14 6 12 2 12 2Z"
							fill="rgba(255, 182, 193, 0.8)"
						/>
						<path
							d="M12 2C12 2 10 6 12 10C14 14 12 18 12 18C12 18 14 14 12 10C10 6 12 2 12 2Z"
							fill="rgba(255, 182, 193, 0.8)"
						/>
						<circle cx="12" cy="10" fill="rgba(255, 255, 255, 0.9)" r="2" />
					</svg>
				</motion.div>
			))}
		</div>
	)
}
