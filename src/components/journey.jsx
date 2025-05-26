'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
	Laptop,
	Code,
	Server,
	Rocket,
	Cpu,
	Database,
	Globe,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Journey() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })
	const [activeIndex, setActiveIndex] = useState(null)

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	}

	const journey = [
		{
			period: 'Middle School',
			title: 'First Steps into Digital World',
			description:
				'Discovered video games and 3D modeling with Blender. Started exploring the infinite possibilities of computers and new technologies.',
		},
		{
			period: 'Early Exploration',
			title: 'Open Source & Linux',
			description:
				'Delved into open-source software, experimented with Linux distributions, and began understanding game development and cybersecurity fundamentals.',
		},
		{
			period: 'High School',
			title: 'Robotics & Neural Networks',
			description:
				'Built a remote-controlled robot and developed a fascination with neural networks and how the human brain functions.',
		},
		{
			period: 'University',
			title: 'Computer Science Mastery',
			description:
				'Studied PostgreSQL, Docker, Kubernetes, and infrastructure management. Continued coding with a focus on security, systems, and networks.',
		},
		{
			period: 'Professional',
			title: 'Entrepreneurial Journey',
			description:
				'Created multiple projects: tutoring website, ForMenu (SaaS for dematerialized menus), My-Makeup (networking for makeup artists), and Forvoyez.com (automated meta-descriptions).',
		},
	]

	const timelineItems = [
		{
			year: '2012',
			title: 'First Steps in Programming',
			description:
				'Discovered Blender and started coding in Python within the Blender Game Engine at the age of 13.',
			icon: <Code />,
			color: 'bg-blue-500',
		},
		{
			year: '2014',
			title: 'Open Source Exploration',
			description:
				'Delved into open-source, trying Linux distributions and dual boots. Started a computer club at school.',
			icon: <Laptop />,
			color: 'bg-green-500',
		},
		{
			year: '2016',
			title: 'Network & Security',
			description:
				'Discovered networks, addressing, packet transmission, UDP, and TCP. Built a small remote-controlled robot.',
			icon: <Server />,
			color: 'bg-yellow-500',
		},
		{
			year: '2018',
			title: 'Neural Networks & AI',
			description:
				'Developed an interest in understanding how the human brain and neural networks function.',
			icon: <Cpu />,
			color: 'bg-purple-500',
		},
		{
			year: '2020',
			title: 'Computer Science School',
			description:
				'Mastered databases, Docker, Kubernetes, and automated deployments. Learned to set up and secure infrastructures.',
			icon: <Database />,
			color: 'bg-red-500',
		},
		{
			year: '2022',
			title: 'SaaS Projects',
			description:
				'Created ForMenu, My-Makeup, and other SaaS platforms. Specialized in front-ops development.',
			icon: <Globe />,
			color: 'bg-orange-500',
		},
		{
			year: 'Present',
			title: 'Continuous Innovation',
			description:
				'Continuing to explore new technologies and build exciting projects that push boundaries.',
			icon: <Rocket />,
			color: 'bg-primary',
		},
	]

	return (
		<section id="journey" className="relative overflow-hidden py-20">
			<div className="retro-grid absolute inset-0 opacity-20"></div>
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
					className="mb-16 text-center"
				>
					<h2 className="mb-4 text-3xl font-bold md:text-4xl">My Journey</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl">
						The path that led me to where I am today, from my first lines of
						code to building complex systems.
					</p>
				</motion.div>

				<div ref={ref} className="relative">
					{/* Timeline line */}
					<motion.div
						initial={{ scaleY: 0 }}
						animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
						transition={{ duration: 1.5, ease: 'easeInOut' }}
						className="from-primary/30 via-primary to-primary/30 absolute bottom-0 left-4 top-0 w-1 origin-top -translate-x-1/2 transform bg-gradient-to-b md:left-1/2"
					></motion.div>

					{/* Journey Timeline */}
					<motion.div variants={item} className="space-y-4">
						<h3 className="mb-6 text-center text-xl font-bold">My Journey</h3>
						{journey.map((step, index) => (
							<motion.div key={index} variants={item} className="relative">
								<Card className="border-primary/20 bg-card/60 hover:border-primary/40 backdrop-blur-sm transition-all duration-300">
									<CardContent className="p-4">
										<div className="flex items-start">
											<div className="bg-primary mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
											<div>
												<div className="mb-1 flex items-center gap-2">
													<span className="font-mono text-primary bg-primary/10 pixel-corners rounded px-2 py-1 text-xs">
														{step.period}
													</span>
													<h4 className="text-sm font-semibold">
														{step.title}
													</h4>
												</div>
												<p className="text-muted-foreground text-xs">
													{step.description}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
