import path from 'node:path'
import type { CollectionConfig, Field } from 'payload'
import { authenticated, publishedOrAuthenticated } from './access'

const slugPattern = /[^a-z0-9]+/g
const edgeHyphens = /^-+|-+$/g
const slug = (localized = false): Field => ({
	name: 'slug',
	type: 'text',
	required: true,
	unique: true,
	localized,
	index: true,
	admin: {
		position: 'sidebar',
		description: {
			en: 'The last part of this page’s URL. Keep it stable after publishing.',
			fr: 'La fin de l’adresse de cette page. Évitez de la modifier après publication.',
		},
	},
	hooks: {
		beforeValidate: [
			({ value, data }) =>
				value ||
				String(data?.title || '')
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toLowerCase()
					.replace(slugPattern, '-')
					.replace(edgeHyphens, ''),
		],
	},
})
const stringArray = (value: unknown) =>
	value == null ||
	(Array.isArray(value) && value.every(item => typeof item === 'string')) ||
	'Enter an array of strings.'
const contentAccess = {
	read: publishedOrAuthenticated,
	create: authenticated,
	update: authenticated,
	delete: authenticated,
}
const markdown = (name: string, label: string): Field => ({
	name,
	label,
	type: 'textarea',
	localized: true,
	admin: { components: { Field: '/cms/admin/MarkdownField#MarkdownField' } },
})

export const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	admin: { useAsTitle: 'email', group: { en: 'Settings', fr: 'Réglages' } },
	access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
	fields: [{ name: 'name', type: 'text' }],
}
export const Media: CollectionConfig = {
	slug: 'media',
	labels: { singular: { en: 'Media', fr: 'Média' }, plural: { en: 'Media library', fr: 'Médiathèque' } },
	admin: { group: { en: 'Library', fr: 'Bibliothèque' } },
	access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
	upload: {
		staticDir: path.resolve(process.env.PAYLOAD_MEDIA_DIR || path.join(process.cwd(), '.data/media')),
		mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],
	},
	fields: [
		{ name: 'alt', type: 'text', localized: true },
		{ name: 'sourceURL', type: 'text', unique: true, index: true, admin: { hidden: true } },
	],
}
export const Blogs: CollectionConfig = {
	slug: 'blogs',
	labels: { singular: { en: 'Article', fr: 'Article' }, plural: { en: 'Articles', fr: 'Articles' } },
	admin: {
		useAsTitle: 'title',
		group: { en: 'Create & publish', fr: 'Créer et publier' },
		description: {
			en: 'Stories, ideas and notes worth sharing.',
			fr: 'Des idées, des récits et des notes à partager.',
		},
		defaultColumns: ['title', '_status', 'updatedAt'],
	},
	access: contentAccess,
	versions: { drafts: true },
	hooks: {
		beforeChange: [
			({ data }) => {
				if (data._status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
				return data
			},
		],
	},
	fields: [
		{ name: 'title', type: 'text', required: true, localized: true },
		slug(true),
		{ name: 'describe', label: 'Summary', type: 'textarea', localized: true },
		markdown('content', 'Article (Markdown)'),
		{ name: 'image', type: 'upload', relationTo: 'media', localized: true },
		{
			name: 'tags',
			label: { en: 'Topics', fr: 'Thèmes' },
			type: 'json',
			localized: true,
			validate: stringArray,
			admin: { components: { Field: '/cms/admin/StringListField#StringListField' } },
		},
		{ name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
		{ name: 'legacyId', type: 'text', unique: true, index: true, admin: { hidden: true } },
	],
}
export const Projects: CollectionConfig = {
	slug: 'projects',
	labels: { singular: { en: 'Project', fr: 'Projet' }, plural: { en: 'Projects', fr: 'Projets' } },
	admin: {
		useAsTitle: 'title',
		group: { en: 'Create & publish', fr: 'Créer et publier' },
		description: { en: 'Give your work a place to shine.', fr: 'Un espace pour mettre votre travail en valeur.' },
		defaultColumns: ['title', 'category', '_status', 'rank'],
	},
	access: contentAccess,
	versions: { drafts: true },
	fields: [
		{ name: 'title', type: 'text', localized: true, required: true },
		slug(),
		markdown('description', 'Description (Markdown)'),
		markdown('short_description', 'Short description (Markdown)'),
		{ name: 'date', type: 'date', localized: true },
		{ name: 'url', label: 'Source / project URL', type: 'text', localized: true },
		{ name: 'live_url', type: 'text', localized: true },
		{ name: 'main_media', type: 'upload', relationTo: 'media', localized: true },
		{ name: 'media', type: 'upload', relationTo: 'media', hasMany: true, localized: true },
		{ name: 'creators', type: 'json', localized: true },
		{
			name: 'skills',
			label: { en: 'Skills & tools', fr: 'Compétences et outils' },
			type: 'json',
			localized: true,
			validate: stringArray,
			admin: { components: { Field: '/cms/admin/StringListField#StringListField' } },
		},
		{
			name: 'category',
			type: 'select',
			localized: true,
			defaultValue: 'Web Development',
			options: ['Web Development', 'Mobile App', 'UI/UX Design', 'Interactive & 3D', 'SaaS'],
		},
		{ name: 'rank', type: 'number', localized: true, defaultValue: 10, min: 0, max: 20 },
		{ name: 'legacyId', type: 'text', unique: true, index: true, admin: { hidden: true } },
	],
}

// Unnamed tabs only change the editor layout; all stored field paths stay identical.
function organiseEditor(
	collection: CollectionConfig,
	groups: { label: { en: string; fr: string }; names: string[] }[],
	sidebar: string[]
) {
	const fields = collection.fields
	const take = (names: string[]) => fields.filter(field => 'name' in field && names.includes(field.name))
	for (const field of take(sidebar)) field.admin = { ...field.admin, position: 'sidebar' }
	collection.fields = [
		{ type: 'tabs', tabs: groups.map(group => ({ label: group.label, fields: take(group.names) })) },
		...take([...sidebar, 'legacyId']),
	]
}
organiseEditor(
	Blogs,
	[
		{ label: { en: 'Story', fr: 'Rédaction' }, names: ['title', 'describe', 'content'] },
		{ label: { en: 'Cover & topics', fr: 'Visuel et thèmes' }, names: ['image', 'tags'] },
	],
	['slug', 'publishedAt']
)
organiseEditor(
	Projects,
	[
		{ label: { en: 'Story', fr: 'Présentation' }, names: ['title', 'short_description', 'description'] },
		{ label: { en: 'Visuals', fr: 'Visuels' }, names: ['main_media', 'media'] },
		{ label: { en: 'Details', fr: 'Détails' }, names: ['date', 'url', 'live_url', 'skills', 'creators'] },
	],
	['slug', 'category', 'rank']
)

const fieldLabels: Record<string, { en: string; fr: string }> = {
	title: { en: 'Title', fr: 'Titre' },
	slug: { en: 'Page address', fr: 'Adresse de la page' },
	describe: { en: 'Summary', fr: 'Résumé' },
	content: { en: 'Article', fr: 'Article' },
	image: { en: 'Cover image', fr: 'Image de couverture' },
	publishedAt: { en: 'Publication date', fr: 'Date de publication' },
	description: { en: 'Project story', fr: 'Présentation du projet' },
	short_description: { en: 'Short description', fr: 'Présentation courte' },
	main_media: { en: 'Main visual', fr: 'Visuel principal' },
	media: { en: 'Gallery', fr: 'Galerie' },
	date: { en: 'Project date', fr: 'Date du projet' },
	url: { en: 'Source URL', fr: 'Lien du code' },
	live_url: { en: 'Live website', fr: 'Site en ligne' },
	creators: { en: 'Contributors', fr: 'Équipe' },
	category: { en: 'Category', fr: 'Catégorie' },
	rank: { en: 'Featured priority', fr: 'Priorité de mise en avant' },
}
function translateFieldLabels(fields: Field[]) {
	for (const field of fields) {
		if ('name' in field && fieldLabels[field.name]) field.label = fieldLabels[field.name]
		if (field.type === 'tabs') for (const tab of field.tabs) translateFieldLabels(tab.fields)
	}
}
translateFieldLabels(Blogs.fields)
translateFieldLabels(Projects.fields)
