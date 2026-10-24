export function fieldLabel(label: unknown, name: string, language: string): string {
	if (typeof label === 'string') return label
	if (label && typeof label === 'object') {
		const labels = label as Record<string, string>
		return labels[language] || labels.en || name
	}
	return name
}
