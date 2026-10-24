import { slug } from 'github-slugger'
import { useFormatter, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// import ViewCounter from "./ViewCounter";

const BlogDetails = ({ slug: _blogSlug, blog }) => {
	const formatter = useFormatter()
	const t = useTranslations('common')
	return (
		<div className="pixel-corners flex flex-wrap items-center justify-around rounded-lg border border-border bg-card/50 px-2 py-2 text-lg font-medium text-foreground backdrop-blur-sm sm:text-xl md:px-10">
			<address className="author">
				{t('by')}{' '}
				<Link className="text-primary transition-colors hover:text-primary/80" href="/" rel="author">
					Bréval LE FLOCH
				</Link>
			</address>

			<p className="m-3 max-w-full overflow-hidden">
				{blog.tags.length > 1 &&
					blog.tags.map(tag => (
						<Link
							className="m-1 text-muted-foreground transition-colors hover:text-foreground"
							href={`/blog/categories/${slug(tag)}`}
							key={slug(tag)}
						>
							#{tag}
						</Link>
					))}
			</p>

			<p className="m-3">
				<time
					className="text-muted-foreground"
					dateTime={blog.publishedAt}
					pubdate="true"
					title={formatter.dateTime(new Date(blog.publishedAt), { dateStyle: 'long', timeStyle: 'short' })}
				>
					{formatter.dateTime(new Date(blog.publishedAt), { dateStyle: 'long', timeStyle: 'short' })}
				</time>
			</p>
		</div>
	)
}
export default BlogDetails
