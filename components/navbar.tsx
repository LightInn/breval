import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export function Navbar() {
	const [showTransparentBackground, setShowTransparentBackground] =
		useState(true)

	function handleNav(e: Event) {
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
			className={
				`fixed left-0 top-0 z-50 flex h-[60px] w-screen flex-col items-center justify-center text-black transition-all sm:h-[80px]
				
				`
				// ${showTransparentBackground ? '2xl:bg-green-500/0' : ''}
			}
		>
			{/* pill */}
			<div
				className={`md:w-max-[500px] flex h-[60px] w-[500px] flex-row items-center justify-center rounded-full
                    bg-glow-500/90 px-20 opacity-90 drop-shadow-[0px_6px_23px_-2px_rgba(0,0,0,0.9)]
                    transition-all hover:opacity-100
                    ${
											showTransparentBackground
												? ''
												: 'h-[40px] translate-y-[-20px] rounded-t-none hover:h-[60px] hover:translate-y-[10px] hover:rounded-full'
										}
                    `}
			>
				<Link
					href="/"
					className={`m-0 flex w-20 origin-center 
                     items-center justify-center rounded-full p-0 transition-all
                     duration-100  ease-in-out hover:w-24 md:h-full md:w-16`}
				>
					<Image
						src="/logo.png"
						width={100}
						height={100}
						alt="Logo signature de Bréval Le Floch"
					/>
				</Link>

				<Link
					href="/projet"
					className={`button-animated  smoke m-0 hidden origin-center items-center justify-center 
                     rounded-full p-0 transition-all duration-100 
                     ease-in-out hover:w-32 md:flex md:h-full md:w-24
                     `}
					// ${showTransparentBackground ? '' : 'md:w-0  hover:w-32'}
				>
					<div>
						<span>G</span>
						<span>A</span>
						<span>L</span>
						<span>L</span>
						<span>E</span>
						<span>R</span>
						<span>Y</span>
					</div>
				</Link>
				<a
					href="mailto:breval.lefloch@gmail.com"
					className={`button-animated  smoke m-0 hidden origin-center items-center justify-center 
                     rounded-full p-0 transition-all duration-100 
                     ease-in-out  hover:w-32 md:flex md:h-full md:w-24
                     `}
				>
					<div>
						<span>C</span>
						<span>O</span>
						<span>N</span>
						<span>T</span>
						<span>A</span>
						<span>C</span>
						<span>T</span>
					</div>
				</a>
			</div>
		</header>
	)
}
