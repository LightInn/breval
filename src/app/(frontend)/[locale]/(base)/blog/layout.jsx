import { cx } from '@/utils'
export const revalidate = 60
export default function RootLayout({ children }) {
	return <div className={cx('bg-light font-mr')}>{children}</div>
}
