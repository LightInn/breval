import { Title } from './title'
import Image from 'next/image'
import { SocialIcons } from './Social'
import React from 'react'

export default function Hero() {
	return (
		<div className="relative z-20 flex h-screen w-screen items-center justify-center">
			<Title />

			<div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
				<div className="clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
					<div className="area">
						<ul className="circles">
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>

					<Image
						src={'/lightin__watterfall.png'}
						alt={''}
						className={
							'absolute left-0 top-0 ' +
							'mix-difference -z-10 block bg-slate-900 object-cover opacity-75 '
						}
						fill={true}
						loading="eager"
					/>
				</div>
			</div>

			<SocialIcons />

			<div className="absolute bottom-0 left-0 mb-12 flex items-center justify-center p-8 xl:mb-0 xl:p-20">
				<h2 className="origin-bottom-left -rotate-90 font-body text-sm tracking-wider text-glow-500 opacity-60 xl:text-xl">
					‣ BRÉVAL LE FLOCH{' '}
				</h2>
			</div>
		</div>
	)
}
