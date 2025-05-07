'use client'
import React, { useState } from 'react'

import { rgbDataURL } from '@/services/dataurl.services'
import Image from 'next/image'

function ImageWithFallback(props) {
	const { fallbackSrc, src, ...rest } = props
	const [imgSrc, setImgSrc] = useState(src)

	return (
		<Image
			{...rest}
			alt={'Image'}
			blurDataURL={rgbDataURL(231, 183, 202)}
			onError={e => {
				console.error(e)
				setImgSrc(fallbackSrc)
			}}
			placeholder="blur"
			src={imgSrc}
		/>
	)
}

export default ImageWithFallback
