import BlogLayoutThree from '/src/components/Blog/BlogLayoutThree'
import Categories from '/src/components/Blog/Categories'
import getAllBlogs from '/src/services/blog.services'

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

export async function generateMetadata(props) {
	const params = await props.params
	const category =
		params.slug === 'all' ? 'web development' : params.slug.replace(/-/g, ' ')
	return {
		description: `Learn more about ${category} through my collection of expert blogs and tutorials`,
		title: `${category.charAt(0).toUpperCase() + category.slice(1)} Category`,
	}
}

export async function generateStaticParams() {
	const allBlogs = await getAllBlogs()
	const categories = new Set(['all'])

	allBlogs.forEach(blog => {
		if (blog.isPublished) {
			blog.tags.forEach(tag => {
				categories.add(slugify(tag))
			})
		}
	})

	return Array.from(categories).map(slug => ({ slug }))
}

const CategoryPage = async props => {
	const params = await props.params
	const allBlogs = await getAllBlogs()
	const allCategories = new Set(['all'])

	allBlogs.forEach(blog => {
		blog.tags.forEach(tag => {
			allCategories.add(slugify(tag))
		})
	})

	const sortedCategories = Array.from(allCategories).sort()

	const blogs = allBlogs.filter(
		blog =>
			params.slug === 'all' ||
			blog.tags.some(tag => slugify(tag) === params.slug)
	)

	return (
		<article className="text-dark mt-12 flex flex-col">
			<div className="flex flex-col px-5 sm:px-10 md:px-24 sxl:px-32">
				<h1 className="mt-6 text-2xl font-semibold md:text-4xl lg:text-5xl">
					#{params.slug}
				</h1>
				<span className="mt-2 inline-block">
					Discover more categories and expand your knowledge!
				</span>
			</div>
			<Categories categories={sortedCategories} currentSlug={params.slug} />
			<div className="mt-5 grid grid-cols-1 grid-rows-2 gap-16 px-5 sm:mt-10 sm:grid-cols-2 sm:px-10 md:mt-24 md:px-24 lg:grid-cols-3 sxl:mt-32 sxl:px-32">
				{blogs.map((blog, index) => (
					<article
						className="relative col-span-1 row-span-1"
						key={blog.id || index}
					>
						<BlogLayoutThree blog={blog} />
					</article>
				))}
			</div>
		</article>
	)
}

export default CategoryPage
