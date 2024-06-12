import React from 'react'

import { slug } from 'github-slugger'

import Category from './Category'

const Categories = ({ currentSlug, categories }) => {
	return (
		<div className="text-dark border-dark mx-5 mt-10 flex flex-wrap items-start border-b-2 border-t-2 border-solid px-0 py-4 font-medium md:mx-10 md:px-10 sxl:px-20">
			{categories.map(cat => (
				<Category
					active={currentSlug === slug(cat)}
					key={cat}
					link={`/blog/categories/${cat}`}
					name={cat}
				/>
			))}
		</div>
	)
}

export default Categories
