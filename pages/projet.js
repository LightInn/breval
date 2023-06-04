import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Navbar } from '../components/navbar'
import ImageWithFallback from '../components/ImageWithFallback'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Project({ projects }) {
	const [imgSrcFallback, setImgSrcFallback] = React.useState('')
	return (
		<div className="min-h-screen bg-slate-900">
			<Head>
				<title>Bréval LE FLOCH | Projets </title>
				<meta
					name="description"
					content="Liste des projets de developpement realisé par Bréval LE FLOCH."
				/>

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="canonical" href="https://brev.al" key="canonical" />

				{/*@ts-ignore*/}
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Navbar />

			<div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 ">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
						Mes projets
					</h2>
					<p className="mt-4 text-gray-300">
						En tant que developpeur web, j'ai eu l'occasion de travailler sur
						des projets variés. Voici une liste non exhaustive de mes
						réalisations.
					</p>
				</div>

				<div className="mt-16 space-y-16">
					{projects.map((project, projectIdx) => (
						<Link
							key={project.attributes.title}
							className="relative flex flex-col-reverse overflow-hidden rounded-lg
                            border-2 border-slate-1000/75 p-8 shadow-2xl transition duration-150
                            ease-in-out hover:border-glow-600 hover:shadow-lg lg:grid lg:grid-cols-12  lg:gap-x-8"
							href={'/projet/' + project.attributes.title}
						>
							<Image
								src={'/abstract_shape.svg'}
								alt={'abstract shape'}
								className={
									(projectIdx % 2 === 0
										? '-left-20 rotate-12'
										: '-right-20 -rotate-12') +
									' absolute -bottom-20 z-10 rotate-12 transform opacity-10 invert'
								}
								width={300}
								height={300}
							/>
							<div
								className={classNames(
									projectIdx % 2 === 0
										? 'lg:col-start-1'
										: 'lg:col-start-8 xl:col-start-9',
									'z-20 mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
								)}
							>
								<h3 className="text-lg font-medium text-gray-50">
									{' '}
									{project.attributes.title}
								</h3>
								<p className="mt-2 text-sm text-gray-300">
									{' '}
									{project.attributes.short_description}
								</p>
								<div
									className="my-12 inline-flex items-center rounded-full border border-transparent bg-glow-500 px-3.5 py-2 text-sm font-medium leading-4
                                     text-black shadow-sm hover:bg-glow-600 focus:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
								>
									En savoir plus
								</div>
							</div>

							<div
								className={classNames(
									projectIdx % 2 === 0
										? 'lg:col-start-6 xl:col-start-5'
										: 'lg:col-start-1',
									'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
								)}
							>
								<div className="overflow-hidden rounded-lg">
									<ImageWithFallback
										src={
											'https://breval-api.lightin.io' +
											project.attributes.media.data[0]?.attributes.url
										}
										fallbackSrc="/projets.png"
										alt={project.attributes.media.data[0]?.attributes.name}
										className="w-full object-cover object-center"
										width={500}
										height={500}
									/>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
	)
	const data = await res.json()

	return {
		props: {
			projects: data.data,
			revalidate: 3600,
		},
	}
}
