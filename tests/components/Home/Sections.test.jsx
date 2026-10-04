import { renderToStaticMarkup } from 'react-dom/server.node'
import About from '@/components/Home/about'
import Hero from '@/components/Home/hero'
import Journey from '@/components/Home/journey'
import Projects from '@/components/Home/projects'
import en from '@/lib/dictionaries/en.json'
import fr from '@/lib/dictionaries/fr.json'

describe.each([
	['English', en],
	['French', fr],
])('Home sections in %s', (_language, dict) => {
	test.each([
		['hero', Hero],
		['about', About],
		['journey', Journey],
		['projects', Projects],
	])('renders the real %s section on the server', (_name, Component) => {
		const html = renderToStaticMarkup(<Component dict={dict} />)
		expect(html).toContain('<section')
		expect(html).not.toContain('undefined')
	})
})
