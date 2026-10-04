'use client'

import hljs from 'highlight.js'
import { useEffect } from 'react'
import 'highlight.js/styles/panda-syntax-dark.min.css'
export default function Highlight() {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			hljs.highlightAll()
		}
	}, []) // The empty array means this effect runs once after the first render

	return null
}
