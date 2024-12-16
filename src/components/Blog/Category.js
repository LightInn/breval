import React from 'react'

import Link from 'next/link'

import { cx } from '/src/utils'

const Category = ({ link = '#', active, name, ...props }) => {
	return (
		<a
			className={cx(
				'border-dark ease m-2 inline-block rounded-full border-2 border-solid px-6 py-1.5 no-underline transition-all duration-200 hover:scale-105 md:px-10 md:py-2',
				props.className,
				active ? 'bg-black text-light' : 'text-dark bg-light'
			)}
			href={link}
		>
			#{name}
		</a>
	)
}

export default Category
