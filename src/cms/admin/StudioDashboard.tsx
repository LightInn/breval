import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import type { Payload } from 'payload'
import { defaultLocale, type Locale, locales } from '@/i18n/locales'
import type { User } from '@/payload-types'

type Props = { payload: Payload; user: User; i18n: { language: string }; locale?: { code: Locale } | Locale }
export async function StudioDashboard({ payload, user, i18n, locale }: Props) {
	const fr = i18n.language === 'fr'
	const selected = typeof locale === 'object' ? locale.code : locale
	const language = locales.includes(selected as Locale) ? (selected as Locale) : defaultLocale
	const [blogs, projects, media, drafts, recent] = await Promise.all([
		payload.count({ collection: 'blogs', user, overrideAccess: false }),
		payload.count({ collection: 'projects', user, overrideAccess: false }),
		payload.count({ collection: 'media', user, overrideAccess: false }),
		payload.find({
			collection: 'blogs',
			limit: 1,
			depth: 0,
			draft: true,
			user,
			overrideAccess: false,
			where: { _status: { equals: 'draft' } },
		}),
		payload.find({
			collection: 'blogs',
			locale: language,
			user,
			overrideAccess: false,
			limit: 4,
			sort: '-updatedAt',
			depth: 0,
		}),
	])
	const stats = dashboardStats(i18n.language, blogs.totalDocs, projects.totalDocs, media.totalDocs)
	return (
		<Gutter className="dashboard">
			<section className="studio-dashboard" aria-label={fr ? 'Votre espace de création' : 'Your creative workspace'}>
				<div className="studio-welcome">
					<div>
						<span className="studio-eyebrow">BREV.AL / CONTENT STUDIO</span>
						<h1>{fr ? 'Gestion du contenu' : 'Content management'}</h1>
						<p>
							{fr
								? 'Gérez les articles, les projets et les médias du site.'
								: 'Manage website articles, projects and media.'}
						</p>
						<div className="studio-actions">
							<Link className="studio-button" href={`/admin/collections/blogs/create?locale=${language}`}>
								{fr ? 'Écrire un article' : 'Write an article'} <span aria-hidden="true">↗</span>
							</Link>
							<Link
								className="studio-button studio-button--quiet"
								href={`/admin/collections/projects/create?locale=${language}`}
							>
								{fr ? 'Ajouter un projet' : 'Add a project'} <span aria-hidden="true">+</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="studio-stats">
					{stats.map(stat => (
						<Link className="studio-stat" key={stat.route} href={`/admin/collections/${stat.route}?locale=${language}`}>
							<span>
								{stat.label}
								<span aria-hidden="true">↗</span>
							</span>
							<strong>{stat.count.toLocaleString(i18n.language)}</strong>
							<small>{stat.detail}</small>
						</Link>
					))}
				</div>
				<div className="studio-workbench">
					<div>
						<span className="studio-eyebrow">{fr ? 'ARTICLES' : 'ARTICLES'}</span>
						<h2>{fr ? 'Modifications récentes' : 'Recently updated'}</h2>
					</div>
					<span className="studio-status">
						<span />
						{drafts.totalDocs} {fr ? 'brouillon(s)' : 'drafts'}
					</span>
				</div>
				<div className="studio-recent">
					{recent.docs.length ? (
						recent.docs.map(doc => (
							<Link key={doc.id} href={`/admin/collections/blogs/${doc.id}?locale=${language}`}>
								<span className="studio-recent__icon" aria-hidden="true">
									↗
								</span>
								<span>
									<strong>{doc.title}</strong>
									<small>
										{new Intl.DateTimeFormat(i18n.language, { dateStyle: 'medium', timeZone: 'Europe/Paris' }).format(
											new Date(doc.updatedAt)
										)}
									</small>
								</span>
								<span className="studio-recent__badge">{fr ? 'Article' : 'Article'}</span>
							</Link>
						))
					) : (
						<p>
							{fr
								? 'Aucun article. Utilisez le bouton ci-dessus pour en créer un.'
								: 'No articles yet. Use the button above to create one.'}
						</p>
					)}
				</div>
			</section>
		</Gutter>
	)
}

function dashboardStats(language: string, blogs: number, projects: number, media: number) {
	const fr = language === 'fr'
	return [
		{
			label: fr ? 'Articles' : 'Articles',
			count: blogs,
			route: 'blogs',
			detail: fr ? 'Gérer les articles' : 'Manage articles',
		},
		{
			label: fr ? 'Projets' : 'Projects',
			count: projects,
			route: 'projects',
			detail: fr ? 'Gérer les projets' : 'Manage projects',
		},
		{
			label: fr ? 'Médiathèque' : 'Media library',
			count: media,
			route: 'media',
			detail: fr ? 'Gérer les fichiers' : 'Manage files',
		},
	]
}
