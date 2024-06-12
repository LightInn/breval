import React from 'react'

import Link from 'next/link'

import BlogLayoutThree from '../../Blog/BlogLayoutThree'

import { sortBlogs } from '/src/utils'

const RecentPosts = ({ blogs }) => {
	const sortedBlogs = sortBlogs(blogs)
	return (
		<section className="mt-16 flex w-full flex-col items-center justify-center px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24 sxl:px-32">
			<div className="flex w-full justify-between">
				<h2 className="text-dark inline-block w-fit text-2xl font-bold capitalize md:text-4xl">
					Recent Posts
				</h2>
				<Link
					className="inline-block text-base font-medium text-accent underline underline-offset-2 md:text-lg"
					href="/blog/categories/all"
				>
					view all
				</Link>
			</div>

			<div className="mt-16 grid grid-cols-1 grid-rows-2 gap-16 sm:grid-cols-2 lg:grid-cols-3">
				{sortedBlogs.slice(4, 10).map((blog, index) => {
					return (
						<article className="relative col-span-1 row-span-1" key={index}>
							<BlogLayoutThree blog={blog} />
						</article>
					)
				})}
			</div>
		</section>
	)
}

export default RecentPosts
