import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const MovingLogo = ({ icon, size = 40 }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const updatePosition = () => {
			const x = Math.random() * window.innerWidth
			const y = Math.random() * window.innerHeight
			setPosition({ x, y })
		}

		updatePosition()
		const interval = setInterval(updatePosition, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<motion.div
			style={{
				position: 'absolute',
				left: position.x,
				top: position.y,
				width: size,
				height: size,
			}}
			animate={{
				x: position.x,
				y: position.y,
			}}
			transition={{
				duration: 5,
				ease: 'linear',
			}}
		>
			{icon}
		</motion.div>
	)
}

export default MovingLogo
