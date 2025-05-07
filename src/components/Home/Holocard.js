'use client'
import React from 'react'

import { HoloCard } from 'special-card'

export default function Holocard({ imageSrc, height, radius, width }) {
	return (
		<>
			<HoloCard
				height={height}
				imageshinesrc="https://res.cloudinary.com/simey/image/upload/Dev/PokemonCards/illusion.webp"
				imageSrc={imageSrc}
				radius={radius}
				width={width}
			/>
		</>
	)
}
