'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import rgbDataURL from '@/services/dataurl.services'

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
	}, [])

	return (
		<header
			className={`fixed left-0 top-0 z-50 flex w-screen flex-col items-center justify-center text-black backdrop-blur-md transition-all md:h-[80px] md:backdrop-filter-none`}
		>
			{/* pill */}
			<div
				className={`w-max-[500px] hidden h-[60px] w-[500px] flex-row items-center justify-center rounded-full bg-glow-500/90 px-20 opacity-90 drop-shadow-[0px_6px_23px_-2px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all hover:opacity-100 md:flex ${showTransparentBackground ? '' : 'h-[40px] translate-y-[-20px] rounded-t-none hover:h-[60px] hover:translate-y-[10px] hover:rounded-full'} `}
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
					// ${showTransparentBackground ? '' : 'md:w-0  hover:w-32'}
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
					// ${showTransparentBackground ? '' : 'md:w-0  hover:w-32'}
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

			{/* Mobile view under md*/}
			<div
				className={
					'flex w-full flex-col md:hidden ' +
					(isMobileOpen ? 'bg-accent/60' : '')
				}
			>
				<div
					className={
						'flex h-[60px] items-center justify-between bg-accent/60 px-4'
					}
				>
					<Link
						className={`m-0 flex h-full w-16 origin-center items-center justify-center rounded-full p-0 no-underline transition-all duration-100 ease-in-out`}
						href="/"
					>
						<Image
							alt="Logo signature de Bréval Le Floch"
							height={100}
							src="/logo.png"
							width={100}
						/>
					</Link>

					<button
						aria-controls="mobile-menu"
						aria-expanded="false"
						className="text-gray-400 hover:bg-gray-700 relative inline-flex items-center justify-center rounded-md p-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						onClick={() => setIsMobileOpen(!isMobileOpen)}
						type="button"
					>
						<span className="absolute -inset-0.5"></span>

						<span className="sr-only">Open main menu</span>

						<svg
							aria-hidden="true"
							className={'block h-6 w-6' + (isMobileOpen ? 'hidden' : '')}
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							x-description="Icon when menu is closed."
						>
							<path
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>

						<svg
							aria-hidden="true"
							className={'h-6 w-6' + (isMobileOpen ? 'block' : 'hidden')}
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							x-description="Icon when menu is open."
						>
							<path
								d="M6 18L18 6M6 6l12 12"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>

				<div className={'h-screen ' + (isMobileOpen ? 'block' : 'hidden')}>
					<div
						aria-expanded="false"
						className={'space-y-1 px-2 pb-3 pt-2'}
						id="mobile-menu"
					>
						<Link
							className={
								'bg-gray-900 block rounded-md px-3 py-2 text-base font-medium text-white'
							}
							href="/"
						>
							Home
						</Link>
						<Link
							className={
								'text-gray-300 hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium hover:text-white'
							}
							href="/projects"
						>
							Projects
						</Link>
						<Link
							className={
								'text-gray-300 hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium hover:text-white'
							}
							href="/blog"
						>
							Blog
						</Link>
						<Link
							className={
								'text-gray-300 hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium hover:text-white'
							}
							href="/about"
						>
							About
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}
