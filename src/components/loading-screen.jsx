'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export default function LoadingScreen({ dict }) {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			setProgress(100)
		}, 2000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				<svg
					className="mx-auto mb-6"
					fill="none"
					height="80"
					viewBox="0 0 32 32"
					width="80"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						className="stroke-primary"
						height="24"
						rx="2"
						strokeWidth="2"
						width="24"
						x="4"
						y="4"
					/>
					<motion.path
						animate={{ opacity: 1, scale: 1 }}
						className="fill-primary"
						d="M16 8L24 16L16 24L8 16L16 8Z"
						initial={{ opacity: 0, scale: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					/>
				</svg>

				<h2 className="mb-4 text-2xl font-bold text-primary">
					{dict?.common?.loading || 'Loading Experience'}
				</h2>

				<div className="h-2 w-64 overflow-hidden rounded-full bg-gray-800">
					<motion.div
						animate={{ width: `${progress}%` }}
						className="h-full bg-primary"
						initial={{ width: '0%' }}
						transition={{ duration: 2 }}
					/>
				</div>

				<p className="mt-4 animate-pulse text-sm text-muted-foreground">
					{dict?.common?.preparingCanvas || 'Preparing digital canvas...'}
				</p>
			</motion.div>
		</div>
	)
}
