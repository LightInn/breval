'use client'

import {
	Bot,
	Brain,
	Calendar,
	ChevronLeft,
	ChevronRight,
	Code,
	CuboidIcon as Cube,
	Gamepad2,
	GraduationCap,
	MapPin,
	Rocket,
	Shield,
	Sparkles,
	Terminal,
	Users,
	X,
	Zap,
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react' // Combined and changed from 'import type React'

import {
	AnimatePresence,
	motion,
	useInView,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'framer-motion'

const journeyNodes = [
	// Removed JourneyNode[] type
	{
		detailedDescription:
			"My journey into technology began with an insatiable curiosity about digital worlds. Gaming wasn't just entertainment—it was a window into infinite possibilities. I spent countless hours exploring virtual universes, marveling at their complexity and dreaming of creating my own digital realms.",
		bgPattern:
			'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
		achievements: [
			'Discovered passion for digital creation',
			'Developed problem-solving mindset',
			'Built foundation for technical thinking',
		],
		description:
			'Passion for gaming and digital universes sparked the desire to create my own worlds',
		technologies: [
			'Gaming Platforms',
			'Digital Exploration',
			'Creative Thinking',
		],
		icon: <Gamepad2 className="h-6 w-6" />,
		color: 'from-pink-500 to-purple-600',
		title: 'Digital Fascination',
		position: { x: 10, y: 20 },
		connections: ['blender'],
		period: 'Collège',
		id: 'gaming',
	},
	{
		detailedDescription:
			"At 13, I discovered Blender and fell in love with 3D modeling. This wasn't just about creating pretty pictures—it was about bringing imagination to life. I dove deep into the Blender Game Engine, learning Python to create interactive experiences. This was my first real taste of programming, and it was intoxicating.",
		bgPattern:
			'radial-gradient(circle at 30% 70%, rgba(249, 115, 22, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
		achievements: [
			'Mastered 3D modeling fundamentals',
			'First Python programming experience',
			'Created interactive 3D scenes',
		],
		description:
			'First steps into 3D modeling with Blender and Python coding in BGE',
		technologies: ['Blender', 'Python', '3D Modeling', 'Game Development'],
		connections: ['opensource', 'security'],
		color: 'from-orange-500 to-red-600',
		icon: <Cube className="h-6 w-6" />,
		position: { x: 25, y: 35 },
		title: '3D Discovery',
		period: 'Age 13',
		id: 'blender',
	},
	{
		detailedDescription:
			'Together with a friend, we tumbled down the rabbit hole of open-source software. We experimented with different Linux distributions, set up dual-boot systems, and breathed new life into old computers. We even started a computer club at school, teaching others about the power of open-source technology.',
		bgPattern:
			'radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)',
		achievements: [
			'Mastered Linux systems',
			'Built computer club at school',
			'Refurbished old computers',
			'Introduced peers to open-source',
		],
		technologies: [
			'Linux',
			'Ubuntu',
			'Debian',
			'Hardware Assembly',
			'System Administration',
		],
		description:
			'Linux distributions, dual boot, and building PCs with friends',
		icon: <Terminal className="h-6 w-6" />,
		color: 'from-green-500 to-teal-600',
		title: 'Open Source Explorer',
		position: { x: 15, y: 55 },
		connections: ['security'],
		period: 'Collège',
		id: 'opensource',
	},
	{
		detailedDescription:
			"Our curiosity led us to explore network security. We attempted to hack the school's network so often that we eventually gained administrator passwords! This wasn't malicious—it was pure curiosity about how networks function. We learned about TCP/UDP protocols, packet transmission, and network addressing through hands-on experimentation.",
		bgPattern:
			'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
		achievements: [
			'Gained admin access to school network',
			'Understood network protocols deeply',
			'Learned ethical hacking principles',
		],
		technologies: [
			'Network Security',
			'TCP/UDP',
			'Packet Analysis',
			'Network Administration',
			'Ethical Hacking',
		],
		description:
			'Exploring network security, TCP/UDP, and gaining admin access',
		icon: <Shield className="h-6 w-6" />,
		color: 'from-red-500 to-pink-600',
		position: { x: 40, y: 50 },
		title: 'Network Hacker',
		connections: ['robot'],
		period: 'Collège',
		id: 'security',
	},
	{
		detailedDescription:
			'For my final college project, I decided to build a remote-controlled robot completely from scratch. I wanted to do everything myself: buy components, solder circuits, design the mechanics, and write the control software. This project taught me the beauty of bringing digital code into the physical world.',
		achievements: [
			'Built complete robot from scratch',
			'Mastered soldering and electronics',
			'Integrated hardware and software',
			'Completed ambitious solo project',
		],
		bgPattern:
			'radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
		technologies: [
			'Electronics',
			'Soldering',
			'Microcontrollers',
			'Robotics',
			'Hardware Programming',
		],
		description:
			'Built a remote-controlled robot from scratch - components, soldering, coding',
		color: 'from-blue-500 to-indigo-600',
		icon: <Bot className="h-6 w-6" />,
		position: { x: 60, y: 30 },
		period: 'End of Collège',
		title: 'Robot Builder',
		connections: ['ai'],
		id: 'robot',
	},
	{
		detailedDescription:
			"I became fascinated with understanding how the human brain works and naturally gravitated toward neural networks. I attempted to recreate neural networks from scratch—admittedly quite crude, but I didn't care! I was captivated by the idea of creating 3D neural structures, moving beyond traditional 2D layer architectures to mimic real brain structures.",
		achievements: [
			'Built neural networks from scratch',
			'Explored 3D neural architectures',
			'Bridged neuroscience and computing',
			'Pioneered creative AI approaches',
		],
		bgPattern:
			'radial-gradient(circle at 35% 65%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 65% 35%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
		technologies: [
			'Neural Networks',
			'Machine Learning',
			'Python',
			'Mathematical Modeling',
			'Neuroscience',
		],
		description:
			'Fascination with brain function led to creating neural networks from scratch',
		color: 'from-purple-500 to-pink-600',
		icon: <Brain className="h-6 w-6" />,
		title: 'Neural Network Pioneer',
		position: { x: 75, y: 45 },
		connections: ['social'],
		period: 'Lycée',
		id: 'ai',
	},
	{
		detailedDescription:
			'I decided to tackle building a social network application, even though I had no idea how to use databases at the time! This ambitious project pushed me to learn about data persistence, user management, and application architecture. While the app never launched, the learning experience was invaluable.',
		bgPattern:
			'radial-gradient(circle at 45% 55%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 55% 45%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
		achievements: [
			'Designed social network architecture',
			'Self-taught database concepts',
			'Built user authentication system',
			'Learned full-stack development',
		],
		technologies: [
			'Web Development',
			'Database Design',
			'User Authentication',
			'Application Architecture',
			'Frontend/Backend',
		],
		description:
			'Attempted to build a social network app while learning databases',
		icon: <Users className="h-6 w-6" />, //
		color: 'from-cyan-500 to-blue-600',
		title: 'Social App Developer',
		position: { x: 85, y: 65 },
		connections: ['school'],
		period: 'Lycée',
		id: 'social',
	},
	{
		detailedDescription:
			'I arrived at computer science school with a burning desire to learn and master as many concepts as possible. I quickly filled my knowledge gaps in databases, particularly PostgreSQL, and dove deep into modern development practices. I mastered Docker, Kubernetes, automated deployments, and infrastructure security.',
		achievements: [
			'Mastered PostgreSQL and database design',
			'Became expert in containerization',
			'Learned infrastructure automation',
			'Specialized in security practices',
		],
		bgPattern:
			'radial-gradient(circle at 30% 70%, rgba(234, 179, 8, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%)',
		technologies: [
			'PostgreSQL',
			'Docker',
			'Kubernetes',
			'DevOps',
			'Infrastructure Security',
			'CI/CD',
		],
		description:
			'Mastered databases, Docker, Kubernetes, and infrastructure security',
		icon: <GraduationCap className="h-6 w-6" />,
		color: 'from-yellow-500 to-orange-600',
		title: 'Computer Science Mastery',
		period: "École d'Informatique",
		position: { x: 70, y: 80 },
		connections: ['startups'],
		id: 'school',
	},
	{
		detailedDescription:
			'With my newfound knowledge, I launched into entrepreneurship with friends. We created a tutoring platform for evening student help, then ForMenu.fr for dematerialized restaurant menus, followed by My-Makeup.fr connecting professional makeup artists, and Forvoyez.com for automated meta-description generation. Each project taught us new technologies and business lessons.',
		achievements: [
			'Launched multiple successful SaaS products',
			'Built tutoring platform for students',
			'Created restaurant digitization solution',
			'Developed AI-powered content tools',
		],
		bgPattern:
			'radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
		technologies: [
			'SaaS Development',
			'Business Development',
			'Product Management',
			'AI Integration',
			'Full-Stack Development',
		],
		description:
			'ForMenu, My-Makeup, Forvoyez - multiple SaaS projects with friends',
		color: 'from-emerald-500 to-green-600',
		icon: <Rocket className="h-6 w-6" />, //
		title: 'Serial Entrepreneur',
		position: { x: 45, y: 85 },
		connections: ['current'],
		period: 'Recent Years',
		id: 'startups',
	},
	{
		detailedDescription:
			"Today, I specialize in front-ops—the intersection of frontend technologies and infrastructure management. I love switching between different competencies, from crafting beautiful user interfaces to managing complex deployment pipelines. When I'm not coding on exciting projects, you'll find me playing indie games or exploring the latest technologies.",
		achievements: [
			'Mastered front-ops specialization',
			'Expert in multiple technology stacks',
			'Continuous learning mindset',
			'Balanced technical and creative skills',
		],
		bgPattern:
			'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
		technologies: [
			'Frontend Development',
			'Infrastructure Management',
			'DevOps',
			'Modern JavaScript',
			'Cloud Platforms',
			'Automation',
		],
		description:
			'Specialized in frontend technologies and infrastructure management',
		color: 'from-violet-500 to-purple-600',
		icon: <Code className="h-6 w-6" />,
		title: 'Front-Ops Specialist',
		position: { x: 20, y: 75 },
		period: 'Today',
		connections: [],
		id: 'current',
	},
]

export default function MyJourneySection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.1, once: true })

	const [activeNode, setActiveNode] = useState(null) // Removed <string | null>
	const [isMobile, setIsMobile] = useState(false) // Removed <boolean>
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }) //
	const containerRef = useRef(null) // Removed <HTMLDivElement>
	const { scrollYProgress } = useScroll()
	const shouldReduceMotion = useReducedMotion()

	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
	const starsRotation = useTransform(
		scrollYProgress,
		[0, 1],
		[0, shouldReduceMotion ? 0 : 360]
	)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
		}

		checkMobile()
		window.addEventListener('resize', checkMobile)

		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	useEffect(() => {
		const handleMouseMove = e => {
			// Removed : MouseEvent type for e
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		if (!shouldReduceMotion && !isMobile) {
			window.addEventListener('mousemove', handleMouseMove)
			return () => window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [shouldReduceMotion, isMobile])

	useEffect(() => {
		if (activeNode) {
			document.body.style.overflow = 'hidden'
			document.body.style.paddingRight = '0px'
		} else {
			document.body.style.overflow = 'unset'
			document.body.style.paddingRight = '0px'
		}

		return () => {
			document.body.style.overflow = 'unset'
			document.body.style.paddingRight = '0px' //
		}
	}, [activeNode])

	const handleNodeClick = nodeId => {
		// Removed type for nodeId
		setActiveNode(nodeId)
	}

	const closeModal = () => {
		setActiveNode(null)
	}

	const handleBackdropClick = e => {
		// Removed : React.MouseEvent type for e
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	const getCurrentNodeIndex = () => {
		return journeyNodes.findIndex(node => node.id === activeNode)
	}

	const navigateToNode = direction => {
		// Removed type for direction
		const currentIndex = getCurrentNodeIndex()
		if (currentIndex === -1) return

		let newIndex
		if (direction === 'prev') {
			newIndex = currentIndex === 0 ? journeyNodes.length - 1 : currentIndex - 1
		} else {
			newIndex = currentIndex === journeyNodes.length - 1 ? 0 : currentIndex + 1
		}

		setActiveNode(journeyNodes[newIndex].id)
	}

	const handleKeyDown = (e, nodeId) => {
		// Removed types for e and nodeId
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			handleNodeClick(nodeId)
		}
	}

	useEffect(() => {
		const handleKeyPress = e => {
			// Removed : KeyboardEvent type for e
			if (e.key === 'Escape') {
				closeModal()
			} else if (activeNode) {
				if (e.key === 'ArrowLeft') {
					navigateToNode('prev')
				} else if (e.key === 'ArrowRight') {
					navigateToNode('next')
				}
			}
		}

		document.addEventListener('keydown', handleKeyPress)
		return () => document.removeEventListener('keydown', handleKeyPress)
	}, [activeNode])

	const renderConnections = () => {
		return journeyNodes.flatMap(node =>
			node.connections.map(connectionId => {
				const targetNode = journeyNodes.find(n => n.id === connectionId)
				if (!targetNode) return null

				return (
					<motion.line
						animate={{
							pathLength: isInView ? 1 : 0,
							opacity: isInView ? 0.7 : 0,
						}}
						className="drop-shadow-lg"
						initial={{ pathLength: 0, opacity: 0 }}
						key={`${node.id}-${connectionId}`}
						stroke="url(#connectionGradient)"
						strokeDasharray="5,5"
						strokeWidth="2"
						transition={{
							duration: shouldReduceMotion ? 0 : 2,
							delay: shouldReduceMotion ? 0 : 1,
						}}
						x1={`${node.position.x}%`}
						x2={`${targetNode.position.x}%`}
						y1={`${node.position.y}%`}
						y2={`${targetNode.position.y}%`}
					/>
				)
			})
		)
	}

	const activeNodeData = journeyNodes.find(node => node.id === activeNode)

	return (
		<section
			aria-label="My Journey - Professional Development Timeline"
			className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-black"
			ref={ref}
		>
			{/* Animated Background */}
			{!shouldReduceMotion && (
				<motion.div
					className="absolute inset-0 opacity-20"
					style={{ y: backgroundY }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
					<motion.div
						className="absolute inset-0"
						style={{ rotate: starsRotation }}
					>
						{[...Array(30)].map((_, i) => (
							<motion.div
								animate={{
									opacity: [0.3, 1, 0.3],
									scale: [0.5, 1, 0.5],
								}}
								className="absolute h-1 w-1 rounded-full bg-white"
								key={i}
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
								}}
								transition={{
									repeat: Number.POSITIVE_INFINITY,
									duration: 3 + Math.random() * 2,
									delay: Math.random() * 2,
								}}
							/>
						))}
					</motion.div>
				</motion.div>
			)}

			{/* Mouse Follower - Desktop Only */}
			{!shouldReduceMotion && !isMobile && (
				<motion.div
					animate={{
						scale: activeNode ? 1.5 : 1,
					}}
					className="pointer-events-none fixed z-40 h-6 w-6 rounded-full bg-pink-500 mix-blend-difference"
					style={{
						x: mousePosition.x - 12,
						y: mousePosition.y - 12, //
					}}
				/>
			)}

			<div className="container relative z-10 mx-auto mt-20 px-6 py-20">
				{/* Header */}
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mb-20 text-center"
					initial={{ opacity: 0, y: 50 }}
					transition={{ duration: shouldReduceMotion ? 0 : 1 }}
				>
					<h2 className="mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
						My Journey
					</h2>
					<p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
						From gaming passion to full-stack mastery - a visual story of
						curiosity, creation, and continuous learning
					</p>
				</motion.div>

				{/* Journey Map */}
				<div
					aria-label="Interactive journey timeline showing professional development milestones"
					className="relative mx-auto h-[600px] w-full md:h-[800px]"
					ref={containerRef}
					role="img"
				>
					<svg aria-hidden="true" className="absolute inset-0 h-full w-full">
						<defs>
							<linearGradient
								id="connectionGradient"
								x1="0%"
								x2="100%"
								y1="0%"
								y2="100%"
							>
								<stop offset="0%" stopColor="#ec4899" />
								<stop offset="50%" stopColor="#8b5cf6" />
								<stop offset="100%" stopColor="#06b6d4" />
							</linearGradient>
						</defs>
						{renderConnections()}
					</svg>

					{/* Journey Nodes */}
					{journeyNodes.map((node, index) => (
						<motion.div
							animate={{
								opacity: isInView ? 1 : 0,
								scale: isInView ? 1 : 0,
							}}
							aria-label={`${node.title} - ${node.period}: ${node.description}`}
							className="group absolute cursor-pointer touch-manipulation"
							initial={{ opacity: 0, scale: 0 }}
							key={node.id}
							onClick={() => handleNodeClick(node.id)}
							onKeyDown={e => handleKeyDown(e, node.id)}
							role="button"
							style={{
								left: `calc(${node.position.x}% - 40px)`,
								top: `calc(${node.position.y}% - 40px)`,
							}}
							tabIndex={0}
							transition={{
								delay: shouldReduceMotion ? 0 : index * 0.2,
								duration: shouldReduceMotion ? 0 : 0.6,
								type: 'spring',
								stiffness: 100,
							}}
							whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
							whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
						>
							{/* Node Circle */}
							<div
								className={`relative h-16 w-16 rounded-full bg-gradient-to-br md:h-20 md:w-20 ${node.color} p-0.5 shadow-2xl transition-all duration-300 ${
									activeNode === node.id ? 'scale-110 ring-4 ring-white/30' : ''
								}`}
							>
								<div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-white">
									<div className="align-item flex h-6 w-6 justify-center md:h-8 md:w-8">
										{node.icon}
									</div>
								</div>

								{/* Pulse Animation */}
								{!shouldReduceMotion && (
									<motion.div
										animate={{
											opacity: [0.3, 0, 0.3],
											scale: [1, 1.5, 1],
										}}
										className={`absolute inset-0 rounded-full bg-gradient-to-br ${node.color} opacity-30`}
										transition={{
											repeat: Number.POSITIVE_INFINITY,
											delay: index * 0.3,
											duration: 2,
										}}
									/>
								)}
							</div>
						</motion.div>
					))}
				</div>

				{/* Instructions */}
				<motion.div
					animate={{ opacity: 1, y: 0 }} //
					className="mb-8 mt-12 text-center"
					initial={{ opacity: 0, y: 20 }}
					transition={{
						duration: shouldReduceMotion ? 0 : 1,
						delay: shouldReduceMotion ? 0 : 1.5,
					}}
				>
					<p className="text-sm text-gray-400">
						{isMobile
							? 'Tap on the nodes to explore each milestone in detail'
							: 'Click on the nodes to explore each milestone • Use arrow keys or navigation buttons to browse • Click outside to close'}
					</p>
				</motion.div>

				{/* Bottom Section */}
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="mt-20 text-center"
					initial={{ opacity: 0, y: 50 }}
					transition={{
						duration: shouldReduceMotion ? 0 : 1,
						delay: shouldReduceMotion ? 0 : 2,
					}}
				>
					<div className="inline-flex items-center gap-3 rounded-full border border-pink-500/30 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-8 py-4 backdrop-blur-sm">
						<Sparkles className="h-5 w-5 flex-shrink-0 text-pink-400" />
						<span className="font-medium text-gray-200">
							{
								'Today, I continue to code with passion, always exploring new possibilities'
							}
						</span>
					</div>
				</motion.div>
			</div>

			{/* Modal Overlay */}
			<AnimatePresence>
				{activeNode && activeNodeData && (
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={handleBackdropClick}
						transition={{ duration: 0.3 }}
					>
						{/* Backdrop */}
						<div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

						{/* Modal Content */}
						<motion.div
							animate={{ opacity: 1, scale: 1, y: 0 }} //
							className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-purple-500/30 bg-background shadow-2xl backdrop-blur-md"
							exit={{ scale: 0.8, opacity: 0, y: 50 }}
							initial={{ scale: 0.8, opacity: 0, y: 50 }}
							onClick={e => e.stopPropagation()}
							transition={{ type: 'spring', stiffness: 100, duration: 0.4 }}
						>
							{/* Background Pattern */}
							<div
								className="absolute inset-0 opacity-10"
								style={{
									background: activeNodeData.bgPattern,
								}}
							/>

							{/* Scrollable Content */}
							<div className="relative max-h-[90vh] overflow-y-auto">
								{/* Header */}
								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className="sticky top-0 z-10 flex items-center justify-between border-b border-purple-500/20 bg-background/80 p-6 backdrop-blur-md md:p-8"
									initial={{ opacity: 0, y: -50 }}
									transition={{ delay: 0.1 }}
								>
									<div className="flex items-center gap-4">
										<div
											className={`h-12 w-12 rounded-full bg-gradient-to-br md:h-16 md:w-16 ${activeNodeData.color} flex items-center justify-center shadow-lg`}
										>
											<div className="text-lg text-white md:text-xl">
												{activeNodeData.icon}
											</div>
										</div>
										<div>
											<h1 className="text-xl font-bold text-white md:text-3xl">
												{activeNodeData.title}
											</h1>
											<div className="mt-1 flex items-center gap-2">
												<Calendar className="h-4 w-4 text-purple-300" />
												<p className="text-sm text-purple-300 md:text-base">
													{activeNodeData.period}
												</p>
											</div>
										</div>
									</div>
									<button
										aria-label="Close modal"
										className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-gray-400 backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-white"
										onClick={closeModal}
									>
										<X className="h-6 w-6" />
										<span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
											Click outside to close
										</span>
									</button>
								</motion.div>

								{/* Content */}
								<div className="p-6 md:p-8">
									<motion.div
										animate={{ opacity: 1, y: 0 }}
										className="grid gap-8 md:grid-cols-2 md:gap-12"
										initial={{ opacity: 0, y: 50 }}
										transition={{ delay: 0.2 }}
									>
										{/* Left Column - Main Content */}
										<div className="space-y-8">
											{/* Hero Icon */}
											<div className="text-center md:text-left">
												<div
													className={`inline-flex h-24 w-24 rounded-2xl bg-gradient-to-br md:h-32 md:w-32 ${activeNodeData.color} mb-6 items-center justify-center shadow-2xl`}
												>
													<div className="text-3xl text-white md:text-4xl">
														{activeNodeData.icon}
													</div>
												</div>
											</div>

											{/* Description */}
											<div>
												<h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
													<MapPin className="h-5 w-5 text-purple-400" />
													The Story
												</h2>
												<div className="rounded-xl border border-purple-500/20 bg-background/40 p-6 backdrop-blur-sm">
													<p className="text-base leading-relaxed text-gray-100 md:text-lg">
														{activeNodeData.detailedDescription}
													</p>
												</div>
											</div>

											{/* Achievements */}
											<div>
												<h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white md:text-xl">
													<Zap className="h-5 w-5 text-yellow-400" />
													Key Achievements
												</h3>
												<div className="rounded-xl border border-purple-500/20 bg-slate-800/40 p-6 backdrop-blur-sm">
													<ul className="space-y-3">
														{activeNodeData.achievements.map(
															(achievement, index) => (
																<motion.li
																	animate={{ opacity: 1, x: 0 }}
																	className="flex items-start gap-3 text-gray-100"
																	initial={{ opacity: 0, x: -20 }}
																	key={index}
																	transition={{ delay: 0.3 + index * 0.1 }}
																>
																	<div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
																	<span className="text-sm md:text-base">
																		{achievement}
																	</span>
																</motion.li>
															)
														)}
													</ul>
												</div>
											</div>
										</div>

										{/* Right Column - Technologies & Meta */}
										<div className="space-y-8">
											{/* Technologies */}
											<div>
												<h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-white md:text-xl">
													<Code className="h-5 w-5 text-cyan-400" />
													Technologies & Skills
												</h3>
												<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
													{activeNodeData.technologies.map((tech, index) => (
														<motion.div
															animate={{ opacity: 1, scale: 1 }}
															className="rounded-lg border border-purple-500/20 bg-background/60 px-4 py-3 text-center backdrop-blur-sm transition-colors hover:bg-background/60"
															initial={{ scale: 0.8, opacity: 0 }}
															key={index}
															transition={{ delay: 0.4 + index * 0.05 }}
															whileHover={{ scale: 1.05 }}
														>
															<span className="text-sm font-medium text-gray-100 md:text-base">
																{tech}
															</span>
														</motion.div>
													))}
												</div>
											</div>

											{/* Progress Indicator */}
											<div className="rounded-xl border border-purple-500/20 bg-background/40 p-6 backdrop-blur-sm">
												<h4 className="mb-4 font-semibold text-white">
													Journey Progress
												</h4>
												<div className="mb-2 flex items-center justify-between text-sm text-gray-300">
													<span>Milestone {getCurrentNodeIndex() + 1}</span>
													<span>{journeyNodes.length} Total</span>
												</div>
												<div className="h-2 w-full rounded-full bg-slate-700">
													<motion.div
														animate={{
															width: `${((getCurrentNodeIndex() + 1) / journeyNodes.length) * 100}%`,
														}}
														className={`h-2 rounded-full bg-gradient-to-r ${activeNodeData.color}`}
														initial={{ width: 0 }}
														transition={{ duration: 0.8, delay: 0.5 }}
													/>
												</div>
											</div>

											{/* Quote or Insight */}
											<motion.div
												animate={{ opacity: 1, scale: 1 }}
												className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-sm"
												initial={{ scale: 0.9, opacity: 0 }}
												transition={{ delay: 0.6 }}
											>
												<div className="text-center">
													<Sparkles className="mx-auto mb-3 h-8 w-8 text-purple-400" />
													<p className="text-sm italic text-gray-100 md:text-base">
														{
															'Every challenge was a stepping stone to the next adventure in technology.'
														}
													</p>
												</div>
											</motion.div>
										</div>
									</motion.div>
								</div>

								{/* Navigation Footer */}
								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className="sticky bottom-0 border-t border-purple-500/20 bg-slate-900/80 p-6 backdrop-blur-md md:p-8"
									initial={{ opacity: 0, y: 50 }}
									transition={{ delay: 0.3 }}
								>
									<div className="flex items-center justify-between">
										<button
											aria-label="Previous milestone"
											className="hover:background flex items-center gap-3 rounded-xl bg-background/80 px-6 py-3 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:text-white"
											onClick={() => navigateToNode('prev')}
										>
											<ChevronLeft className="h-5 w-5" />
											<span className="hidden sm:inline">Previous</span>
										</button>

										<div className="text-center">
											<p className="mb-1 text-sm text-gray-400">
												{getCurrentNodeIndex() + 1} of {journeyNodes.length}
											</p>
											<div className="flex gap-2">
												{journeyNodes.map((_, index) => (
													<div
														className={`h-2 w-2 rounded-full transition-all duration-200 ${
															index === getCurrentNodeIndex()
																? 'scale-125 bg-purple-400'
																: 'bg-slate-600'
														}`}
														key={index}
													/>
												))}
											</div>
										</div>

										<button
											aria-label="Next milestone"
											className="flex items-center gap-3 rounded-xl bg-background/80 px-6 py-3 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-background hover:text-white"
											onClick={() => navigateToNode('next')}
										>
											<span className="hidden sm:inline">Next</span>
											<ChevronRight className="h-5 w-5" />
										</button>
									</div>
								</motion.div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	)
}
