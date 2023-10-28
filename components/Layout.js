import parse, { domToReact } from 'html-react-parser'
import Image from 'next/image'

const options = {
	replace: domNode => {
		if (domNode?.type === 'tag' && domNode?.name === 'img') {
			const { attribs } = domNode
			const { src, alt, width, height } = attribs

			return <Image src={src} alt={alt} width={500} height={500} />
		}

		return domNode
	},
}

export function Layout({ value }) {
	console.log(value)
	const parsedContent = parse(value, options)

	return <>{parsedContent}</>
}
