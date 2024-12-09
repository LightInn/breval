import React from 'react'

import Image from 'next/image'

import rgbDataURL from '@/services/dataurl.services'

import { SocialIcons } from './Social'
import { Title } from './title'

export default function Hero() {
	return (
		<div className="relative z-20 flex h-screen w-screen items-center justify-center">
			<Title />

			<div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
				<div className="video-background relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
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
						alt={''}
						blurDataURL={rgbDataURL(231, 183, 202)}
						className={
							'absolute left-0 top-0 blur-md ' +
							'mix-difference -z-10 block bg-slate-900 object-cover opacity-75'
						}
						fill={true}
						loading="eager"
						placeholder="blur"
						quality={10}
						src={'/home/blured_video.png'}
					/>

					<iframe
						allow="autoplay"
						allowFullScreen
						className={
							'absolute left-0 top-0 h-full w-full border-0 object-cover object-center ' +
							'mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75'
						}
						data-ready="true"
						height="1080"
						id="topHeroVideo"
						src="https://player.vimeo.com/video/879007060?background=1"
						title={'landing page background video'}
						width="1920"
					></iframe>
				</div>
			</div>

			<SocialIcons />

			<div className="absolute bottom-0 left-0 mb-12 flex items-center justify-center p-8 xl:mb-0 xl:p-20">
				<h2 className="z-50 origin-bottom-left -rotate-90 font-body text-sm tracking-wider text-glow-500 opacity-80 xl:text-xl">
					‣ BRÉVAL LE FLOCH{' '}
				</h2>
			</div>
		</div>
	)
}
