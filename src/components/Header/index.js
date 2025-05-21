'use client'
import { useState } from 'react'

import Logo from './Logo'

import Navbar from '/src/components/navbar'

const Header = () => {
	return (
		<header className="flex w-full items-center justify-between p-4 px-5 py-8 sm:px-10">
			<Logo />

			<Navbar />

			{/*<nav*/}
			{/*    className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center hidden sm:flex*/}
			{/*fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50"*/}
			{/*>*/}
			{/*  <Link href="/blog" className="mr-2">*/}
			{/*    Blog Home*/}
			{/*  </Link>*/}
			{/*  /!*<Link href="/" className="mr-2">About Me</Link>*!/*/}
			{/*  /!*<Link href="/about" className="mx-2">About</Link>*!/*/}
			{/*  /!*<Link href="/contact" className="mx-2">Contact</Link>*!/*/}
			{/*</nav>*/}
			{/*<div className=" hidden sm:flex items-center">*/}
			{/*    <a href={siteMetadata.linkedin} rel="noopener noreferrer" className="inline-block w-6 h-6 mr-4" aria-label="Reach out to me via LinkedIn" target="_blank"><LinkedinIcon className="hover:scale-125 transition-all ease duration-200" /></a>*/}
			{/*    <a href={siteMetadata.twitter} rel="noopener noreferrer" className="inline-block w-6 h-6 mr-4" aria-label="Reach out to me via Twitter" target="_blank"><TwitterIcon className="hover:scale-125 transition-all ease duration-200" /></a>*/}
			{/*    <a href={siteMetadata.github} rel="noopener noreferrer" className="inline-block w-6 h-6 mr-4" aria-label="Check my profile on Github" target="_blank"><GithubIcon className="  hover:scale-125 transition-all ease duration-200 dark:fill-light" /></a>*/}
			{/*    <a href={siteMetadata.dribbble} rel="noopener noreferrer" className="inline-block w-6 h-6 mr-4" aria-label="Check my profile on Dribbble" target="_blank"><DribbbleIcon className="hover:scale-125 transition-all ease duration-200" /></a>*/}
			{/*</div>*/}
		</header>
	)
}

export default Header
