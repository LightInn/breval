'use client'
import {HoloCard} from 'special-card'
import React from "react";


export default function Holocard({height, width, radius, imageSrc}) {
    return (
        <>
            <HoloCard
                height={height}
                width={width}
                radius={radius}
                imageSrc={imageSrc}
                imageShineSrc="https://res.cloudinary.com/simey/image/upload/Dev/PokemonCards/illusion.webp"
            />
        </>
    )
}