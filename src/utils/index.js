import { compareDesc, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export const cx = (...classNames) => classNames.filter(Boolean).join(' ')

export const sortBlogs = blogs => {
	// Sort blogs by date, example blog: [{title: "article title", description: "article description", content: "article content", publishedAt: "publication date", updatedAt: "update date", image: "article image"}]
	// blog is a list of objects

	return blogs.sort((a, b) => {
		return compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
	})
}

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}
