import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Playground } from '../Playground' // Corrected to named import

// Mock next/image
jest.mock('next/image', () => ({
	default: ({ src, alt, ...restOfProps }) => {
		return (
			<img alt={alt} src={src} {...restOfProps} data-testid="next-image-mock" />
		)
	},
	__esModule: true,
}))

describe('Playground Component', () => {
	const mockSetReload = jest.fn()
	const defaultPalette = {
		vibrantLight: 'rgb(255, 0, 0)',
		mutedLight: 'rgb(255, 255, 0)',
		vibrantDark: 'rgb(0, 0, 255)',
		mutedDark: 'rgb(255, 0, 255)',
		vibrant: 'rgb(0, 255, 0)',
		muted: 'rgb(0, 255, 255)',
	}

	const defaultProps = {
		setReload: mockSetReload,
		palette: defaultPalette,
		// image prop will be tested with and without providing it
	}

	beforeEach(() => {
		mockSetReload.mockClear()
	})

	test('renders introductory text elements', () => {
		render(<Playground {...defaultProps} />)
		expect(
			screen.getByText("Everything looks oddly colored here, doesn't it?")
		).toBeInTheDocument()
		expect(
			screen.getByText(/The color theme is generated dynamically/)
		).toBeInTheDocument()
	})

	test('renders "Actual Theme" text (as a p tag)', () => {
		render(<Playground {...defaultProps} />)
		const actualThemeText = screen.getByText('Actual Theme')
		expect(actualThemeText).toBeInTheDocument()
		expect(actualThemeText.tagName).toBe('P') // Verify it's a paragraph
	})

	test('renders the six theme color display boxes with names and correct background colors', () => {
		render(<Playground {...defaultProps} />)
		const colorBoxNames = [
			'Vibrant Light',
			'Vibrant',
			'Vibrant Dark',
			'Muted Light',
			'Muted',
			'Muted Dark',
		]
		colorBoxNames.forEach(name => {
			const colorBoxElement = screen.getByText(name) // The div itself contains the text
			expect(colorBoxElement).toBeInTheDocument()
			// Check for the class name instead of computed style
			const expectedClassName = `bg-dynamic-${name.toLowerCase().replace(' ', '-')}`
			expect(colorBoxElement).toHaveClass(expectedClassName)
		})
	})

	test('renders the next/image (mocked) with default src if image prop is not provided', () => {
		render(<Playground {...defaultProps} />)
		const imgElement = screen.getByTestId('next-image-mock')
		expect(imgElement).toBeInTheDocument()
		expect(imgElement).toHaveAttribute('src', '/dynamic/0.webp') // Default src
	})

	test('renders the next/image (mocked) with provided src from image prop', () => {
		const customImageSrc = '/custom-image.webp'
		render(<Playground {...defaultProps} image={customImageSrc} />)
		const imgElement = screen.getByTestId('next-image-mock')
		expect(imgElement).toBeInTheDocument()
		expect(imgElement).toHaveAttribute('src', customImageSrc)
	})

	test('renders "Reload Page" button', () => {
		render(<Playground {...defaultProps} />)
		expect(
			screen.getByRole('button', { name: /Reload Page/i })
		).toBeInTheDocument()
	})

	test('calls setReload function when "Reload Page" button is clicked', () => {
		render(<Playground {...defaultProps} />)
		const reloadButton = screen.getByRole('button', { name: /Reload Page/i })
		fireEvent.click(reloadButton)
		expect(mockSetReload).toHaveBeenCalledTimes(1)
	})
})
