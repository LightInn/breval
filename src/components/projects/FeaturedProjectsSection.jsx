import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const projects = [
	{
		description:
			'An API to generate meta-description and alternative text for images.',
		url: 'https://forvoyez.com',
		title: 'ForVoyez',
		category: 'SaaS',
		id: 1,
	},
	{
		description:
			'A platform to list all the freelances makeup artists open to opportunities.',
		category: 'Reference Website',
		url: 'https://my-makeup.fr',
		title: 'My Makeup',
		id: 2,
	},
	{
		description: 'Digital menu for restaurant.',
		url: 'https://formenu.fr',
		title: 'Formenu',
		category: 'SaaS',
		id: 3,
	},
	{
		description: 'Art gallery.',
		url: 'https://artriste.cc',
		category: 'Gallery',
		title: 'Artriste',
		id: 4,
	},
]

function FeaturedProjectsSection({ step }) {
	return (
		<section className="relative overflow-hidden px-8 py-8">
			<div className="mx-auto max-w-6xl">
				<motion.h2
					animate={{ opacity: 1, y: 0 }}
					className="mb-12 text-center text-4xl font-bold"
					initial={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.8 }}
				>
					Featured Projects
				</motion.h2>

				<div className="grid grid-cols-1 gap-8 md:min-h-[500px] md:grid-cols-2">
					{step == 2 &&
						projects.map((project, index) => (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 20 }}
								key={project.id}
								transition={{ delay: index * 0.1, duration: 0.5 }}
							>
								<Card className="h-full">
									<CardContent className="p-6">
										<h3 className="mb-2 text-2xl font-semibold">
											{project.title}
										</h3>
										<Badge className="mb-4">{project.category}</Badge>
										<p className="text-gray-600">{project.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
				</div>
			</div>
		</section>
	)
}

export default FeaturedProjectsSection
