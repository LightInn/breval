import '@/styles/crow.css'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const fetchProjects = async () => {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
	)
	const data = await res.json()
	return data.data.map(project => ({
		id: project.id,
		name: project.attributes.title,
		description: project.attributes.short_description,
		imageUrl:
			project.attributes.media?.data?.[0]?.attributes?.url ||
			'/placeholder.jpg',
		link: `/projects/${project.attributes.title}`,
	}))
}

const AllProjectSection = ({ step }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [showProjects, setShowProjects] = useState(false)
	const [projects, setProjects] = useState([])

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
			const data = await fetchProjects()
			setProjects(data)
		}
		loadProjects()
	}, [])

	return (
		<div className="relative h-screen w-screen overflow-scroll">
			{isVisible && (
				<div className="bg-layer absolute left-0 top-0 h-full w-full bg-red-200"></div>
			)}

			{showProjects && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}
					className="t-lauyer flex w-screen flex-col items-center justify-center text-[#e4dcca]"
				>
					<h2 className="mt-24 p-4">
						Take a look at what I&apos;ve done before
					</h2>

					<div className="min-h-screen p-8">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="min-h-screen columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
						>
							{projects.map(project => (
								<Link href={project.link} key={project.id}>
									<motion.div
										whileHover={{ scale: 1.05 }}
										className="group relative mb-4 transform cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out"
									>
										<Image
											src={project.imageUrl}
											alt={project.name}
											width={400}
											height={300}
											className="h-auto w-full object-cover transition-all duration-300 group-hover:opacity-60 group-hover:blur-sm"
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
