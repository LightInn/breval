import Markdown from 'react-markdown'
import React from 'react'

import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import Head from 'next/head'

import { rgbDataURL } from '@/services/dataurl.services'

import ImageWithFallback from '../../../components/Home/ImageWithFallback'
import Navbar from '../../../components/navbar'

export async function generateStaticParams() {
	const res = await fetch(
		'https://breval-api.lightin.io/api/projets?fields=title'
	)
	const data = await res.json()

	const paths = data.data.map(project => ({ id: project.attributes.title }))

	return paths
}

export default async function ProjectDetail(props) {
	const params = await props.params
	const { id } = params
	const project = await getProject(id)
	return (
		<div className="min-h-screen bg-slate-900 text-white">
			<Head>
				<title>Bréval LE FLOCH | {project.attributes?.title} </title>

				<meta
					content={
						project.attributes?.title +
						' : ' +
						project.attributes?.short_description
					}
					name="description"
				/>
				<link
					href={'https://brev.al/projet/' + project.attributes?.title}
					key="canonical"
					rel="canonical"
				/>

				<link href="https://fonts.googleapis.com" rel="preconnect" />

				{/*@ts-ignore*/}
				<link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />
				<link
					href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<Navbar />

			<div className="pb-16 pt-12 sm:pb-24">
				<nav
					aria-label="Breadcrumb"
					className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
				>
					<ol className="flex items-center space-x-4" role="list">
						<li className="list-none">
							<div className="flex items-center">
								<Link
									className="text-gray-400 mr-4 list-disc text-sm font-medium"
									href={'/projects'}
								>
									projets
								</Link>
								<svg
									aria-hidden="true"
									className="text-gray-300 h-5 w-auto"
									viewBox="0 0 6 20"
								>
									<path
										d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</li>

						<li className="list-none text-sm">
							<div aria-current="page" className="font-medium text-glow-500">
								{project.attributes?.title}
							</div>
						</li>
					</ol>
				</nav>

				<div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
						<div className="lg:col-span-5 lg:col-start-8">
							<div className="flex justify-between">
								<h1 className="text-xl font-medium text-glow-500">
									{project.attributes?.title}
								</h1>
								<p className="text-gray-500 text-sm font-medium">
									{format(parseISO(project.attributes?.date), 'LLLL d, yyyy')}
								</p>
							</div>
						</div>

						{/* Image gallery */}
						<div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
							<h2 className="sr-only">Images</h2>
							<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
								{project.attributes?.media?.data?.map((image, idx) => (
									<ImageWithFallback
										alt={image.attributes.name}
										blurDataURL={rgbDataURL(231, 183, 202)}
										className={classNames(
											idx === 0
												? 'lg:col-span-2 lg:row-span-2'
												: 'hidden lg:block',
											'w-full rounded-lg'
										)}
										fallbackSrc="/projets.png"
										height={image.attributes.height}
										key={image.id}
										placeholder="blur"
										src={image.attributes.url}
										width={image.attributes.width}
									/>
								))}
							</div>
						</div>

						<div className="mt-2 lg:col-span-5">
							{/* URL VIEW */}

							{project.attributes?.url && (
								<a
									className="button mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-glow-500 px-8 py-3 text-base font-medium text-black hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									data-umami-event="project link"
									data-umami-event-url={project.attributes?.url}
									href={project.attributes?.url}
									type="submit"
								>
									{project.attributes?.url}
								</a>
							)}

							{/* Product details */}
							<div className="mt-10">
								<h2 className="text-gray-400 text-sm font-medium">
									Description
								</h2>

								<div className="prose prose-sm text-md text-gray-100 mt-4">
									<Markdown>
										{project.attributes?.description.toString()}
									</Markdown>
								</div>
							</div>

							{project.attributes?.creators?.length > 0 && (
								<section aria-labelledby="policies-heading" className="mt-10">
									{/* Policies */}

									<h2 className="text-gray-400" id="policies-heading">
										{`
											Other team's members for this project :
										`}
									</h2>

									<dl className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
										{project.attributes?.creators?.map((creator, idx) => (
											<Link
												className="shiny-button transition-100 bg-gray-900 hover:bg-gray-800 rounded-lg border border-glow-600 p-6 text-center no-underline hover:text-black"
												data-umami-event="creator link"
												data-umami-event-site={creator.site}
												href={'https://' + creator.site}
												key={idx}
											>
												<dt>
													<div
														aria-hidden="true"
														className="text-gray-400 mx-auto"
													/>
													<span className="mt-4 text-sm font-medium">
														{creator.name}
													</span>
												</dt>
												<dd className="text-gray-500 mt-1 text-sm">
													{creator.site}
												</dd>
											</Link>
										))}
									</dl>
								</section>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

async function getProject(title) {
	const res = await fetch(
		`https://breval-api.lightin.io/api/projets?filters[title][$eq]=${title}&populate=*`
	)
	const data = await res.json()

	if (!data) {
		return {
			props: { hasError: true },
		}
	}

	return data.data[0]
}
