import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import ImageWithFallback from '../../Global/ImageWithFallback'

// Mock next/image
jest.mock('next/image', () => {
	return ({
		blurDataURL,
		placeholder,
		priority,
		onError,
		src,
		alt,
		...restOfProps
	}) => {
		// Strip Next.js specific props not valid on <img>
		return (
			<img
				alt={alt}
				onError={onError}
				src={src}
				{...restOfProps}
				data-testid="next-image-mock"
			/>
		)
	}
})

describe('ImageWithFallback Component', () => {
	const primarySrc = '/path/to/primary-image.jpg'
	const fallbackSrc = '/path/to/fallback-image.jpg'
	const altText = 'Test Image Alt'

	test('renders the next/image component (mocked as img)', () => {
		render(
			<ImageWithFallback
				alt={altText}
				fallbackSrc={fallbackSrc}
				src={primarySrc}
			/>
		)
		const imageElement = screen.getByRole('img')
		expect(imageElement).toBeInTheDocument()
		expect(imageElement).toHaveAttribute('data-testid', 'next-image-mock') // Ensure our mock is used
	})

	test('applies the provided alt attribute correctly', () => {
		render(
			<ImageWithFallback
				alt={altText}
				fallbackSrc={fallbackSrc}
				src={primarySrc}
			/>
		)
		const imageElement = screen.getByRole('img')
		expect(imageElement).toHaveAttribute('alt', altText)
	})

	test('applies default "Image" alt attribute when alt prop is not provided', () => {
		render(<ImageWithFallback fallbackSrc={fallbackSrc} src={primarySrc} />)
		const imageElement = screen.getByRole('img')
		expect(imageElement).toHaveAttribute('alt', 'Image')
	})

	test('uses the primary image source by default', () => {
		render(
			<ImageWithFallback
				alt={altText}
				fallbackSrc={fallbackSrc}
				src={primarySrc}
			/>
		)
		const imageElement = screen.getByRole('img')
		expect(imageElement).toHaveAttribute('src', primarySrc)
	})

	test('switches to fallbackSrc when onError is triggered', () => {
		render(
			<ImageWithFallback
				alt={altText}
				fallbackSrc={fallbackSrc}
				src={primarySrc}
			/>
		)
		const imageElement = screen.getByRole('img')

		// Check initial src
		expect(imageElement).toHaveAttribute('src', primarySrc)

		// Trigger the onError event
		fireEvent.error(imageElement)

		// Check if the src has changed to fallbackSrc
		expect(imageElement).toHaveAttribute('src', fallbackSrc)
	})
})
