import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(base)/page'

// Mock child components
jest.mock('@/components/scroll-object-3d', () => () => (
	<div data-testid="mock-scroll-object-3d" />
))
jest.mock('@/components/loading-screen', () => () => (
	<div data-testid="mock-loading-screen" />
))
jest.mock('@/components/Home/hero', () => () => <div data-testid="mock-hero" />)
jest.mock('@/components/Home/about', () => () => (
	<div data-testid="mock-about" />
))
jest.mock('@/components/Home/projects', () => () => (
	<div data-testid="mock-projects" />
))
jest.mock('@/components/Home/journey', () => () => (
	<div data-testid="mock-journey" />
))
jest.mock('@/components/Home/svg-stickers', () => ({
	SectionDivider: jest.fn(({ direction }) => (
		<div data-testid={`mock-section-divider-${direction || 'default'}`} />
	)),
}))

describe('Home Page (src/app/page.jsx)', () => {
	beforeEach(() => {
		// Clear all mocks before each test if SectionDivider needs specific call counts per test
		jest.clearAllMocks()
	})

	test('renders the main page structure and all mocked child components', () => {
		render(<Home />)

		// Check for the main element
		const mainElement = screen.getByRole('main')
		expect(mainElement).toBeInTheDocument()

		// Check for the presence of mocked components
		expect(screen.getByTestId('mock-scroll-object-3d')).toBeInTheDocument()
		// Suspense fallback (LoadingScreen) might not be directly testable here if content loads immediately
		// expect(screen.getByTestId('mock-loading-screen')).toBeInTheDocument();
		expect(screen.getByTestId('mock-hero')).toBeInTheDocument()
		expect(screen.getByTestId('mock-about')).toBeInTheDocument()
		expect(screen.getByTestId('mock-projects')).toBeInTheDocument()
		expect(screen.getByTestId('mock-journey')).toBeInTheDocument()

		// Check for SectionDividers
		// The component renders 3 SectionDividers
		expect(screen.getByTestId('mock-section-divider-up')).toBeInTheDocument()
		expect(
			screen.getByTestId('mock-section-divider-default')
		).toBeInTheDocument()
		expect(screen.getByTestId('mock-section-divider-down')).toBeInTheDocument()

		// Verify SectionDivider mock was called 3 times (optional, but good for checking interactions)
		// const { SectionDivider } = jest.requireMock('@/components/Home/svg-stickers');
		// expect(SectionDivider).toHaveBeenCalledTimes(3);
	})

	test('main element has correct default classes', () => {
		render(<Home />)
		const mainElement = screen.getByRole('main')
		expect(mainElement).toHaveClass('relative')
		expect(mainElement).toHaveClass('min-h-screen')
		expect(mainElement).toHaveClass('bg-background')
		expect(mainElement).toHaveClass('text-foreground')
	})
})
