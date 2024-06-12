'use client'
import Markdown from 'react-markdown'
import React from 'react'

import rehypeRaw from 'rehype-raw'
import remarkMdx from 'remark-mdx'
import Image from 'next/image'

const mdxComponents = {
	Image,
}

const RenderMdx = ({ blog }) => {
	// const MDXContent = useMDXComponent(blog.body.code)

	return (
		<div
			className="prose sm:prose-base md:prose-lg col-span-12 max-w-max font-in lg:col-span-8"
			id="mdx-content"
		>
			<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkMdx]}>
				{blog.content}
			</Markdown>
		</div>
	)
}

export default RenderMdx
