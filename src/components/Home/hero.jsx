'use client'

import { ArrowUpRight, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import siteMetaData from '@/utils/siteMetaData'

export default function Hero({ dict }) {
	const hero = dict?.home?.hero
	return (
		<section className="portfolio-hero" aria-labelledby="hero-title">
			<div className="portfolio-shell grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
				<div>
					<p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
						{hero?.title || 'Creative Developer & Digital Craftsman'}
					</p>
					<h1 id="hero-title" className="hero-title font-semibold">
						BRÉVAL
						<br />
						<span className="text-primary">LE FLOCH</span>
					</h1>
					<p className="mb-8 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						{hero?.description ||
							'CTO of ForMenu, Co-founder of multiple startups, and passionate about exploring the infinite possibilities of technology and creative development.'}
					</p>
					<div className="flex flex-wrap gap-3">
						<Button asChild size="lg" className="rounded-lg">
							<Link href="/projects">
								{hero?.ctaWork || 'View My Work'}
								<ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
							</Link>
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button size="lg" variant="outline" className="rounded-lg">
									{hero?.ctaContact || 'Get In Touch'}
								</Button>
							</DialogTrigger>
							<DialogContent className="w-[calc(100%_-_2rem)] rounded-xl p-8">
								<DialogTitle className="pr-6 text-2xl">
									{hero?.contactPopup?.contactProtocolsActivated || 'Contact Protocols Activated!'}
								</DialogTitle>
								<DialogDescription>
									{hero?.contactPopup?.beepBoop || '*Beep boop* Initializing human communication channels...'}
								</DialogDescription>
								<a className="contact-link" href={`mailto:${siteMetaData.email}`}>
									<Mail aria-hidden="true" className="h-5 w-5 text-primary" />
									<span>
										{hero?.contactPopup?.electronicMail || 'Electronic Mail'}
										<span className="block text-sm text-muted-foreground">{siteMetaData.email}</span>
									</span>
									<ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
								</a>
								<a
									className="contact-link"
									href="https://linkedin.com/in/breval-lefloch"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Linkedin aria-hidden="true" className="h-5 w-5 text-primary" />
									<span>{hero?.contactPopup?.linkedInPortal || 'LinkedIn Portal'}</span>
									<ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
								</a>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border sm:aspect-[5/4] lg:aspect-[4/5]">
					<Image
						src="/home/blured_video_frame.webp"
						alt=""
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 45vw"
						className="object-cover object-[65%_center]"
					/>
				</div>
			</div>
		</section>
	)
}
