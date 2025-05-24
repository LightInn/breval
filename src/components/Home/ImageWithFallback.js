'use client'
import React, { useState } from 'react'

import Image from 'next/image'

import { rgbDataURL } from '@/services/dataurl.services'

function ImageWithFallback(props) {
	const { alt = 'Image', fallbackSrc, src, ...rest } = props
	const [imgSrc, setImgSrc] = useState(src)

	return (
		<Image
			{...rest}
			alt={alt}
			blurDataURL={rgbDataURL(231, 183, 202)}
			onError={e => {
				setImgSrc(fallbackSrc)
			}}
			placeholder="blur"
			src={imgSrc}
		/>
	)
}

export default ImageWithFallback
