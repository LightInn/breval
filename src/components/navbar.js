'use client'

import { HiHome, HiOutlineBookOpen, HiUser, HiViewGrid } from 'react-icons/hi'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { rgbDataURL } from '@/services/dataurl.services'

export default function Navbar() {
	const [showTransparentBackground, setShowTransparentBackground] =
		useState(true)
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	function handleNav(e) {
		// @ts-ignore
		e.target.scrollingElement.scrollTop > 0
			? setShowTransparentBackground(false)
			: setShowTransparentBackground(true)
	}

	useEffect(() => {
		window.addEventListener('scroll', e => handleNav(e))

		// Close mobile menu when clicking outside
		const handleClickOutside = e => {
			const target = e.target
			if (
				isMobileOpen &&
				!target.closest('.mobile-menu') &&
				!target.closest('.hamburger-button')
			) {
				setIsMobileOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			window.removeEventListener('scroll', handleNav)
			document.removeEventListener('click', handleClickOutside)
		}
	}, [isMobileOpen])

	// Prevent scrolling when mobile menu is open
	useEffect(() => {
		if (isMobileOpen) {
			// Sauvegarder la position de défilement actuelle
			const scrollY = window.scrollY

			// Appliquer directement les styles pour bloquer le scroll
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflow = 'hidden'
		} else {
			// Restaurer la position de défilement et réactiver le scroll
			const scrollY = document.body.style.top
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''

			// Rétablir la position de défilement
			if (scrollY) {
				window.scrollTo(0, Number.parseInt(scrollY || '0') * -1)
			}
		}

		return () => {
			// Nettoyage en cas de démontage du composant
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''
		}
	}, [isMobileOpen])

	const mobileLinks = [
		{ label: 'Accueil', Icon: HiHome, href: '/' },
		{ href: '/projects', label: 'Projets', Icon: HiViewGrid },
		{ Icon: HiOutlineBookOpen, href: '/blog', label: 'Blog' },
		{ label: 'À propos', href: '/about', Icon: HiUser },
	]

	return (
		<header
			className={`fixed left-0 top-0 z-50 flex w-screen flex-col items-center justify-center text-black backdrop-blur-md transition-all md:h-[80px] md:backdrop-filter-none`}
		>
			{/* Desktop pill */}
			<div
				className={`w-max-[500px] hidden h-[60px] w-[500px] flex-row items-center justify-center rounded-full bg-glow-500/90 px-20 opacity-90 drop-shadow-[0px_6px_23px_-2px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all hover:opacity-100 md:flex ${
					showTransparentBackground
						? ''
						: 'h-[40px] translate-y-[-20px] rounded-t-none hover:h-[60px] hover:translate-y-[10px] hover:rounded-full'
				} `}
			>
				<Link
					className={`m-0 flex h-full w-16 origin-center items-center justify-center rounded-full p-0 no-underline transition-all duration-100 ease-in-out hover:w-24`}
					href="/"
				>
					<Image
						alt="Logo signature de Bréval Le Floch"
						blurDataURL={rgbDataURL(231, 183, 202)}
						height={100}
						placeholder="blur"
						src="/logo.png"
						width={100}
					/>
				</Link>

				<Link
					className={`button-animated smoke m-0 flex h-full w-24 origin-center items-center justify-center rounded-full p-0 no-underline transition-all duration-100 ease-in-out hover:w-32`}
					href="/projects"
				>
					<div>
						<span>P</span>
						<span>R</span>
						<span>O</span>
						<span>J</span>
						<span>E</span>
						<span>C</span>
						<span>T</span>
						<span>S</span>
					</div>
				</Link>
				<Link
					className={`button-animated smoke m-0 hidden h-full w-24 origin-center items-center justify-center rounded-full p-0 no-underline transition-all duration-100 ease-in-out hover:w-32 md:flex`}
					href="/blog"
				>
					<div>
						<span>B</span>
						<span>L</span>
						<span>O</span>
						<span>G</span>
					</div>
				</Link>
				<Link
					className={`button-animated smoke m-0 flex h-full w-24 origin-center items-center justify-center rounded-full p-0 transition-all duration-100 ease-in-out hover:w-32`}
					href="/about"
				>
					<div>
						<span>A</span>
						<span>B</span>
						<span>O</span>
						<span>U</span>
						<span>T</span>
					</div>
				</Link>
			</div>

			{/* Mobile view under md */}
			<div className="md:hidden">
				{/* Hamburger button */}
				<motion.button
					aria-label="Toggle menu"
					className="hamburger-button fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent/80 shadow-lg"
					onClick={() => setIsMobileOpen(!isMobileOpen)}
					whileTap={{ scale: 0.95 }}
				>
					<div className="relative h-5 w-5">
						<motion.span
							animate={{
								rotate: isMobileOpen ? 45 : 0,
								y: isMobileOpen ? 9 : 0,
							}}
							className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-white"
							transition={{ duration: 0.2 }}
						/>
						<motion.span
							animate={{
								opacity: isMobileOpen ? 0 : 1,
							}}
							className="absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-white"
							transition={{ duration: 0.2 }}
						/>
						<motion.span
							animate={{
								rotate: isMobileOpen ? -45 : 0,
								y: isMobileOpen ? -9 : 0,
							}}
							className="absolute bottom-0 left-0 h-[2px] w-5 rounded-full bg-white"
							transition={{ duration: 0.2 }}
						/>
					</div>
				</motion.button>

				{/* Mobile menu drawer */}
				<AnimatePresence>
					{isMobileOpen && (
						<motion.nav
							animate={{ y: 0 }}
							className="mobile-menu fixed inset-0 z-40 flex h-screen flex-col"
							exit={{ y: '100%' }}
							initial={{ y: '100%' }}
							transition={{
								type: 'spring',
								stiffness: 250,
								damping: 25,
							}}
						>
							<div className="flex h-full flex-col bg-light/80 px-6 pb-8 pt-20 backdrop-blur-md">
								{/* Logo en haut du menu */}
								<div className="mb-8 flex justify-center">
									<Image
										alt="Logo signature de Bréval Le Floch"
										blurDataURL={rgbDataURL(231, 183, 202)}
										height={80}
										placeholder="blur"
										src="/logo.png"
										width={80}
									/>
								</div>

								<ul className="flex flex-col space-y-6">
									{mobileLinks.map(({ label, href, Icon }) => (
										<li className="list-none" key={href}>
											<Link
												className="flex items-center rounded-xl p-3 transition-colors hover:bg-white/20"
												href={href}
												onClick={() => setIsMobileOpen(false)}
											>
												<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-slate-800">
													<Icon size={24} />
												</div>
												<span className="ml-4 text-xl font-medium text-slate-800">
													{label}
												</span>
											</Link>
										</li>
									))}
								</ul>

								<div className="mt-auto pt-8 text-center text-slate-900/70">
									<p className="text-sm">
										© {new Date().getFullYear()} Bréval Le Floch
									</p>
								</div>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}
