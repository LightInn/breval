import React, { useEffect, useRef, useState } from 'react'

export function Title() {
	const [isLoading, setIsLoading] = useState(true)
	const titleRef = useRef(null)

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 2000)
	}, [])

	return (
		<h1
			className={`neon font-display z-20 text-4xl font-semibold uppercase tracking-widest text-slate-50 md:text-8xl`}
			data-text="BRÉVAL LE FlOCH"
			id="title-landing"
			ref={titleRef}
		>
			BRÉVAL LE FlOCH
		</h1>
	)
}
