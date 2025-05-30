import React from 'react'

import { slug } from 'github-slugger'
import Image from 'next/image'
import Link from 'next/link'

import { rgbDataURL } from '@/services/dataurl.services'

import Tag from '../../../Elements/Tag'

import { sortBlogs } from '/src/utils'

const HomeCoverSection = ({ blogs }) => {
	const sortedBlogs = sortBlogs(blogs)
	const blog = sortedBlogs[0]

	return (
		<div className="inline-block w-full">
			<article className="relative mx-5 flex h-[60vh] flex-col items-start justify-end sm:mx-10 sm:h-[85vh]">
				<div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full rounded-3xl bg-gradient-to-b from-transparent from-0% to-black/90" />
				<Image
					alt={blog.title}
					blurDataURL={rgbDataURL(231, 183, 202)}
					className="h-full w-full rounded-3xl object-cover object-center"
					fill
					placeholder="blur"
					priority
					sizes="100vw"
					src={blog.image}
				/>

				<div className="text-light z-10 flex w-full flex-col items-start justify-center p-6 sm:p-8 md:p-12 lg:w-3/4 lg:p-16">
					<Tag
						link={`/blog/categories/${slug(blog.tags[0])}`}
						name={blog.tags[0]}
					/>
					<Link
						className="mt-6 no-underline"
						href={'/src/app/(base)/blog/articles/' + blog.url}
					>
						<h1 className="text-lg font-bold capitalize sm:text-xl md:text-3xl lg:text-4xl">
							<span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_6px]">
								{blog.title}
							</span>
						</h1>
					</Link>
					<p className="font-in mt-4 hidden sm:inline-block md:text-lg lg:text-xl">
						{blog.description}
					</p>
				</div>
			</article>
		</div>
	)
}

export default HomeCoverSection
