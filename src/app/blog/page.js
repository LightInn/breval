// import {allBlogs}       from '../../.contentlayer/generated/Blog/_index.mjs';
import HomeCoverSection from '@/components/About/Home/HomeCoverSection'
import FeaturedPosts from '@/components/About/Home/FeaturedPosts'
import RecentPosts from '@/components/About/Home/RecentPosts'

import getAllBlogs from '../../services/blog.services'

export const metadata = {
	description:
		'In this blog, I share my thoughts, my projects, my experiences and my knowledge about web and mobile development !',
	title: 'Bréval LE FLOCH | My Blog',
}

export default async function Home() {
	const allBlogs = await getAllBlogs()

	return (
		<main className="flex flex-col items-center justify-center">
			<HomeCoverSection blogs={allBlogs} />
			<FeaturedPosts blogs={allBlogs} />
			<RecentPosts blogs={allBlogs} />
		</main>
	)
}
