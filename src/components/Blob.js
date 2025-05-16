import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

const Blob = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const handleMouseMove = event => {
			setMousePosition({ x: event.clientX, y: event.clientY })
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<motion.div
			animate={{
				x: mousePosition.x - 50,
				y: mousePosition.y - 50,
			}}
			className="fixed left-0 top-0 z-50 h-20 w-20 rounded-full bg-blue-500"
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20,
			}}
		/>
	)
}

export default Blob
