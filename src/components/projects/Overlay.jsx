'use client'

import { Scroll, useScroll } from '@react-three/drei'
import { geometry } from 'maath'
import { extend, useFrame } from '@react-three/fiber'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedTitle from '@/components/projects/TitleLetter'
import FeaturedProjectsSection from '@/components/projects/FeaturedProjectsSection'
import AllProjectSection from '@/components/projects/AllProjectSection'
import MovingLogo from '@/components/projects/MovingLogo'
import { Code, Database, Globe, Smartphone } from 'lucide-react'

const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

export function Overlay({ step, setStep }) {
	// const projects = await getProject()
	const data = useScroll()

	useFrame(() => {
		// data.offset = current scroll position, between 0 and 1, dampened
		// data.delta = current delta, between 0 and 1, dampened

		// Will be 0 when the scrollbar is at the starting position,
		// then increase to 1 until 1 / 3 of the scroll distance is reached
		const b = data.range(0, 1 / 2)
		// Will start increasing when 1 / 3 of the scroll distance is reached,
		// and reach 1 when it reaches 2 / 3rds.
		const c = data.range(1 / 2, 1 / 2)

		// udapte step
		if (b <= 0.5 && step !== 1) {
			setStep(1)
		}
		if ((b >= 0.5 && step < 2) || (c < 0.2 && step > 2)) {
			setStep(2)
		}
		// if ((c >= 0.5 && step < 3) || (c < 0.5 && step > 3)) {
		if ((c >= 0.2 && step < 3) || (c < 0.5 && step > 3)) {
			setStep(3)
			// data.el.scrollTop = data.el.scrollTopMax
			data.el.scrollTop = 99999999
		}

		console.log(data)
		// console.log(step)
		// console.log(b, c)
	})

	const width = 1
	const height = 1.61803398875

	const [projects, setProjects] = useState(null)
	useEffect(() => {
		getProject().then(data => {
			setProjects(data)
			console.log(data)
		})
	}, [])

	// return null;
	return (
		<Scroll html>
			<>
				<MovingLogo icon={<Code size={24} />} />
				<MovingLogo icon={<Database size={24} />} />
				<MovingLogo icon={<Globe size={24} />} />
				<MovingLogo icon={<Smartphone size={24} />} />
				<section className="relative h-screen w-screen">
					<div className="flex h-full items-center px-4">
						{/* Conteneur du texte */}
						<div className="mx-auto w-full max-w-4xl rounded-md bg-white/20 p-6 backdrop-blur-lg md:mx-0 md:ml-16 md:px-12 md:py-8">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 1 }}
								className="text-center"
							>
								<AnimatedTitle text="My Projects" />
								<motion.p
									className="text-gray-600 mx-auto mt-6 max-w-2xl text-xl"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.5 }}
								>
									As a web developer, I&apos;ve had the opportunity to work on
									various exciting projects. Here&apos;s a showcase of my
									achievements and creative solutions.
								</motion.p>
							</motion.div>
						</div>
					</div>
				</section>
				<section className="relative h-screen w-screen">
					<div className="flex h-full items-center px-4">
						{/* Conteneur du texte */}
						<div className="mx-auto w-full overflow-hidden rounded-3xl backdrop-blur-lg md:mx-0 md:ml-auto md:mr-16 md:max-w-[75%] md:px-12 md:py-4 xl:max-w-[50%]">
							<FeaturedProjectsSection step={step} />
						</div>
					</div>
				</section>

				<section className="relative min-h-screen w-screen">
					<AllProjectSection step={step} />
				</section>
			</>
		</Scroll>
	)
}

async function getProject() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
	)
	const data = await res.json()
	console.log(data)

	return data.data
}
