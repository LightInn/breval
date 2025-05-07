'use client'
import React, { useState } from 'react'

import { rgbDataURL } from '@/services/dataurl.services'
import Image from 'next/image'
import Link from 'next/link'

import css from '/src/styles/Navbar.module.css'

function Navbar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	return (
		<>
			<div className={css.navBackground + ' hidden md:flex'}>
				<div className={css.fbContainer}>
					<div className={`${css.floatingBox1} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox2} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox3} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox4} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox5} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox6} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox7} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox8} ${css.fb}`}>.</div>
					<div className={`${css.floatingBox9} ${css.fb}`}>.</div>
				</div>

				<ul className={css.nav}>
					<Link className={css.navElement} href="/">
						<div className={css.logo}>
							<svg
								className={css.bitimeSVG}
								height="180mm"
								version="1.1"
								viewBox="0 50 210 210"
								width="180mm"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									className={css.bitime + ' fill-dynamic-vibrant-light'}
									d="m 139.80404,116.9222 -12.57184,4.0845 -18.69808,25.7359 -18.207678,-25.06204 c -0.0312,0.0131 -1.84458,0.57745 -4.08813,1.27228 -2.2436,0.69485 -4.09354,1.26889 -4.16873,1.29346 l 21.324788,29.35169 2.48151,-3.41477 c 1.36861,-1.88342 2.50849,-3.43822 2.53318,-3.45509 0.0272,-0.0186 0.0661,-0.007 0.11524,0.0279 l -5.03691,6.93292 c -0.004,-0.004 -0.005,-0.003 -0.01,-0.007 l -0.0548,-0.0455 0.0512,0.0703 -21.570258,29.68914 -0.0227,-0.007 c -0.14592,0.25576 -4.41154,6.9797 -4.5284,7.13807 l 0.0248,0.008 12.38374,-4.02405 18.773018,-25.83873 18.17098,25.00984 c 0.0179,-0.006 0.0347,-0.0119 0.0605,-0.0196 0.0874,-0.0261 2.02716,-0.61525 4.31085,-1.30897 2.15444,-0.65445 3.72738,-1.12491 3.92844,-1.1777 l -21.3341,-29.3641 c -0.0166,0.0379 -4.96526,6.85612 -5.00641,6.89777 -0.0198,0.02 -0.0505,0.009 -0.12092,-0.0439 -10e-4,-7.4e-4 -0.002,-10e-4 -0.003,-0.002 l 5.04827,-6.94841 c 0.0119,0.009 0.0202,0.0175 0.0305,0.0264 l -0.0248,-0.0341 21.57023,-29.68914 0.0129,0.004 0.007,-0.0109 c 0.008,-0.0125 1.06525,-1.63529 2.3487,-3.60598 1.24519,-1.91197 2.20674,-3.38729 2.27014,-3.48299 z m 0.27182,0.0822 -2.2965,3.5264 c -1.26814,1.9472 -2.29714,3.52756 -2.33061,3.57911 l 34.61804,11.24841 v 0.03 c 0.001,-0.002 0.006,-0.0176 0.007,-0.0176 0.0138,0 7.87644,2.44309 8.18141,2.54196 v -0.005 l -8.08299,-11.12435 z m -63.338768,0.0832 -29.6845,9.64489 c 0.0116,0.0592 0.0867,1.82869 0.16692,3.93309 0.0803,2.10486 0.097,4.12231 0.11265,4.33669 -0.002,0.11256 -10e-4,0.18226 -0.005,0.25011 l 34.57619,-11.23445 0.0108,0.0155 c 0.0739,-0.0301 8.09736,-2.51456 8.26254,-2.5585 l -0.0196,-0.0269 h -5.2e-4 z m -29.91652,9.72085 -0.0233,0.007 -7.98298,10.98744 v 31.27096 c 0.13692,0.034 7.82536,2.56591 8.18762,2.69596 v -36.4117 l 0.007,-0.003 c -0.003,-0.0145 -0.007,-0.0236 -0.008,-0.0434 -0.015,-0.1884 0.0635,-2.39446 -0.0145,-4.43435 -0.0779,-2.0399 -0.15047,-3.83122 -0.16124,-3.98064 -0.003,-0.0381 -0.003,-0.0607 -0.005,-0.0889 z m 123.246218,8.84132 v 36.40604 l -0.003,0.001 -0.0134,1.09555 c -0.0148,1.24491 -0.0584,6.7366 -0.0584,7.33495 v 0.20205 l 0.008,-0.003 8.25479,-11.36158 v -31.13201 c -0.1267,-0.04 -8.02784,-2.4939 -8.18813,-2.543 z m -131.252448,33.6961 v 0.008 l 8.22689,11.32386 30.06741,9.76942 c 0.003,-0.007 0.005,-0.0132 0.009,-0.0212 0.0583,-0.0987 4.29712,-6.78772 4.51135,-7.11947 l -34.62734,-11.2507 v -0.006 c -0.0933,-0.0292 -1.85315,-0.60943 -4.11448,-1.35651 -2.23775,-0.7393 -3.94405,-1.30388 -4.07313,-1.34772 z m 130.986318,2.79621 -34.63561,11.25409 -0.0155,-0.0212 c -0.25623,0.0843 -7.96918,2.42572 -8.29148,2.51716 l 0.0145,0.0202 13.52269,4.39353 29.33723,-9.53224 10e-4,-0.54621 c 0.001,-0.57028 0.0619,-7.88987 0.0672,-8.0853 z"
								/>
							</svg>
						</div>
						<div className={css.content}>Brev.al</div>
					</Link>
					<Link className={css.navElement + ' mt-4'} href="/projects">
						<div className={css.logo}>
							<svg
								className={css.bitimeSVG}
								height="180mm"
								version="1.1"
								viewBox="0 50 210 210"
								width="180mm"
								xmlns="http://www.w3.org/2000/svg"
							></svg>
						</div>

						<div className={css.content}>Projects</div>
					</Link>
					<Link className={css.navElement + ' mt-4'} href="/blog">
						<div className={css.logo}>
							<svg
								className={css.bitimeSVG}
								height="180mm"
								version="1.1"
								viewBox="0 50 210 210"
								width="180mm"
								xmlns="http://www.w3.org/2000/svg"
							></svg>
						</div>

						<div className={css.content}>Blog</div>
					</Link>
				</ul>
			</div>
			<div className="fixed z-50 block w-screen md:hidden">
				{/* -------------------------------------------------------------------------------------------------------------------    Mobile view under md*/}
				<div
					className={
						'flex w-full flex-col md:hidden ' +
						(isMobileOpen ? 'bg-dynamic-vibrant-light' : '')
					}
				>
					<div
						className={
							'flex h-[60px] items-center justify-between bg-dynamic-vibrant px-4'
						}
					>
						<Link
							className={`m-0 flex h-full w-16 origin-center items-center justify-center rounded-full p-0 no-underline transition-all duration-100 ease-in-out`}
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
			</div>
		</>
	)
}

export default Navbar
