import { render, screen } from '@testing-library/react'
import React from 'react'

import Category from '../Category' // Assuming Category.js is in ../

// Mock next/link
jest.mock('next/link', () => {
	return ({ children, href, ...rest }) => {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		)
	}
})

describe('Category Component', () => {
	const defaultProps = {
		link: '/test-category-link',
		name: 'TestCategory',
	}

	const baseClasses = [
		'm-2',
		'rounded-full',
		'border-2',
		'border-solid',
		'border-dark',
		'px-6', // Changed from px-10
		'py-1.5', // Changed from py-2
		'ease',
		// 'font-semibold', // Removed, not in component
		'no-underline', // Added
		'transition-all',
		'duration-200',
		'hover:scale-105',
		'md:px-10', // Added from component
		'md:py-2', // Added from component
		'inline-block', // Added
	]

	test('renders an anchor (<a>) tag', () => {
		render(<Category {...defaultProps} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toBeInTheDocument()
	})

	test('renders text content as "#<name>"', () => {
		render(<Category {...defaultProps} />)
		const linkElement = screen.getByText(`#${defaultProps.name}`)
		expect(linkElement).toBeInTheDocument()
	})

	test('sets the href attribute correctly from link prop', () => {
		render(<Category {...defaultProps} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveAttribute('href', defaultProps.link)
	})

	test('sets the href attribute to "#" if link prop is not provided', () => {
		render(<Category name={defaultProps.name} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveAttribute('href', '#')
	})

	test('applies active classes when active prop is true', () => {
		render(<Category {...defaultProps} active={true} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveClass('bg-black')
		expect(linkElement).toHaveClass('text-light')
		// Ensure inactive classes are not present
		expect(linkElement).not.toHaveClass('bg-light')
		expect(linkElement).not.toHaveClass('text-dark')
	})

	test('applies inactive classes when active prop is false', () => {
		render(<Category {...defaultProps} active={false} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveClass('bg-light')
		expect(linkElement).toHaveClass('text-dark')
		// Ensure active classes are not present
		expect(linkElement).not.toHaveClass('bg-black')
		expect(linkElement).not.toHaveClass('text-light')
	})

	test('applies inactive classes when active prop is not provided', () => {
		render(<Category {...defaultProps} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveClass('bg-light')
		expect(linkElement).toHaveClass('text-dark')
	})

	test('has all base classes applied', () => {
		render(<Category {...defaultProps} />)
		const linkElement = screen.getByRole('link')
		baseClasses.forEach(className => {
			expect(linkElement).toHaveClass(className)
		})
	})
})
