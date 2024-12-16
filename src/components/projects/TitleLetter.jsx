'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const AnimatedTitle = ({ text }) => {
	const letters = Array.from(text)

	return (
		<motion.div
			className="relative text-6xl font-bold tracking-tight text-black sm:text-8xl md:text-8xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			{letters.map((letter, index) => (
				<motion.span
					key={index}
					className="inline-block"
					style={{
						textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
						transition: 'transform 0.2s',
					}}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
				>
					{letter === ' ' ? '\u00A0' : letter}
				</motion.span>
			))}
		</motion.div>
	)
}

export default AnimatedTitle
