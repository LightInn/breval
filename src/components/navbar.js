'use client'

import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Navigation() {
	const [mounted, setMounted] = useState(false)
	const { setTheme, theme } = useTheme()
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleMenu = () => setIsOpen(!isOpen)

	const navItems = [
		{ href: '/projects', name: 'PROJECTS' },
		{ href: '/blog', name: 'BLOG' },
		{ href: '/artist', name: 'ARTIST' },
		{ href: '/#about', name: 'ABOUT' },
	]

	const isActive = path => {
		if (path.startsWith('#')) {
			return pathname === '/' && path === '/#about'
		}
		return pathname === path
	}

	return (
		<header className="fixed top-0 z-50 w-full px-4 py-4">
			<div className="mx-auto max-w-7xl">
				<nav className="flex items-center justify-between">
					<div className="flex items-center">
						<Link
							className="magnetic-button text-2xl font-bold text-primary"
							href="/"
						>
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								className="flex items-center"
								initial={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.5 }}
							>
								<div className="relative">
									<svg
										fill="none"
										height="40"
										viewBox="0 0 40 40"
										width="40"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											className="fill-primary/10 stroke-primary"
											height="32"
											rx="8"
											strokeWidth="2"
											width="32"
											x="4"
											y="4"
										/>
										<path
											className="fill-primary"
											d="M20 8L28 20L20 32L12 20L20 8Z"
										/>
										<circle className="fill-background" cx="20" cy="20" r="3" />
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
							className="magnetic-button"
							onClick={toggleMenu}
							size="icon"
							variant="ghost"
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
						animate={{ opacity: 1, y: 0 }}
						className="hidden items-center md:flex"
						initial={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="pixel-corners flex items-center space-x-6 rounded-full border border-primary/20 bg-card/80 px-6 py-3 backdrop-blur-md">
							{navItems.map((item, index) => (
								<motion.div
									animate={{ opacity: 1, y: 0 }}
									initial={{ opacity: 0, y: -10 }}
									key={item.name}
									transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
								>
									<Link
										className={`magnetic-button rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${
											isActive(item.href)
												? 'bg-primary/10 font-bold text-primary'
												: 'hover:bg-primary/5 hover:text-primary'
										}`}
										href={item.href}
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
							animate={{ scale: 1 }}
							initial={{ scale: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<Button
								aria-label="Toggle theme"
								className="magnetic-button pixel-corners ml-4 hidden border border-primary/20 bg-card/80 backdrop-blur-md md:flex"
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								size="icon"
								variant="ghost"
							>
								<motion.div
									animate={{ rotate: theme === 'dark' ? 180 : 0 }}
									initial={{ rotate: 0 }}
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
						animate={{ opacity: 1, scale: 1, y: 0 }}
						className="pixel-corners dark:dithered-dark dithered-light mt-4 rounded-2xl border border-primary/20 bg-card/90 p-6 backdrop-blur-md md:hidden"
						exit={{ scale: 0.95, opacity: 0, y: -20 }}
						initial={{ scale: 0.95, opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex flex-col space-y-4">
							{navItems.map((item, index) => (
								<motion.div
									animate={{ opacity: 1, x: 0 }}
									initial={{ opacity: 0, x: -20 }}
									key={item.name}
									transition={{ delay: index * 0.1, duration: 0.3 }}
								>
									<Link
										className={`magnetic-button block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
											isActive(item.href)
												? 'bg-primary/10 font-bold text-primary'
												: 'hover:bg-primary/5 hover:text-primary'
										}`}
										href={item.href}
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
									className="magnetic-button"
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									size="icon"
									variant="ghost"
								>
									<motion.div
										animate={{ rotate: theme === 'dark' ? 180 : 0 }}
										initial={{ rotate: 0 }}
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
