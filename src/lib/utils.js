// TODO delete: Potentially redundant. Equivalent `cn` function exists in `src/utils/index.js`.
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}
