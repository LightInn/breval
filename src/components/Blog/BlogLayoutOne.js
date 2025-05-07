import React from 'react'

import { rgbDataURL } from '@/services/dataurl.services'
import { slug } from 'github-slugger'
import Image from 'next/image'
import Link from 'next/link'

import Tag from '../Elements/Tag'

const BlogLayoutOne = ({ blog }) => {
	return (
		<div className="group inline-block overflow-hidden rounded-xl">
			<div className="to-dark/90 absolute bottom-0 left-0 right-0 top-0 z-10 rounded-xl bg-gradient-to-b from-transparent from-0%" />
			<Image
				alt={blog.title}
				blurDataURL={rgbDataURL(231, 183, 202)}
				className="ease w-full rounded-xl object-cover object-center transition-all duration-300 group-hover:scale-105"
				height={1080}
				placeholder="blur"
				sizes="(max-width: 1920px) 100vw, 55vw"
				src={blog.image}
				width={1920}
			/>

			<div className="absolute bottom-0 z-20 h-full w-full p-4 xs:p-6 sm:p-10">
				<Tag
					className="!border px-6 py-1 text-xs sm:py-2 sm:text-sm"
					link={`/blog/categories/${slug(blog.tags[0])}`}
					name={blog.tags[0]}
				/>
				<Link className="mt-6 no-underline" href={'/blog/articles/' + blog.url}>
					<h2 className="mt-2 text-sm font-bold capitalize text-light xs:text-base sm:mt-4 sm:text-xl md:text-2xl">
						<span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
							{blog.title}
						</span>
					</h2>
				</Link>
			</div>
		</div>
	)
}

export default BlogLayoutOne
