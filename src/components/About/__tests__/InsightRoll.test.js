import { render, screen } from '@testing-library/react'
import React from 'react'

import InsightRoll from '../InsightRoll'

describe('InsightRoll Component', () => {
	const mockInsights = ['Insight 1', 'Insight 2', 'Insight 3']

	test('renders all insight strings', () => {
		render(<InsightRoll insights={mockInsights} />)
		mockInsights.forEach(insight => {
			expect(screen.getByText(insight)).toBeInTheDocument()
		})
	})

	test('main container div has correct classes', () => {
		render(<InsightRoll insights={mockInsights} />)
		const mainContainer = screen.getByText(mockInsights[0]).parentElement
			.parentElement // Get the main container
		const expectedClasses = [
			'w-full',
			'overflow-hidden',
			'whitespace-nowrap',
			'bg-accent',
			'text-light',
		]
		expectedClasses.forEach(className => {
			expect(mainContainer).toHaveClass(className)
		})
	})

	test('inner div has correct classes', () => {
		render(<InsightRoll insights={mockInsights} />)
		const innerDiv = screen.getByText(mockInsights[0]).parentElement // Get the inner div
		const expectedClasses = [
			'flex',
			'w-full',
			'animate-roll',
			'items-center',
			'justify-center',
			'py-2',
			'text-sm',
			'font-semibold',
			'capitalize',
			'tracking-wider',
			'sm:py-3',
			'sm:text-base',
		]
		expectedClasses.forEach(className => {
			expect(innerDiv).toHaveClass(className)
		})
	})

	test('renders separator span " | " between insights', () => {
		render(<InsightRoll insights={mockInsights} />)
		const innerDiv = screen.getByText(mockInsights[0]).parentElement
		const separators = innerDiv.querySelectorAll('span.px-4') // Assuming separator has 'px-4' class

		// Check if the number of separators is one less than the number of insights
		// or equal if the implementation adds a separator after the last insight as well.
		// The current implementation in InsightRoll.js adds a separator after each insight,
		// including the last one, due to the map function structure.
		expect(separators.length).toBe(mockInsights.length)

		separators.forEach(separator => {
			expect(separator.textContent.trim()).toBe('|')
		})
	})
})
