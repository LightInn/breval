import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MovingLogo from './MovingLogo'
import { Code, Database, Globe, Smartphone } from 'lucide-react'

const projects = [
	{
		id: 1,
		title: 'ForVoyez',
		category: 'SaaS',
		description:
			'An API to generate meta-description and alternative text for images.',
		url: 'https://forvoyez.com',
	},
	{
		id: 2,
		title: 'My Makeup',
		category: 'Reference Website',
		description:
			'A platform to list all the freelances makeup artists open to opportunities.',
		url: 'https://my-makeup.fr',
	},
	{
		id: 3,
		title: 'Formenu',
		category: 'SaaS',
		description: 'Digital menu for restaurant.',
		url: 'https://formenu.fr',
	},
	{
		id: 4,
		title: 'Artriste',
		category: 'Gallery',
		description: 'Art gallery.',
		url: 'https://artriste.cc',
	},
]

function FeaturedProjectsSection({ step }) {
	return (
		<section className="relative overflow-hidden px-8 py-8">
			<div className="mx-auto max-w-6xl">
				<motion.h2
					className="mb-12 text-center text-4xl font-bold"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Featured Projects
				</motion.h2>

				<div className="grid grid-cols-1 gap-8 md:min-h-[500px] md:grid-cols-2">
					{step == 2 &&
						projects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
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
