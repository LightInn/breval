import Link from 'next/link'
import { legalCopy } from '@/lib/legal-copy'
export default function LegalPage({ locale, kind }: { locale: string; kind: 'privacy' | 'terms' }) {
	const fr = locale === 'fr'
	const copy = legalCopy[fr ? 'fr' : 'en'][kind]
	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
			<Link href={`/${locale}`} className="text-sm text-muted-foreground underline underline-offset-4">
				{fr ? 'Retour à l’accueil' : 'Back to home'}
			</Link>
			<header className="mb-12 mt-8">
				<h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h1>
				<p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>
			</header>
			<div className="space-y-10">
				{copy.sections.map(([title, body]) => (
					<section key={title}>
						<h2 className="text-xl font-semibold">{title}</h2>
						<p className="mt-3 break-words leading-8 text-muted-foreground">{body}</p>
					</section>
				))}
			</div>
			<a
				className="mt-12 inline-block text-primary underline underline-offset-4"
				href="mailto:breval.lefloch@gmail.com"
			>
				breval.lefloch@gmail.com
			</a>
		</main>
	)
}
