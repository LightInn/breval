import React from 'react'

import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { rgbDataURL } from '@/services/dataurl.services'

const BlogLayoutThree = ({ blog }) => {
	return (
		<div className="text-dark group flex flex-col items-center">
			<Link
				className="h-full overflow-hidden rounded-xl"
				href={'/blog/articles/' + blog.url}
			>
				<Image
					alt={blog.title}
					blurDataURL={rgbDataURL(231, 183, 202)}
					className="ease aspect-[4/3] h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
					height={1024}
					placeholder="blur"
					sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
					src={blog.image}
					width={1792}
				/>
			</Link>

			<div className="mt-4 flex w-full flex-col">
				<span className="text-xs font-semibold uppercase text-accent sm:text-sm">
					{blog.tags[0]}
				</span>
				<Link className="my-1 inline-block" href={'/blog/articles/' + blog.url}>
					<h2 className="text-base font-semibold capitalize sm:text-lg">
						<span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_6px]">
							{blog.title}
						</span>
					</h2>
				</Link>

				<span className="text-gray text-sm font-semibold capitalize sm:text-base">
					{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}
				</span>
			</div>
		</div>
	)
}

export default BlogLayoutThree
