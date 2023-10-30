import Image from 'next/image'
import React from 'react'

export function Presentation() {
	return (
		<section
			className="relative z-30 box-border flex min-h-[100vh] w-full -translate-y-[25px]
			transform flex-col flex-wrap items-center justify-center
			bg-slate-900 px-4 2xl:px-0 snap-center snap-always"
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
										'animated-image z-10 w-auto rotate-2 rounded-2xl bg-transparent p-10 shadow-2xl bg-gradient-to-tl from-glow-500/60 to-glow-500/10'
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
								<div
									className={
										'animated-image-bg absolute h-[250px] w-[250px] rotate-2 rounded-2xl bg-glow-500 p-10 shadow-2xl'
									}
								></div>
							</div>
						</div>
						<div className="flex h-full flex-col items-start justify-center lg:order-first lg:row-span-2">
							<h3 className="text-4xl font-bold tracking-tight text-slate-200 lg:text-5xl">
								{`Hello, my name is `}
								<span className="text-glow-600">Bréval&nbsp;Le&nbsp;Floch</span>
							</h3>
							<div className="mt-6 space-y-7 text-base text-slate-300">
								<p>
									→ CTO of the start-up{' '}
									<a className="text-glow-500" href="https://formenu.fr">
										ForMenu
									</a>
									<br />→ Co-founder of{' '}
									<a className="text-glow-500" href="https://my-makeup.fr">
										My-Makeup
									</a>
									, a platform to reference makeup artists
									<br />→ Co-founder of{' '}
									<a className="text-glow-500" href="https://artriste.cc">
										Artriste
									</a>
									, an e-commerce website for art
									<br />→ Co-founder of{' '}
									<a className="text-glow-500" href="https://forhives.fr">
										ForHives
									</a>
									, the hub to our bees
								</p>
								<p>
									{`
										I'm a work-study student living in Nantes. From my youngest age, I am very
										fascinated by the infinite possibilities of computers and new technologies.
										`}
								</p>
								<p>
									{`
                                    As I continue to learn and explore this ever-evolving universe,
                                    I'm driven by my passion to discover new worlds and their new rules.
                                    `}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
