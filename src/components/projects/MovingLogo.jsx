import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

const MovingLogo = ({ size = 40, icon }) => {
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
			animate={{
				x: position.x,
				y: position.y,
			}}
			style={{
				position: 'absolute',
				left: position.x,
				top: position.y,
				height: size,
				width: size,
			}}
			transition={{
				ease: 'linear',
				duration: 5,
			}}
		>
			{icon}
		</motion.div>
	)
}

export default MovingLogo
