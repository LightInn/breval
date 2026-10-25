import { cx } from '@/utils'
export default function RootLayout({ children }) {
	return <div className={cx('bg-light font-mr')}>{children}</div>
}
