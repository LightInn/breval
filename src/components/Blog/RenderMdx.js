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
			className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-slate dark:prose-invert max-w-none text-foreground"
			id="mdx-content"
		>
			<Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkMdx]}>
				{blog.content}
			</Markdown>
		</div>
	)
}

export default RenderMdx
