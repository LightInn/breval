// import { allBlogs }    from "@/.contentlayer/generated";
import GithubSlugger, { slug } from 'github-slugger'

import BlogLayoutThree from '/src/components/Blog/BlogLayoutThree'
import Categories from '/src/components/Blog/Categories'
import getAllBlogs from '/src/services/blog.services'

const slugger = new GithubSlugger()

export async function generateStaticParams() {
	const allBlogs = await getAllBlogs()
	const categories = []
	const paths = [{ slug: 'all' }]

	allBlogs.map(blog => {
		if (blog.isPublished) {
			blog.tags.map(tag => {
				// let slugified = slugger.slug(tag);
				let slugified = tag
				if (!categories.includes(slugified)) {
					categories.push(slugified)
					paths.push({ slug: slugified })
				}
			})
		}
	})

	return paths
}

export async function generateMetadata({ params }) {
	return {
		description: `Learn more about ${params.slug === 'all' ? 'web development' : params.slug} through my collection of expert blogs and tutorials`,
		title: `${params.slug.replaceAll('-', ' ')} Category`,
	}
}

const CategoryPage = async ({ params }) => {
	const allBlogs = await getAllBlogs()
	// Separating logic to create list of categories from all blogs
	const allCategories = ['all'] // Initialize with 'all' category
	allBlogs.forEach(blog => {
		blog.tags.forEach(tag => {
			const slugified = slug(tag)
			if (!allCategories.includes(slugified)) {
				allCategories.push(slugified)
			}
		})
	})

	// Sort allCategories to ensure they are in alphabetical order
	allCategories.sort()

	// Step 2: Filter blogs based on the current category (params.slug)
	const blogs = allBlogs.filter(blog => {
		if (params.slug === 'all') {
			return true // Include all blogs if 'all' category is selected
		}
		return blog.tags.some(tag => slug(tag) === params.slug)
	})

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
			<Categories categories={allCategories} currentSlug={params.slug} />

			<div className="mt-5 grid grid-cols-1 grid-rows-2 gap-16 px-5 sm:mt-10 sm:grid-cols-2 sm:px-10 md:mt-24 md:px-24 lg:grid-cols-3 sxl:mt-32 sxl:px-32">
				{blogs.map((blog, index) => (
					<article className="relative col-span-1 row-span-1" key={index}>
						<BlogLayoutThree blog={blog} />
					</article>
				))}
			</div>
		</article>
	)
}

export default CategoryPage
