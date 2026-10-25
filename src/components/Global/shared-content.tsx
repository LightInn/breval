'use client'
import { type ReactNode, ViewTransition } from 'react'

type Props = {
	kind: 'project' | 'article'
	id?: number | string
	part: 'image' | 'title' | 'summary'
	children: ReactNode
}
export default function SharedContent({ kind, id, part, children }: Props) {
	if (id == null) return children
	return (
		<ViewTransition
			name={`${kind}-${id}-${part}`}
			default="none"
			share={part === 'image' ? 'content-image' : 'content-text'}
		>
			{children}
		</ViewTransition>
	)
}
