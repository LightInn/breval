// app/projects/page.tsx

'use client'

import SlimeSimulation from 'react-slime-simulation'

import Navbar from '@/components/navbar'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectClient({ projects }) {
	return (
		<div className="relative min-h-screen w-full bg-black text-white">
			<Navbar />

			<header className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
				{/*<video*/}
				{/*    autoPlay*/}
				{/*    loop*/}
				{/*    muted*/}
				{/*    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"*/}
				{/*>*/}
				{/*    <source src="/header-bg.mp4" type="video/mp4"/>*/}
				{/*</video>*/}

				<div className="absolute left-0 top-0 h-full w-full object-cover opacity-60">
					<SlimeSimulation initialAgents={50} useRandomDefaults={false} />
				</div>
				<div className="relative z-10 max-w-4xl px-6 text-center">
					<motion.h1
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl font-bold leading-tight md:text-6xl"
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.8 }}
					>
						Crafting bold & meaningful digital experiences.
					</motion.h1>
					<p className="mt-6 text-lg text-neutral-300">
						A curated selection of my most impactful work.
					</p>
				</div>
			</header>

			<main className="mx-auto space-y-24 rounded-t-3xl bg-light">
				<div className={'w-max-7xl mx-auto space-y-24 px-6 py-24'}>
					{projects.map((project, i) => {
						const data = project.attributes
						const image = data.media.data[0]?.attributes.url
						const even = i % 2 === 0

						return (
							<motion.section
								className={`flex flex-col-reverse items-center gap-16 md:grid md:grid-cols-2 ${
									even ? '' : 'md:flex-row-reverse'
								}`}
								initial={{ opacity: 0, y: 30 }}
								key={data.title}
								transition={{ delay: i * 0.1, duration: 0.6 }}
								viewport={{ once: true }}
								whileInView={{ opacity: 1, y: 0 }}
							>
								<div className="space-y-4">
									<h2 className="text-3xl font-bold text-glow-600">
										{data.title}
									</h2>
									<p className="text-slate-800">{data.short_description}</p>
									<Link
										className="mt-4 inline-block rounded-full bg-accent px-6 py-2 font-medium text-black transition hover:bg-neutral-200"
										href={`/projects/${data.title}`}
									>
										Explore project →
									</Link>
								</div>
								<Link
									className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl md:h-96"
									href={`/projects/${data.title}`}
								>
									<Image
										alt={data.title}
										className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
										fill
										src={image}
									/>
								</Link>
							</motion.section>
						)
					})}
				</div>
			</main>
		</div>
	)
}
