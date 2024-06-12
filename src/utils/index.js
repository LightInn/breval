import { compareDesc, parseISO } from 'date-fns'

export const cx = (...classNames) => classNames.filter(Boolean).join(' ')

export const sortBlogs = blogs => {
	// Sort blogs by date, exemple de blog : [{title: "titre de l'article", description: "description de l'article", content: "contenu de l'article", publishedAt: "date de publication", updatedAt: "date de mise à jour", image: "image de l'article"}]
	// blog is a list of objects

	return blogs.sort((a, b) => {
		return compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
	})
}
