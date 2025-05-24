import React from 'react'

import Link from 'next/link'
import { cx } from '@/utils'

const Tag = ({ link = '#', name, ...props }) => {
	return (
		<a
			className={cx(
				'ease inline-block rounded-full border-2 border-solid border-light px-6 py-2 text-sm font-semibold capitalize text-light no-underline transition-all duration-200 hover:scale-105 sm:px-10 sm:py-3 sm:text-base',
				props.className
			)}
			href={link}
		>
			{name}
		</a>
	)
}

export default Tag
