'use client'
import {
	Exploded,
	Laptop,
	Loupe,
	Padlock,
	Query,
	Riffle,
	Terminal,
	Terrain,
	Turntable,
} from '@lucasmarkes/hairline/react'

const figures = {
	terrain: Terrain,
	projects: Exploded,
	project: Laptop,
	blog: Riffle,
	article: Terminal,
	artist: Turntable,
	privacy: Padlock,
	terms: Loupe,
	missing: Query,
}
export type FigureKind = keyof typeof figures
export default function HairlineFigure({ kind, label }: { kind: FigureKind; label: string }) {
	const Figure = figures[kind]
	return <Figure theme="auto" intensity={0.45} label={label} />
}
