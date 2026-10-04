import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Hero from '@/components/Home/hero'
import fr from '@/lib/dictionaries/fr.json'
import siteMetaData from '@/utils/siteMetaData'

test('contact dialog supports keyboard dismissal and uses the configured email', async () => {
	render(<Hero dict={fr} />)
	const trigger = screen.getByRole('button', { name: fr.home.hero.ctaContact })
	fireEvent.click(trigger)
	const dialog = screen.getByRole('dialog')
	expect(dialog).toHaveAccessibleName(fr.home.hero.contactPopup.contactProtocolsActivated)
	expect(screen.getByRole('link', { name: new RegExp(siteMetaData.email) })).toHaveAttribute(
		'href',
		`mailto:${siteMetaData.email}`
	)
	fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
	await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
	expect(trigger).toHaveFocus()
})

test('project CTA is one link without a nested button', () => {
	render(<Hero dict={fr} />)
	const link = screen.getByRole('link', { name: fr.home.hero.ctaWork })
	expect(link).toHaveAttribute('href', '/projects')
	expect(link.querySelector('button')).toBeNull()
})
