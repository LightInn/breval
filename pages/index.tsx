import React from 'react'
import Head from 'next/head'
import { SocialIcons } from '../components/Social'
import 'animate.css/animate.min.css'
import { Title } from '../components/title'
import Image from 'next/image'
import Link from 'next/link'
import { Parallax } from 'react-parallax'
import { Navbar } from '../components/navbar'

export default function Home() {
	return (
		<div className="text-Sky-50 snap-y snap-proximity bg-slate-1000 font-varela-round">
			<Head>
				<title>Bréval LE FLOCH | Dev </title>
				<meta
					name="description"
					content="Portfolio de Bréval LE FLOCH, un développeur spécialisé dans le développement d'applications web et mobile sur Nantes."
				/>

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="canonical" href="https://brev.al/projet" key="canonical" />

				{/*@ts-ignore*/}
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Navbar />
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

						<Parallax
							blur={{ min: -35, max: 35 }}
							bgImage="/landing.webp"
							bgImageAlt="the cat"
							strength={100}
						>
							<div className="hidden h-[100vh] 2xl:block"></div>
						</Parallax>
						<Image
							src={'/landing.webp'}
							alt={''}
							className={
								'absolute left-0 top-0 ' +
								'mix-difference -z-10 block bg-slate-900 object-cover opacity-50 2xl:hidden'
							}
							fill={true}
							loading="eager"
						/>
					</div>
				</div>

				<SocialIcons />

				<div className="absolute bottom-0 left-0 mb-12 flex items-center justify-center p-8 xl:mb-0 xl:p-20">
					<h2 className="origin-bottom-left -rotate-90 font-body text-sm tracking-wider text-glow-500 opacity-20 xl:text-xl">
						‣ BRÉVAL LE FLOCH{' '}
					</h2>
				</div>
			</div>
			<section
				className="relative z-20 flex
      h-[30px] translate-y-[-25px] transform
      snap-start items-center justify-center
      rounded-t-full bg-slate-900 drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)]"
			>
				{/* @ts-ignore */}
				<hr className="w-[50px]" />

				{/*// Figure here*/}
			</section>
			<section
				className="relative z-30 box-border flex min-h-[100vh] w-full -translate-y-[30px]
			transform flex-col flex-wrap items-center justify-center
			bg-slate-900 px-4 py-20 text-sky-50 2xl:px-0"
			>
				<div className={'mx-auto h-full max-w-7xl'}>
					<div
						className={
							'w-full lg:flex lg:h-full lg:items-center lg:justify-center'
						}
					>
						<div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
							<div className="lg:pl-20">
								<div className="flex max-w-xs px-2.5 lg:max-w-none">
									<div
										className={
											'w-auto rotate-2 rounded-2xl bg-slate-800/30 p-10 shadow-2xl'
										}
									>
										<Image
											src={'/breval.png'}
											alt="Breval Le Floch Avatar"
											width={250}
											height={250}
											className="aspect-square object-cover object-center"
										/>
									</div>
								</div>
							</div>
							<div className="flex h-full flex-col items-start justify-center lg:order-first lg:row-span-2">
								<h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
									{`Bonjour, je m'appelle `}
									<span className="text-glow-500">
										Bréval&nbsp;Le&nbsp;Floch
									</span>
								</h1>
								<div className="mt-6 space-y-7 text-base text-slate-200">
									<p>
										{`
											→ CTO de la start-up ForMenu, 
										`}
										<br />
										{`
											→ Co-fondateur de la plateforme de mise en relation entre particuliers et maquilleuses professionnelles My-Makeup,
										`}
										<br />
										{`
											→ Co-fondateur de la plateforme e-commerce Artriste.cc,
										`}
										<br />
										{`
											→ Co-fondateur du groupe d'entrepreneurs ForHives,
										`}
									</p>
									<p>
										{`
										Je suis un étudiant en alternance qui habite à Nantes. Dès mon plus
										jeune âge, j'ai été fasciné par les possibilités infinies des
										ordinateurs et des nouvelles technologies.
										`}
									</p>
									<p>
										{`
										Alors que je continue
										d'apprendre et d'explorer cet univers en constant évolution, je suis
										motivé par ma passion de découvrir de nouveaux mondes et leurs
										nouvelles règles et mes rêves.
										`}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				className="relative z-20 box-border flex
      h-[100vh] w-full -translate-y-[30px] transform snap-start
      flex-col flex-wrap items-start justify-center pb-[30px] text-sky-50"
			>
				<div className={'absolute -z-10 h-full w-full'}>
					<Image
						src={'/projets.png'}
						alt={''}
						className={
							'absolute left-0 top-0 ' +
							'mix-difference -z-10 bg-slate-1000 object-cover opacity-50 '
						}
						fill={true}
						loading="eager"
					/>
					<div
						className={
							'mask-image absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#000101] via-[#000101] to-transparent'
						}
					/>
					<div
						className={
							'mask-image-bottom absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#000101] via-[#000101] to-transparent'
						}
					/>
				</div>

				<h2 className="animate__animated animate__fadeInDown z-10 mx-12 text-xl font-medium lg:mx-80 xl:text-3xl">
					{' '}
					Galerie de projets
				</h2>
				<Link
					type="button"
					className="mx-12 my-12 inline-flex items-center rounded-full border border-transparent bg-glow-500 px-6 py-3 font-medium
                    text-black shadow-sm hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:ring-offset-2 lg:mx-80"
					href={'/projet'}
				>
					Mes projets
				</Link>
			</section>
		</div>
	)
}
