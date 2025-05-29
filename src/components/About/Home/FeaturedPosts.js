import React from 'react'

import BlogLayoutTwo from '@/components/Blog/BlogLayoutTwo'

import BlogLayoutOne from '../../Blog/BlogLayoutOne'

import { sortBlogs } from '/src/utils'

const FeaturedPosts = ({ blogs }) => {
	const sortedBlogs = sortBlogs(blogs)
	return (
		<section className="sxl:px-32 mt-16 flex w-full flex-col items-center justify-center px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24">
			<h2 className="text-dark inline-block w-full text-2xl font-bold capitalize md:text-4xl">
				Featured Posts
			</h2>

			<div className="mt-10 grid grid-cols-2 grid-rows-2 gap-6 sm:mt-16">
				<article className="sxl:col-span-1 relative col-span-2 row-span-2">
					<BlogLayoutOne blog={sortedBlogs[1]} />
				</article>
				<article className="relative col-span-2 row-span-1 sm:col-span-1">
					<BlogLayoutTwo blog={sortedBlogs[2]} />
				</article>
				<article className="relative col-span-2 row-span-1 sm:col-span-1">
					<BlogLayoutTwo blog={sortedBlogs[3]} />
				</article>
			</div>
		</section>
	)
}

export default FeaturedPosts
