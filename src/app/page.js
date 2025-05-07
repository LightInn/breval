'use client'
import React from 'react'

import { rgbDataURL } from '@/services/dataurl.services'
import Image from 'next/image'
import Link from 'next/link'

import Presentation from '../components/Home/presentation'
import Divider from '../components/Home/divider'
import Hero from '../components/Home/hero'
import Navbar from '../components/navbar'

export default function Home() {
	return (
		<div className="text-Sky-50 snap-y snap-proximity bg-slate-1000 font-varela-round">
			<Navbar />
			<Hero />
			<Divider top={true} />
			<Presentation />
			<Divider top={false} />
			<section className="relative z-20 box-border flex h-[110vh] w-full -translate-y-[80px] transform snap-start flex-col flex-wrap items-start justify-center pb-[30px] text-sky-50">
				<div className={'absolute -z-10 h-full w-full'}>
					<Image
						alt={''}
						blurDataURL={rgbDataURL(231, 183, 202)}
						className={
							'absolute left-0 top-0 ' +
							'mix-difference -z-10 bg-slate-1000 object-cover opacity-50'
						}
						fill={true}
						loading="lazy"
						placeholder="blur"
						src={'/projets.png'}
					/>
					<div
						className={
							'mask-image absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#000101] via-transparent to-transparent'
						}
					/>
					<div
						className={
							'mask-image-bottom absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#000101] via-transparent to-transparent'
						}
					/>
				</div>

				<div
					className={
						'flex w-screen flex-col items-center justify-center gap-4 md:items-start lg:px-80'
					}
				>
					<h2 className="z-10 text-xl font-medium xl:text-3xl">
						Projects Gallery
					</h2>
					<div>
						<Link
							className="button inline-flex items-center rounded-full border border-transparent bg-glow-500 px-3 py-3 font-medium text-black no-underline shadow-sm hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							href={'/projects'}
							type="button"
						>
							My projects
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
