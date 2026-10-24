'use client'

import { useField, useTranslation } from '@payloadcms/ui'
import type { TextareaFieldClientProps } from 'payload'
import { useId, useState } from 'react'
import Markdown from 'react-markdown'
import { fieldLabel } from './labels'

const whitespace = /\s+/

export function MarkdownField({ path, field, readOnly }: TextareaFieldClientProps) {
	const { value, setValue, errorMessage, showError } = useField<string>({ path })
	const { i18n } = useTranslation()
	const fr = i18n.language === 'fr'
	const id = useId()
	const [preview, setPreview] = useState(false)
	const label = fieldLabel(field.label, field.name, i18n.language)
	const text = value || ''
	return (
		<div className={`studio-editor field-type ${showError ? 'error' : ''}`}>
			<div className="studio-editor__heading">
				<label htmlFor={id}>{label}</label>
				<div className="studio-editor__tabs">
					<button type="button" aria-pressed={!preview} onClick={() => setPreview(false)}>
						{fr ? 'Écrire' : 'Write'}
					</button>
					<button type="button" aria-pressed={preview} onClick={() => setPreview(true)}>
						{fr ? 'Aperçu' : 'Preview'}
					</button>
				</div>
			</div>
			{preview ? (
				<div className="studio-editor__preview">
					<Markdown>{text || (fr ? '*Votre texte apparaîtra ici.*' : '*Your words will appear here.*')}</Markdown>
				</div>
			) : (
				<textarea
					id={id}
					value={text}
					onChange={event => setValue(event.target.value)}
					readOnly={readOnly}
					rows={12}
					placeholder={fr ? 'Une idée, quelques mots…' : 'An idea, a few words…'}
					aria-invalid={showError}
					aria-describedby={showError ? `${id}-error` : undefined}
				/>
			)}
			<div className="studio-editor__footer">
				<span>Markdown</span>
				<span>
					{text.trim().split(whitespace).filter(Boolean).length} {fr ? 'mots' : 'words'}
				</span>
			</div>
			{showError && (
				<p className="studio-field-error" id={`${id}-error`}>
					{errorMessage}
				</p>
			)}
		</div>
	)
}
