'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import BrandMark from '@/components/Global/brand-mark'
import LocaleSwitcher from '@/components/Global/locale-switcher'
import ThemeSwitcher from '@/components/Global/theme-switcher'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
export default function Navigation({ dict }) {
	const [isOpen, setIsOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const pathname = usePathname()
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10
			setScrolled(isScrolled)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	const toggleMenu = () => setIsOpen(!isOpen)

	const navItems = [
		{
			name: dict?.navigation?.home || 'HOME',
			href: '/',
		},
		{
			name: dict?.navigation?.projects || 'PROJECTS',
			href: '/projects',
		},
		{
			name: dict?.navigation?.blog || 'BLOG',
			href: '/blog',
		},
		{
			name: dict?.navigation?.art || 'ART',
			href: '/artist',
		},
	]
	const isActive = path => {
		return pathname === path
	}
	return (
		<header className="fixed top-0 z-50 w-full px-4 py-3 sm:px-6 sm:py-4">
			{/* Background overlay with gradient that appears on scroll */}
			<div
				className={`absolute inset-0 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-gradient-to-b from-transparent to-transparent'}`}
			/>
			<div className="relative mx-auto max-w-7xl">
				<nav className="flex items-center justify-between gap-3">
					<div className="flex items-center">
						<Link href="/" aria-label="brev.al" className="shrink-0 text-primary">
							<BrandMark className="h-10 w-14 sm:h-12 sm:w-20" />
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className="order-last md:hidden">
						<Button
							aria-label={
								isOpen
									? dict?.navigation?.ariaCloseMenu || 'Close navigation menu'
									: dict?.navigation?.ariaOpenMenu || 'Open navigation menu'
							}
							className="magnetic-button pixel-corners cursor-pointer rounded-full border border-primary/20 bg-card/80 backdrop-blur-md transition-all duration-300 hover:bg-card/90"
							onClick={toggleMenu}
							size="icon"
							variant="ghost"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</Button>
					</div>

					{/* Desktop navigation */}
					<motion.div
						animate={{
							opacity: 1,
							y: 0,
						}}
						className="hidden flex-1 items-center justify-center md:flex"
						initial={{
							opacity: 0,
							y: -20,
						}}
						transition={{
							duration: 0.5,
							delay: 0.2,
						}}
					>
						<div className="pixel-corners flex items-center space-x-6 rounded-full border border-primary/20 bg-card/80 px-6 py-3 backdrop-blur-md">
							{navItems.map((item, index) => (
								<motion.div
									animate={{
										opacity: 1,
										y: 0,
									}}
									initial={{
										opacity: 0,
										y: -10,
									}}
									key={item.name}
									transition={{
										delay: 0.3 + index * 0.1,
										duration: 0.3,
									}}
								>
									<Link
										className={`magnetic-button rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${isActive(item.href) ? 'bg-primary/10 font-bold text-primary' : 'hover:bg-primary/5 hover:text-primary'}`}
										href={item.href}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>

					<Suspense fallback={<div className="h-9 w-24" />}>
						<LocaleSwitcher />
					</Suspense>
					<ThemeSwitcher />
				</nav>
				{/* Mobile menu */}
				{isOpen && (
					<motion.div
						animate={{
							opacity: 1,
							scale: 1,
							y: 0,
						}}
						className="pixel-corners dark:dithered-dark dithered-light mt-4 rounded-2xl border border-primary/20 bg-card/90 p-6 backdrop-blur-md md:hidden"
						exit={{
							scale: 0.95,
							opacity: 0,
							y: -20,
						}}
						initial={{
							scale: 0.95,
							opacity: 0,
							y: -20,
						}}
						transition={{
							duration: 0.3,
						}}
					>
						<div className="flex flex-col space-y-4">
							{navItems.map((item, index) => (
								<motion.div
									animate={{
										opacity: 1,
										x: 0,
									}}
									initial={{
										opacity: 0,
										x: -20,
									}}
									key={item.name}
									transition={{
										delay: index * 0.1,
										duration: 0.3,
									}}
								>
									<Link
										className={`magnetic-button block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive(item.href) ? 'bg-primary/10 font-bold text-primary' : 'hover:bg-primary/5 hover:text-primary'}`}
										href={item.href}
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</header>
	)
}
