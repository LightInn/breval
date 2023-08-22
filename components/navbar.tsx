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
				'fixed left-0 top-0 z-50 flex h-[80px] w-screen flex-row items-center justify-center bg-slate-200 px-4 transition-all xl:mt-0 xl:h-[60px] xl:flex-row  xl:justify-between xl:rounded-b-[25px] xl:px-20  ' +
				(showTransparentBackground ? '2xl:bg-green-500/0' : '')
			}
		>
			{/*drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)]*/}

			<Link
				href="/"
				className="m-0 flex origin-center items-center  justify-center rounded-b-full bg-slate-200 p-0 transition-all duration-100  ease-in-out hover:w-16 xl:h-14  xl:w-10 hover:xl:-translate-x-4 "
			>
				<Image
					src="/logo.png"
					width={100}
					height={100}
					alt="Logo signature de Bréval Le Floch"
				/>
			</Link>

			<div className="hidden w-[200px] justify-between xl:flex ">
				<Link
					href="/projet"
					className={
						'button-animated  smoke  flex h-14 w-20 origin-center items-center justify-center rounded-b-3xl bg-slate-200  font-body text-sm text-slate-800  transition-all duration-100 ease-in-out xl:flex' +
						(showTransparentBackground ? '2xl:bg-pink-400' : '2xl:bg-green-500')
					}
				>
					<div>
						<span>G</span>
						<span>A</span>
						<span>L</span>
						<span>E</span>
						<span>R</span>
						<span>I</span>
						<span>E</span>
					</div>
				</Link>
				<a
					href="mailto:breval.lefloch@gmail.com"
					className={
						'button-animated  smoke  flex h-14 w-20 origin-center items-center justify-center rounded-b-3xl bg-slate-200  font-body text-sm text-slate-800  transition-all duration-100 ease-in-out xl:flex' +
						(showTransparentBackground ? 'text-white' : 'text-white')
					}
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
