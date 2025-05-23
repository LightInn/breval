import { render, screen } from '@testing-library/react'
import React from 'react'

import Logo from '../Logo' // Adjust the import path based on your actual Logo component location

// Mock next/link
jest.mock('next/link', () => {
	return ({ children, href }) => {
		return (
			<a alt="logo" href={href}>
				{children}
			</a>
		)
	}
})

// Mock useThemeSwitch hook if it's used in Logo or its children
jest.mock('@/components/Hooks/useThemeSwitch', () => ({
	default: () => ({
		setMode: jest.fn(),
		mode: 'light', // Provide a default mock value
	}),
	__esModule: true,
}))

// Mock next/image
jest.mock('next/image', () => ({
	default: props => {
		return <img {...props} />
	},
	__esModule: true,
}))

describe('Logo Component', () => {
	it('renders the logo text', () => {
		render(<Logo />)
		// Adjust the expected text if your Logo component renders something different
		// This is a basic example, you might want to check for an image, link, etc.
		const logoElement = screen.getByText(/Bréval Le FLOCH/i) // Corrected text matcher
		expect(logoElement).toBeInTheDocument()
	})

	it('renders a link to the homepage', () => {
		render(<Logo />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveAttribute('href', '/')
	})
})
