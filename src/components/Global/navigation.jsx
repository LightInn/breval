'use client'
import { Menu, X } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import BrandMark from '@/components/Global/brand-mark'
import LocaleSwitcher from '@/components/Global/locale-switcher'
import ThemeSwitcher from '@/components/Global/theme-switcher'
import { Button } from '@/components/ui/button'
import { Link, usePathname } from '@/i18n/navigation'
export default function Navigation({ dict }) {
	const [open, setOpen] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const pathname = usePathname()
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])
	const items = [
		{ href: '/', name: dict.navigation.home },
		{ href: '/projects', name: dict.navigation.projects },
		{ href: '/blog', name: dict.navigation.blog },
		{ href: '/artist', name: dict.navigation.art },
	]
	const active = href => (href === '/' ? pathname === '/' : pathname.startsWith(href))
	return (
		<header className="site-header" data-scrolled={scrolled}>
			<div className="site-header__surface">
				<nav aria-label={dict.navigation.primaryNavigation} className="site-header__bar">
					<Link href="/" aria-label="brev.al" className="site-header__brand" onClick={() => setOpen(false)}>
						<BrandMark className="h-8 w-12" />
					</Link>
					<div className="site-header__links">
						{items.map(item => (
							<Link key={item.href} href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
								{item.name}
							</Link>
						))}
					</div>
					<div className="site-header__tools">
						<Suspense fallback={<div className="h-9 w-24" />}>
							<LocaleSwitcher />
						</Suspense>
						<ThemeSwitcher />
						<Button
							className="site-header__menu"
							variant="ghost"
							size="icon"
							aria-controls="mobile-navigation"
							aria-expanded={open}
							aria-label={open ? dict.navigation.ariaCloseMenu : dict.navigation.ariaOpenMenu}
							onClick={() => setOpen(!open)}
						>
							{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</nav>
				{open && (
					<nav id="mobile-navigation" className="site-header__mobile" aria-label={dict.navigation.mobileNavigation}>
						{items.map(item => (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active(item.href) ? 'page' : undefined}
								onClick={() => setOpen(false)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				)}
			</div>
		</header>
	)
}
