'use client'
import { useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

const AnimatedTitle = ({ text }) => {
	const letters = Array.from(text)

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="relative text-6xl font-bold tracking-tight text-black sm:text-8xl md:text-8xl"
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.8 }}
		>
			{letters.map((letter, index) => (
				<motion.span
					animate={{ opacity: 1, y: 0 }}
					className="inline-block"
					initial={{ opacity: 0, y: 20 }}
					key={index}
					style={{
						textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
						transition: 'transform 0.2s',
					}}
					transition={{ delay: index * 0.1, duration: 0.5 }}
				>
					{letter === ' ' ? '\u00A0' : letter}
				</motion.span>
			))}
		</motion.div>
	)
}

export default AnimatedTitle
