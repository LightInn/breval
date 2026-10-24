import { Link } from '@/i18n/navigation'
import { cx } from '@/utils'

const Tag = ({ link = '#', name, ...props }) => {
	return (
		<Link
			className={cx(
				'pixel-corners inline-block rounded-full border-2 border-solid border-border bg-card/50 px-6 py-2 text-sm font-semibold capitalize text-foreground no-underline backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-primary/10 sm:px-10 sm:py-3 sm:text-base',
				props.className
			)}
			href={link}
		>
			{name}
		</Link>
	)
}
export default Tag
