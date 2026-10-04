import { fireEvent, render, screen } from '@testing-library/react'
import Navigation from '@/components/Global/navigation'
import fr from '@/lib/dictionaries/fr.json'

const mockSetTheme = jest.fn()
jest.mock('next/navigation', () => ({ usePathname: () => '/projects' }))
jest.mock('next-themes', () => ({ useTheme: () => ({ resolvedTheme: 'dark', setTheme: mockSetTheme }) }))

test('theme button switches to light instead of displaying a disabled toast', () => {
	render(<Navigation dict={fr} />)
	fireEvent.click(screen.getByRole('button', { name: 'Light theme' }))
	expect(mockSetTheme).toHaveBeenCalledWith('light')
})

test('mobile menu announces its state and closes after selecting a route', () => {
	render(<Navigation dict={fr} />)
	const toggle = screen.getByRole('button', { name: fr.navigation.ariaOpenMenu })
	expect(toggle).toHaveAttribute('aria-expanded', 'false')
	fireEvent.click(toggle)
	expect(toggle).toHaveAttribute('aria-expanded', 'true')
	const links = screen.getAllByRole('link', { name: fr.navigation.projects })
	expect(links[0]).toHaveAttribute('aria-current', 'page')
	fireEvent.click(links[1])
	expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
