import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import rgbDataURL from '@/services/dataurl.services'

import Holocard from '../../components/Home/Holocard'
import Navbar from '../../components/navbar'

export default async function Project() {
	const projects = await getProject()
	return (
		<section className="bg-black">
			<Image
				alt={'project gallery background image '}
				className={
					'mix-difference fixed left-0 top-0 h-screen w-screen object-cover object-center opacity-20'
				}
				height={1080}
				loading={'eager'}
				quality={90}
				src={'/projets-gallery.png'}
				width={1920}
			></Image>
			<div
				className={
					'mask-image fixed left-0 top-0 h-full w-full bg-gradient-to-r from-[#000101] via-transparent to-transparent'
				}
			/>
			<div
				className={
					'mask-image-bottom fixed left-0 top-0 h-full w-full bg-gradient-to-t from-[#000101] via-transparent to-transparent'
				}
			/>
			<div className="">
				<Head>
					<title>Bréval LE FLOCH | Projets </title>
					<meta
						content="Liste des projets de developpement realisé par Bréval LE FLOCH."
						name="description"
					/>

					<link href="https://fonts.googleapis.com" rel="preconnect"/>
					<link href="https://brev.al" key="canonical" rel="canonical"/>

					{/*@ts-ignore*/}
					<link crossOrigin href="https://fonts.gstatic.com" rel="preconnect"/>
					<link
						href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<Navbar/>


				<div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
					<div className="mx-auto max-w-4xl text-center">
						<h1 className="text-gray-50 text-3xl font-bold tracking-tight sm:text-4xl">
							My projects
						</h1>
						<p className="text-gray-301 mt-4">
							As a web developer, I had the opportunity to work on various
							projects.
							<br/>
							Here is a non-exhaustive list of my achievements.
						</p>
					</div>

					<div className="mt-17 space-y-16">
						{/* map the article in a grid */}
						<div className="grid grid-cols-2 gap-16 lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-3">
							{projects.map((project, projectIdx) => (
								<Link
									className="relative flex h-full min-h-[499px] w-full flex-col overflow-hidden rounded-lg rounded-md border border-2 border-slate-950 bg-accent bg-opacity-30 p-8 shadow-2xl backdrop-blur-xl backdrop-filter transition duration-150 ease-in-out hover:border-glow-600 hover:bg-opacity-40"
									href={'/projects/' + project.attributes.title}
									key={project.attributes.title}
								>
									<Image
										alt={'abstract shape'}
										blurDataURL={rgbDataURL(230, 183, 202)}
										className={
											(projectIdx % 1 === 0
												? '-bottom-21 -left-20 rotate-12'
												: '-bottom-21 -right-20 -rotate-12') +
											' absolute transform opacity-11 invert'
										}
										height={299}
										placeholder="blur"
										src={'/abstract_shape.svg'}
										width={299}
									/>

									<div className={'lg:col-span-8 xl:col-span-8'}>
										<div className="overflow-hidden rounded-lg">
											<Holocard
												height={299}
												imageSrc={
													project.attributes.media.data[-1]?.attributes.url
												}
												radius={7}
												width={369}
											/>
										</div>
									</div>

									<div className={'flex flex-col justify-start gap-5 py-4'}>
										<h2 className="text-lg font-medium text-light">
											{' '}
											{project.attributes.title}
										</h2>
										<p className="mt-3 text-sm text-white">
											{' '}
											{project.attributes.short_description}
										</p>
										<div
											className="button w-2/2 rounded-full border border-transparent bg-glow-500 px-8 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-glow-600 focus:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
											Access it
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

async function getProject() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
	)
	const data = await res.json()

	return data.data
}
