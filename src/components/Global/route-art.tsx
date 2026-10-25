'use client'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'
import type { FigureKind } from './hairline-figure'

const Figure = dynamic(() => import('./hairline-figure'), { ssr: false })
export default function RouteArt({ kind = 'terrain' }: { kind?: FigureKind }) {
	const locale = useLocale()
	return (
		<section
			className="route-art"
			data-figure={kind}
			aria-label={locale === 'fr' ? 'Étude interactive' : 'Interactive study'}
		>
			<div className="route-art__heading">
				<span aria-hidden="true">brev.al / {kind}</span>
				<p>{locale === 'fr' ? 'Une autre façon de voir les choses.' : 'Another way of looking at things.'}</p>
			</div>
			<div className="route-art__figure">
				<Figure
					kind={kind}
					label={
						locale === 'fr' ? 'Objet isométrique réagissant au pointeur' : 'Isometric object responding to the pointer'
					}
				/>
			</div>
		</section>
	)
}
