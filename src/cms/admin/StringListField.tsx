'use client'

import { useField, useTranslation } from '@payloadcms/ui'
import type { JSONFieldClientProps } from 'payload'
import { useId, useState } from 'react'
import { fieldLabel } from './labels'

export function StringListField({ path, field, readOnly }: JSONFieldClientProps) {
	const { value, setValue, errorMessage, showError } = useField<string[]>({ path })
	const { i18n } = useTranslation()
	const fr = i18n.language === 'fr'
	const id = useId()
	const [input, setInput] = useState('')
	const values = Array.isArray(value) ? value : []
	const label = fieldLabel(field.label, field.name, i18n.language)
	function add() {
		const next = input
			.split(',')
			.map(item => item.trim())
			.filter(Boolean)
		if (next.length) setValue([...new Set([...values, ...next])])
		setInput('')
	}
	return (
		<div className="studio-tags field-type">
			<label htmlFor={id}>{label}</label>
			<div className="studio-tags__input">
				{values.map(item => (
					<span key={item}>
						{item}
						{!readOnly && (
							<button
								type="button"
								aria-label={`${fr ? 'Supprimer' : 'Remove'} ${item}`}
								onClick={() => setValue(values.filter(value => value !== item))}
							>
								×
							</button>
						)}
					</span>
				))}
				<input
					id={id}
					value={input}
					readOnly={readOnly}
					onChange={event => setInput(event.target.value)}
					onBlur={add}
					placeholder={fr ? 'Ajouter un mot-clé…' : 'Add a keyword…'}
					onKeyDown={event => {
						if (event.key === 'Enter' || event.key === ',') {
							event.preventDefault()
							add()
						}
					}}
				/>
			</div>
			<small>
				{fr
					? 'Appuyez sur Entrée pour ajouter. Cliquez sur × pour supprimer.'
					: 'Press Enter to add. Click × to remove.'}
			</small>
			{showError && <p className="studio-field-error">{errorMessage}</p>}
		</div>
	)
}
