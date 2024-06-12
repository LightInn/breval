import React from 'react'

import { format, parseISO } from 'date-fns'
import { slug } from 'github-slugger'
import Link from 'next/link'
// import ViewCounter from "./ViewCounter";

const BlogDetails = ({ slug: blogSlug, blog }) => {
	return (
		<div className="text-dark mx-5 flex flex-wrap items-center justify-around rounded-lg bg-accent px-2 py-2 text-lg font-medium sm:text-xl md:mx-10 md:px-10">
			<address className="author">
				By{' '}
				<a href="/" rel="author">
					Bréval LE FLOCH
				</a>
			</address>

			<p className="m-3 max-w-full overflow-hidden">
				{blog.tags.length > 1 &&
					blog.tags.map(tag => (
						<Link
							className="m-1"
							href={`/blog/categories/${slug(tag)}`}
							key={slug(tag)}
						>
							#{tag}
						</Link>
					))}
			</p>

			<p className="m-3">
				<time
					dateTime={parseISO(blog.publishedAt)}
					pubdate
					title={format(parseISO(blog.publishedAt), 'LLLL d, yyyy, h:mm a')}
				>
					{format(parseISO(blog.publishedAt), 'LLLL d, yyyy, h:mm a')}
				</time>
			</p>
		</div>
	)
}

export default BlogDetails
