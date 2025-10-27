import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import '@/styles/crow.css'
import { getProjects } from '@/services/projects.services'

const AllProjectSection = ({ step }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [showProjects, setShowProjects] = useState(false)
	const [projects, setProjects] = useState([])

	// Normalize projects for rendering (choose main_media or first media item as image)
	const processedProjects = Array.isArray(projects)
		? projects.map(project => ({
				id: project.id,
				name: project.title || project.name || 'Untitled project',
				description:
					project.short_description ||
					project.description ||
					'Description not available.',
				// Prefer main_media, then first media item, then placeholder
				image:
					project.main_media?.url ||
					project.media?.[0]?.url ||
					'/placeholder.svg?height=300&width=500',
				link: project.slug
					? `/projects/${project.slug}`
					: project.live_url || project.url || '#',
			}))
		: []

	useEffect(() => {
		if (step === 3) {
			setTimeout(() => {
				setIsVisible(true)
				setTimeout(() => {
					setShowProjects(true)
				}, 1000)
			}, 10)
		} else {
			setIsVisible(false)
			setShowProjects(false)
		}
	}, [step])

	useEffect(() => {
		const loadProjects = async () => {
			const data = await getProjects()
			console.log('Fetched projects:', data)
			setProjects(data)
		}
		loadProjects()
	}, [])

	return (
		<div className="relative h-screen min-h-screen w-screen overflow-scroll">
			{isVisible && (
				<div className="bg-layer absolute left-0 top-0 h-full w-full bg-red-200"></div>
			)}

			{showProjects && (
				<motion.div
					animate={{ opacity: 1 }}
					className="t-lauyer flex w-screen flex-col items-center justify-center text-[#e4dcca]"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="mt-24 p-4">
						Take a look at what I&apos;ve done before
					</h2>

					<div className="min-h-screen p-8">
						<motion.div
							animate={{ opacity: 1 }}
							className="min-h-screen columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
							initial={{ opacity: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							{processedProjects.map(project => (
								<Link href={project.link} key={project.id}>
									<motion.div
										className="group relative mb-4 transform cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out"
										whileHover={{ scale: 1.05 }}
									>
										<Image
											alt={project.name}
											className="h-auto w-full object-cover transition-all duration-300 group-hover:opacity-60 group-hover:blur-sm"
											height={300}
											src={project.image}
											width={400}
											unoptimized
										/>
										<div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300">
											<h2 className="text-xl font-bold text-white">
												{project.name}
											</h2>
											<div className="description translate-y-[20px] text-sm text-white opacity-0 transition-all duration-300">
												{project.description}
											</div>
										</div>
									</motion.div>
								</Link>
							))}
						</motion.div>
					</div>
				</motion.div>
			)}
		</div>
	)
}

export default AllProjectSection
