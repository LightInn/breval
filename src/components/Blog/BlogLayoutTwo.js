import React from 'react'

import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { rgbDataURL } from '@/services/dataurl.services'

const BlogLayoutTwo = ({ blog }) => {
	return (
		<div className="text-slate-800 dark:text-slate-100 group grid grid-cols-12 items-center gap-4">
			<Link
				className="col-span-12 h-full overflow-hidden rounded-xl lg:col-span-4"
				href={'/blog/articles/' + blog.url}
			>
				<Image
					alt={blog.title}
					blurDataURL={rgbDataURL(231, 183, 202)}
					className="ease aspect-square h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
					height={1024}
					placeholder="blur"
					sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
					src={blog.image}
					width={1792}
				/>
			</Link>

			<div className="col-span-12 w-full lg:col-span-8">
				<span className="inline-block w-full text-xs font-semibold uppercase text-accent dark:text-pink-400 sm:text-sm">
					{blog.tags[0]}
				</span>
				<Link className="my-1 inline-block" href={'/blog/articles/' + blog.url}>
					<h2 className="text-base font-semibold capitalize sm:text-lg font-display">
						<span className="bg-gradient-to-r from-pink-500/50 to-pink-500/50 dark:from-pink-400/50 dark:to-pink-400/50 bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
							{blog.title}
						</span>
					</h2>
				</Link>

				<span className="inline-block w-full text-xs font-semibold capitalize text-gray-600 dark:text-gray-400 sm:text-base">
					{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}
				</span>
			</div>
		</div>
	)
}

export default BlogLayoutTwo
