import React from 'react'

import Category from './Category'

const slugify = text => {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Remplace les espaces par des tirets
		.replace(/[^\w\-]+/g, '') // Retire les caractères non-alphanumériques
		.replace(/\-\-+/g, '-') // Remplace plusieurs tirets par un seul tiret
		.replace(/^-+/, '') // Retire les tirets en début de chaîne
		.replace(/-+$/, '') // Retire les tirets en fin de chaîne
}

const Categories = ({ currentSlug, categories }) => {
	return (
		<div className="text-dark border-dark sxl:px-20 mx-5 mt-10 flex flex-wrap items-start border-b-2 border-t-2 border-solid px-0 py-4 font-medium md:mx-10 md:px-10">
			{categories.map(cat => (
				<Category
					active={currentSlug === slugify(cat)}
					key={slugify(cat)}
					link={`/blog/categories/${slugify(cat)}`}
					name={slugify(cat)}
				/>
			))}
		</div>
	)
}

export default Categories
