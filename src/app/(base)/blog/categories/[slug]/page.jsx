const pattern1 = /\s+/g
const pattern2 = /[^\w-]+/g
const pattern3 = /--+/g
const pattern4 = /^-+/
const pattern5 = /-+$/
const pattern6 = /-/g

import BlogLayoutThree from '/src/components/Blog/BlogLayoutThree'
import Categories from '/src/components/Blog/Categories'
import getAllBlogs from '/src/services/blog.services'

const slugify = text => {
	return text
		.toString()
		.toLowerCase()
		.replace(pattern1, '-') // Remplace les espaces par des tirets
		.replace(pattern2, '') // Retire les caractères non-alphanumériques
		.replace(pattern3, '-') // Remplace plusieurs tirets par un seul tiret
		.replace(pattern4, '') // Retire les tirets en début de chaîne
		.replace(pattern5, '') // Retire les tirets en fin de chaîne
}
export async function generateMetadata(props) {
	const params = await props.params
	const category = params.slug === 'all' ? 'web development' : params.slug.replace(pattern6, ' ')
	return {
		description: `Learn more about ${category} through my collection of expert blogs and tutorials`,
		title: `${category.charAt(0).toUpperCase() + category.slice(1)} Category`,
	}
}
export async function generateStaticParams() {
	const allBlogs = await getAllBlogs()
	const categories = new Set(['all'])
	for (const blog of allBlogs) {
		if (blog.isPublished) {
			for (const tag of blog.tags) {
				categories.add(slugify(tag))
			}
		}
	}
	return Array.from(categories).map(slug => ({
		slug,
	}))
}
const CategoryPage = async props => {
	const params = await props.params
	const allBlogs = await getAllBlogs()
	const allCategories = new Set(['all'])
	for (const blog of allBlogs) {
		for (const tag of blog.tags) {
			allCategories.add(slugify(tag))
		}
	}
	const sortedCategories = Array.from(allCategories).sort()
	const blogs = allBlogs.filter(blog => params.slug === 'all' || blog.tags.some(tag => slugify(tag) === params.slug))
	return (
		<article className="text-dark mt-12 flex flex-col">
			<div className="sxl:px-32 flex flex-col px-5 sm:px-10 md:px-24">
				<h1 className="mt-6 text-2xl font-semibold md:text-4xl lg:text-5xl">#{params.slug}</h1>
				<span className="mt-2 inline-block">Discover more categories and expand your knowledge!</span>
			</div>
			<Categories categories={sortedCategories} currentSlug={params.slug} />
			<div className="sxl:mt-32 sxl:px-32 mt-5 grid grid-cols-1 grid-rows-2 gap-16 px-5 sm:mt-10 sm:grid-cols-2 sm:px-10 md:mt-24 md:px-24 lg:grid-cols-3">
				{blogs.map((blog, index) => (
					<article className="relative col-span-1 row-span-1" key={blog.id || index}>
						<BlogLayoutThree blog={blog} />
					</article>
				))}
			</div>
		</article>
	)
}
export default CategoryPage
