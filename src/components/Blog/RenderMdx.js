'use client'
// SEO Reminder: Authors should ensure that blog post content (Markdown) uses headings semantically.
// Only one H1 should exist per page (typically the main article title rendered by the template).
// Within the Markdown body, use H2-H6 for subheadings.
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
