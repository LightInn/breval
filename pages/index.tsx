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
      h-[30px] translate-y-[-30px] transform
      snap-start items-center justify-center rounded-t-full bg-slate-900 drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)]"
			>
				{/* @ts-ignore */}
				<hr className="w-[50px]" />

				{/*// Figure here*/}
			</section>

			<section
				className="z-20 box-border flex h-[100vh] w-full snap-start
      flex-col flex-wrap items-center justify-center bg-slate-900
      text-sky-50  "
			>
				<h2 className="animate__animated animate__fadeInDown m-8 text-xl font-medium xl:text-3xl">
					Bonjour, je m'appelle
					<span className="text-glow-500">&nbsp; Bréval Le Floch</span>
				</h2>
				<p
					className="text-2xs animate__animated animate__fadeInUp m-8 lg:max-w-screen-lg
                 xl:m-[150px] xl:text-xl"
				>
					Je suis un étudiant en alternance qui habite à Nantes. Dès mon plus
					jeune âge, j'ai été fasciné par les possibilités infinies des
					ordinateurs et des nouvelles technologies. Alors que je continue
					d'apprendre et d'explorer cet univers en constant évolution, je suis
					motivé par ma passion de découvrir de nouveaux mondes et leurs
					nouvelles règles et mes rêves."
				</p>
			</section>

			<section
				className=" relative z-10 z-20 box-border flex
      h-[100vh] w-full snap-start flex-col flex-wrap
      items-start justify-center text-sky-50"
			>
				<div className={'absolute -z-10 h-full w-full'}>
					<Image
						src={'/projets.png'}
						alt={''}
						className={
							'absolute left-0 top-0 ' +
							'mix-difference -z-10 bg-slate-900 object-cover opacity-50 '
						}
						fill={true}
						loading="eager"
					/>
					<div
						className={
							'mask-image absolute left-0 top-0 h-full w-full bg-gradient-to-r from-black via-[#000000] to-transparent'
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
                    text-black text-black shadow-sm hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:ring-offset-2 lg:mx-80"
					href={'/projet'}
				>
					Mes projets
				</Link>
			</section>
		</div>
	)
}
