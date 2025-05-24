import { render, screen } from '@testing-library/react'
import React from 'react'

import Tag from '../Tag'

describe('Tag Component', () => {
	test('renders an anchor tag with correct href and text content', () => {
		render(<Tag link="/test-link" name="Test Tag" />)
		const anchorElement = screen.getByRole('link')
		expect(anchorElement).toBeInTheDocument()
		expect(anchorElement).toHaveAttribute('href', '/test-link')
		expect(anchorElement).toHaveTextContent('Test Tag')
	})

	test('renders with default classes', () => {
		render(<Tag link="/test-link" name="Test Tag" />)
		const anchorElement = screen.getByRole('link')
		const expectedClasses = [
			'ease',
			'inline-block',
			'rounded-full',
			'border-2',
			'border-solid',
			'border-light',
			'px-6',
			'py-2',
			'text-sm',
			'font-semibold',
			'capitalize',
			'text-light',
			'no-underline',
			'transition-all',
			'duration-200',
			'hover:scale-105',
			'sm:px-10',
			'sm:py-3',
			'sm:text-base',
		]
		expectedClasses.forEach(className => {
			expect(anchorElement).toHaveClass(className)
		})
	})

	test('applies additional classes from className prop', () => {
		const additionalClass = 'my-custom-class'
		render(
			<Tag className={additionalClass} link="/test-link" name="Test Tag" />
		)
		const anchorElement = screen.getByRole('link')
		expect(anchorElement).toHaveClass(additionalClass)
	})

	test('renders with default href "#" when link prop is not provided', () => {
		render(<Tag name="Test Tag" />)
		const anchorElement = screen.getByRole('link')
		expect(anchorElement).toHaveAttribute('href', '#')
	})
})
