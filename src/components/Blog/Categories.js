const pattern1 = /\s+/g
const pattern2 = /[^\w-]+/g
const pattern3 = /--+/g
const pattern4 = /^-+/
const pattern5 = /-+$/

import Category from './Category'

const slugify = text => {
	return text
		.toString()
		.toLowerCase()
		.replace(pattern1, '-') // Replace spaces with hyphens
		.replace(pattern2, '') // Remove non-alphanumeric characters
		.replace(pattern3, '-') // Replace multiple hyphens with a single hyphen
		.replace(pattern4, '') // Remove hyphens from the beginning of the string
		.replace(pattern5, '') // Remove hyphens from the end of the string
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
