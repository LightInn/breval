import styles from './journey.module.css'

const chapters = [
	{ id: 'beginnings', nodes: ['gaming', 'blender'] },
	{ id: 'exploration', nodes: ['opensource', 'security', 'robot', 'ai', 'social'] },
	{ id: 'building', nodes: ['school', 'startups'] },
	{ id: 'today', nodes: ['current'] },
]

export default function MyJourneySection({ dict }) {
	const journey = dict.home.journey
	const editorial = journey.editorial
	return (
		<section id="journey" aria-labelledby="journey-title" className={styles.section}>
			<div className={styles.layout}>
				<header className={styles.intro}>
					<p className={styles.eyebrow}>{editorial.eyebrow}</p>
					<h2 id="journey-title">{journey.title}</h2>
					<p className={styles.description}>{editorial.description}</p>
					<span className={styles.signature} aria-hidden="true">
						Bréval Le Floch
					</span>
				</header>
				<ol className={styles.timeline}>
					{chapters.map((chapter, index) => {
						const copy = editorial.chapters[chapter.id]
						return (
							<li key={chapter.id} className={styles.chapter}>
								<div className={styles.meta}>
									<span>{String(index + 1).padStart(2, '0')}</span>
									<span>{copy.period}</span>
								</div>
								<h3>{copy.title}</h3>
								<p className={styles.summary}>{copy.description}</p>
								<details className={styles.details}>
									<summary>
										<span className={styles.closed}>{editorial.readMore}</span>
										<span className={styles.opened}>{editorial.readLess}</span>
										<span className={styles.plus} aria-hidden="true" />
									</summary>
									<div className={styles.stories}>
										{chapter.nodes.map(id => {
											const node = journey.nodes[id]
											return (
												<article key={id}>
													<h4>{node.title}</h4>
													<p>{node.detailedDescription}</p>
													<p className={styles.technologies}>{Object.values(node.technologies).join(' · ')}</p>
												</article>
											)
										})}
									</div>
								</details>
							</li>
						)
					})}
				</ol>
			</div>
		</section>
	)
}
