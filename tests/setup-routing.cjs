jest.mock('@/i18n/navigation', () => ({
	Link: require('next/link').default || require('next/link'),
	usePathname: jest.fn(() => '/'),
	useRouter: jest.fn(() => ({ replace: jest.fn(), push: jest.fn() })),
}))
