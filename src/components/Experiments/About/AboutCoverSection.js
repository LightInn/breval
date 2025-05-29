import React from 'react'

import Link from 'next/link'

import {
	DiscordIcon,
	EmailIcon,
	GithubIcon,
	LinkedinIcon,
	TwitterIcon,
} from '@/components/Icons'
import { ReloadCTA } from '@/components/Experiments/About/ReloadCTA'

import Avatar from '/src/components/Experiments/About/Avatar'

const AboutCoverSection = ({ background = null, setReload = null }) => {
	return (
		<section className="text-dark bg-dynamic-bg flex h-screen w-screen flex-col items-center justify-center overflow-visible bg-cover md:flex-row">
			<div className="flex h-full w-full flex-col-reverse items-center justify-center gap-4 overflow-visible p-20 backdrop-blur-lg xl:flex-row xl:justify-evenly">
				<div className="flex w-full flex-col items-center justify-center md:w-1/4 md:items-end">
					<h2 className="md:message-bulle text-center text-4xl font-bold capitalize text-white md:rounded-2xl md:bg-white/30 md:p-6 md:text-6xl lg:text-right">
						Hi, I&apos;m <br />
						<strong>Bréval</strong>.
					</h2>
					<p className="md:message-bulle font-medium capitalize text-white md:mt-8 md:rounded-2xl md:bg-white/30 md:p-20 md:text-right md:text-2xl">
						I&apos;m a creative developer <br />
						from France, Loire Atlantique.
					</p>

					<div className="mt-20 flex h-full w-full gap-2 p-2">
						<Link
							aria-label="Github"
							className="h-full w-full delay-500"
							data-umami-event="about social"
							data-umami-event-social="Github"
							href="https://github.com/LightInn/"
							rel="noreferrer noopener"
							target="_blank"
							title="Github"
						>
							<GithubIcon className="md:message-bulle bg-dynamic-vibrant-light hover:bg-dynamic-muted-light w-[30px] rounded-2xl p-2" />
							{/*<DribbbleIcon*/}
							{/*    className="w-[30px] rounded-2xl bg-dynamic-vibrant-light hover:bg-dynamic-muted-light p-2 md:message-bulle"/>*/}
						</Link>
						<Link
							aria-label="Linkedin"
							className="h-full w-full"
							data-umami-event="about social"
							data-umami-event-social="Linkedin"
							href="https://www.linkedin.com/in/breval-lefloch/"
							rel="noreferrer noopener"
							target="_blank"
							title="Linkedin"
						>
							<LinkedinIcon className="md:message-bulle bg-dynamic-vibrant-light hover:bg-dynamic-muted-light w-[30px] rounded-2xl p-2" />
						</Link>
						<Link
							aria-label="Twitter"
							className="h-full w-full"
							data-umami-event="about social"
							data-umami-event-social="Twitter"
							href="https://twitter.com/Unknow429523025"
							rel="noreferrer noopener"
							target="_blank"
							title="Twitter"
						>
							<TwitterIcon className="md:message-bulle bg-dynamic-vibrant-light hover:bg-dynamic-muted-light w-[30px] rounded-2xl p-2" />
						</Link>
						<Link
							aria-label="Email"
							className="h-full w-full"
							data-umami-event="about social"
							data-umami-event-social="Email"
							href="mailto:breval.lefloch@gmail.com"
							rel="noreferrer noopener"
							target="_blank"
							title="Email"
						>
							<EmailIcon className="md:message-bulle bg-dynamic-vibrant-light hover:bg-dynamic-muted-light w-[30px] rounded-2xl p-2" />
						</Link>
						<Link
							aria-label="Discord"
							className="h-full w-full"
							data-umami-event="about social"
							data-umami-event-social="Discord"
							href="https://discordapp.com/users/232064075553701888"
							rel="noreferrer noopener"
							target="_blank"
							title="Discord"
						>
							<DiscordIcon className="md:message-bulle bg-dynamic-vibrant-light hover:bg-dynamic-muted-light w-[30px] rounded-2xl p-2" />
						</Link>
						{/*Email*/}
						{/*Tel*/}
						{/*discord*/}
						{/*twitter*/}
						{/*insta*/}
					</div>

					<div className="hidden md:block">
						<ReloadCTA setReload={setReload} />
					</div>
				</div>
				<div className="h-full max-h-[35vh] w-full max-w-[35vw] overflow-visible 2xl:max-h-[80vh]">
					<Avatar />
				</div>
			</div>
		</section>
	)
}

export default AboutCoverSection
