'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleMenu = () => setIsOpen(!isOpen)

	const navItems = [
		{ name: 'HOME', href: '/' },
		{ name: 'PROJECTS', href: '/projects' },
		{ name: 'BLOG', href: '/blog' },
		{ name: 'ART', href: '/artist' },
	]

	const isActive = path => {
		return pathname === path
	}

	return (
		<header className="fixed top-0 z-50 w-full px-4 py-4">
			<div className="mx-auto max-w-7xl">
				<nav className="flex items-center justify-between">
					<div className="flex items-center">
						<Link
							href="/"
							className="magnetic-button text-2xl font-bold text-primary"
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="flex items-center"
							>
								<div className="relative">
									<svg
										width="40"
										height="40"
										viewBox="0 0 40 40"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											x="4"
											y="4"
											width="32"
											height="32"
											rx="8"
											className="fill-primary/10 stroke-primary"
											strokeWidth="2"
										/>
										<path
											d="M20 8L28 20L20 32L12 20L20 8Z"
											className="fill-primary"
										/>
										<circle cx="20" cy="20" r="3" className="fill-background" />
									</svg>
									<div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-primary" />
								</div>
								<span className="pixel-corners ml-3 hidden bg-primary/10 px-3 py-1 text-sm md:inline">
									BLF
								</span>
							</motion.div>
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMenu}
							className="magnetic-button"
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>

					{/* Desktop navigation */}
					<motion.div
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="hidden items-center md:flex"
					>
						<div className="pixel-corners flex items-center space-x-6 rounded-full border border-primary/20 bg-card/80 px-6 py-3 backdrop-blur-md">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
								>
									<Link
										href={item.href}
										className={`magnetic-button rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${
											isActive(item.href)
												? 'bg-primary/10 font-bold text-primary'
												: 'hover:bg-primary/5 hover:text-primary'
										}`}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Theme toggle */}
					{mounted && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								className="magnetic-button pixel-corners ml-4 hidden border border-primary/20 bg-card/80 backdrop-blur-md md:flex"
								aria-label="Toggle theme"
							>
								<motion.div
									initial={{ rotate: 0 }}
									animate={{ rotate: theme === 'dark' ? 180 : 0 }}
									transition={{ duration: 0.5 }}
								>
									{theme === 'dark' ? (
										<Sun className="h-5 w-5 text-primary" />
									) : (
										<Moon className="h-5 w-5 text-primary" />
									)}
								</motion.div>
							</Button>
						</motion.div>
					)}
				</nav>

				{/* Mobile menu */}
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.95 }}
						transition={{ duration: 0.3 }}
						className="pixel-corners dark:dithered-dark dithered-light mt-4 rounded-2xl border border-primary/20 bg-card/90 p-6 backdrop-blur-md md:hidden"
					>
						<div className="flex flex-col space-y-4">
							{navItems.map((item, index) => (
								<motion.div
									key={item.name}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.3, delay: index * 0.1 }}
								>
									<Link
										href={item.href}
										className={`magnetic-button block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
											isActive(item.href)
												? 'bg-primary/10 font-bold text-primary'
												: 'hover:bg-primary/5 hover:text-primary'
										}`}
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
							<div className="flex items-center justify-between border-t border-primary/20 pt-4">
								<span className="text-xs text-muted-foreground">
									Toggle theme
								</span>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									className="magnetic-button"
								>
									<motion.div
										initial={{ rotate: 0 }}
										animate={{ rotate: theme === 'dark' ? 180 : 0 }}
										transition={{ duration: 0.5 }}
									>
										{theme === 'dark' ? (
											<Sun className="h-4 w-4" />
										) : (
											<Moon className="h-4 w-4" />
										)}
									</motion.div>
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</header>
	)
}
