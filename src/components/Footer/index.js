import React from 'react'

import Link from 'next/link'

const Footer = () => {
	return (
		<footer className="z-20 mt-8 flex flex-col items-center rounded-t-2xl bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-glow-300">
			<div className="relative mt-4 flex w-full flex-col items-center justify-between border-t border-solid border-light dark:border-slate-700 px-8 py-2 font-medium md:mt-8 md:flex-row md:py-6">
				<span className="text-center">
					&copy;2024 brev.al All rights reserved.
				</span>
				<Link
					className="my-4 hidden text-center underline md:my-0 md:block"
					href="/sitemap.xml"
				>
					sitemap.xml
				</Link>
				<div className="hidden text-center md:block">
					Made with &hearts; by{' '}
					<Link
						aria-label="Going back to main page"
						className="underline"
						href="/"
						target="_blank"
					>
						Bréval LE FLOCH
					</Link>
					; Design by{' '}
					<a
						className="underline"
						href="https://devdreaming.com"
						target="_blank"
					>
						CodeBucks
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
