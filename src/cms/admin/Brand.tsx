export function StudioLogo() {
	return (
		<span className="studio-logo">
			<span className="studio-logo__mark" aria-hidden="true">
				b.
			</span>
			<span>
				brev.al<span className="studio-logo__sub">CONTENT STUDIO</span>
			</span>
		</span>
	)
}
export function StudioIcon() {
	return (
		<span className="studio-logo__mark studio-logo__mark--small" role="img" aria-label="brev.al Studio">
			b.
		</span>
	)
}
export function StudioWelcome({ i18n }: { i18n: { language: string } }) {
	const fr = i18n.language === 'fr'
	return (
		<div className="studio-login">
			<h1>{fr ? 'Administration' : 'Administration'}</h1>
			<p>{fr ? 'Connectez-vous pour gérer le contenu de brev.al.' : 'Sign in to manage brev.al content.'}</p>
		</div>
	)
}
export function StudioSiteLink({ i18n }: { i18n: { language: string } }) {
	return (
		<a className="studio-site-link" href={i18n.language === 'fr' ? '/fr' : '/en'} target="_blank" rel="noreferrer">
			{i18n.language === 'fr' ? 'Voir le site' : 'View website'} <span aria-hidden="true">↗</span>
		</a>
	)
}
