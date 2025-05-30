'use client'
import React, { useEffect, useState } from 'react'
import { usePalette } from 'react-palette'

import { createGlobalStyle } from 'styled-components'

import AboutCoverSection from '@/components/Experiments/About/AboutCoverSection'
import { Playground } from '@/components/Experiments/About/Playground'
import Navbar from '@/components/Experiments/About/Navbar'

import './App.css'


export default function About() {
	const bibiliothecqueDImage = [
		// "/experiments/about/dynamic/0.webp",
		'/experiments/about/dynamic/1.webp',
		'/experiments/about/dynamic/2.webp',
		'/experiments/about/dynamic/3.webp',
		'/experiments/about/dynamic/4.webp',
		'/experiments/about/dynamic/5.webp',
		'/experiments/about/dynamic/6.webp',
		'/experiments/about/dynamic/7.webp',
		'/experiments/about/dynamic/8.webp',
		'/experiments/about/dynamic/9.webp',
		'/experiments/about/dynamic/10.webp',
		'/experiments/about/dynamic/11.webp',
		'/experiments/about/dynamic/12.webp',
		'/experiments/about/dynamic/13.webp',
		'/experiments/about/dynamic/14.webp',
		'/experiments/about/dynamic/15.webp',
		'/experiments/about/dynamic/16.webp',
		'/experiments/about/dynamic/17.webp',
		'/experiments/about/dynamic/18.webp',
		'/experiments/about/dynamic/19.webp',
		'/experiments/about/dynamic/20.webp',
		'/experiments/about/dynamic/21.webp',
		'/experiments/about/dynamic/22.webp',
		'/experiments/about/dynamic/23.webp',
		'/experiments/about/dynamic/24.webp',
		'/experiments/about/dynamic/25.webp',
	]

	const [imgeUrl, setUrl] = useState('/experiments/about/dynamic/0.webp')

	const [reload, setReload] = useState(0)

	useEffect(() => {
		setUrl(
			bibiliothecqueDImage[
				Math.floor(Math.random() * bibiliothecqueDImage.length)
			]
		)
	}, [reload])

	const { data } = usePalette(imgeUrl)
	const AppStyle = createGlobalStyle`html {

        --bg-img: url(${imgeUrl});

        --vibrant: ${data.vibrant};
        --muted: ${data.muted};

        --vibrant-light: ${data.lightVibrant};
        --muted-light: ${data.lightMuted};

        --vibrant-dark: ${data.darkVibrant};
        --muted-dark: ${data.darkMuted};

    }`

	return (
		<div className="w-full">
			<AppStyle />
			<Navbar />

			<div className="">
				<AboutCoverSection data={data} setReload={setReload} />

				<Playground data={data} image={imgeUrl} setReload={setReload} />
			</div>
		</div>
	)
}
