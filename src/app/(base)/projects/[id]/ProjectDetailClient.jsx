'use client'

import {
	ArrowLeft,
	Calendar,
	Code,
	ExternalLink,
	Globe,
	Tag,
	Users,
} from 'lucide-react'
import Markdown from 'react-markdown'
import React from 'react'

import { format, parseISO } from 'date-fns'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { rgbDataURL } from '@/services/dataurl.services'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import ImageWithFallback from '../../../../components/Global/ImageWithFallback'

export default function ProjectDetailClient({ project }) {
	// Prioritize main_media, then media array
	const featuredImage = project?.main_media
	const mediaArray = Array.isArray(project?.media) ? project.media : []

	// Create display array with main_media first if it exists
	const displayImages = featuredImage
		? [featuredImage, ...mediaArray.filter(img => img.id !== featuredImage.id)]
		: mediaArray

	return (
		<div className="relative min-h-screen bg-background text-foreground">
			<div className="retro-grid-dark pointer-events-none absolute inset-0 opacity-20"></div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 pb-16 pt-16 sm:pb-24"
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				<nav
					aria-label="Breadcrumb"
					className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
				>
					<ol className="flex items-center space-x-4" role="list">
						<li className="list-none">
							<div className="flex items-center">
								<Link
									className="mr-4 list-disc text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
									href={'/projects'}
								>
									<ArrowLeft className="mr-2 inline h-4 w-4" />
									Projects
								</Link>
								<svg
									aria-hidden="true"
									className="h-5 w-auto text-muted-foreground"
									viewBox="0 0 6 20"
								>
									<path
										d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
										fill="currentColor"
									/>
								</svg>
							</div>
						</li>

						<li className="list-none text-sm">
							<div aria-current="page" className="font-medium text-primary">
								{project?.title}
							</div>
						</li>
					</ol>
				</nav>

				<div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
						<div className="lg:col-span-5 lg:col-start-8">
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="flex flex-col space-y-4"
								initial={{ opacity: 0, x: 20 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<div className="flex items-center justify-between">
									<h1 className="text-2xl font-semibold text-foreground">
										{project?.title}
									</h1>
									{project?.date && (
										<Badge
											className="flex items-center gap-2"
											variant="secondary"
										>
											<Calendar className="h-4 w-4" />
											{format(parseISO(project.date), 'LLLL d, yyyy')}
										</Badge>
									)}
								</div>

								{/* Category and Skills */}
								<div className="flex flex-wrap gap-2">
									{project?.category && (
										<Badge
											className="flex items-center gap-1"
											variant="outline"
										>
											<Tag className="h-3 w-3" />
											{project.category}
										</Badge>
									)}
									{project?.skills?.slice(0, 5).map((skill, idx) => (
										<Badge className="text-xs" key={idx} variant="secondary">
											{skill}
										</Badge>
									))}
									{project?.skills?.length > 5 && (
										<Badge className="text-xs" variant="secondary">
											+{project.skills.length - 5} more
										</Badge>
									)}
								</div>
							</motion.div>
						</div>

						{/* Image gallery */}
						<motion.div
							animate={{ opacity: 1, x: 0 }}
							className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
							initial={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<h2 className="sr-only">Images</h2>
							<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
								{displayImages.map((image, idx) => (
									<motion.div
										animate={{ opacity: 1, scale: 1 }}
										className={classNames(
											idx === 0
												? 'lg:col-span-2 lg:row-span-2'
												: 'hidden lg:block',
											'relative overflow-hidden rounded-lg border border-border'
										)}
										initial={{ scale: 0.95, opacity: 0 }}
										key={image.id}
										transition={{ delay: 0.1 * idx, duration: 0.5 }}
									>
										<ImageWithFallback
											alt={image.name || `Project image ${idx + 1}`}
											blurDataURL={rgbDataURL(231, 183, 202)}
											className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
											fallbackSrc="/projets.png"
											height={image.height}
											placeholder="blur"
											src={image.url}
											width={image.width}
										/>
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							animate={{ opacity: 1, x: 0 }}
							className="mt-2 lg:col-span-5"
							initial={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							{/* URL VIEW - Multiple buttons */}
							<div className="mt-8 flex flex-col gap-4">
								{project?.live_url && (
									<Button
										asChild
										className="magnetic-button pixel-corners w-full"
										size="lg"
									>
										<a
											data-umami-event="project live link"
											data-umami-event-url={project?.live_url}
											href={project?.live_url}
											rel="noopener noreferrer"
											target="_blank"
										>
											<Globe className="mr-2 h-4 w-4" />
											Visit Live Site
										</a>
									</Button>
								)}

								{project?.url && project?.url !== project?.live_url && (
									<Button
										asChild
										className="magnetic-button pixel-corners w-full"
										size="lg"
										variant="outline"
									>
										<a
											data-umami-event="project source link"
											data-umami-event-url={project?.url}
											href={project?.url}
											rel="noopener noreferrer"
											target="_blank"
										>
											<Code className="mr-2 h-4 w-4" />
											View Source
										</a>
									</Button>
								)}

								{!project?.live_url && project?.url && (
									<Button
										asChild
										className="magnetic-button pixel-corners w-full"
										size="lg"
									>
										<a
											data-umami-event="project link"
											data-umami-event-url={project?.url}
											href={project?.url}
											rel="noopener noreferrer"
											target="_blank"
										>
											<ExternalLink className="mr-2 h-4 w-4" />
											Visit Project
										</a>
									</Button>
								)}
							</div>

							{/* Product details */}
							<Card className="pixel-corners mt-10 border-border bg-card/50 backdrop-blur-sm">
								<CardHeader>
									<h2 className="text-lg font-semibold text-foreground">
										Description
									</h2>
								</CardHeader>
								<CardContent>
									<div className="prose prose-sm text-md text-muted-foreground">
										{project?.description && (
											<Markdown>{project.description.toString()}</Markdown>
										)}
									</div>
								</CardContent>
							</Card>

							{/* Skills Section */}
							{project?.skills?.length > 0 && (
								<Card className="pixel-corners mt-10 border-border bg-card/50 backdrop-blur-sm">
									<CardHeader>
										<h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
											<Code className="h-5 w-5" />
											Technologies & Skills
										</h2>
									</CardHeader>
									<CardContent>
										<div className="flex flex-wrap gap-2">
											{project.skills.map((skill, idx) => (
												<motion.div
													animate={{ opacity: 1, scale: 1 }}
													initial={{ opacity: 0, scale: 0.9 }}
													key={idx}
													transition={{ delay: 0.05 * idx, duration: 0.3 }}
												>
													<Badge
														className="cursor-default transition-colors hover:bg-primary/10"
														variant="outline"
													>
														{skill}
													</Badge>
												</motion.div>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							{project?.creators?.length > 0 && (
								<Card className="pixel-corners mt-10 border-border bg-card/50 backdrop-blur-sm">
									<CardHeader>
										<h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
											<Users className="h-5 w-5" />
											Other team members for this project
										</h2>
									</CardHeader>
									<CardContent>
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
											{project?.creators?.map((creator, idx) => (
												<motion.div
													animate={{ opacity: 1, y: 0 }}
													initial={{ opacity: 0, y: 20 }}
													key={idx}
													transition={{ delay: 0.1 * idx, duration: 0.3 }}
												>
													<Button
														asChild
														className="magnetic-button pixel-corners h-auto w-full justify-start p-4"
														variant="outline"
													>
														<a
															className="flex flex-col items-start space-y-2"
															data-umami-event="creator link"
															data-umami-event-site={creator.site}
															href={'https://' + creator.site}
															rel="noopener noreferrer"
															target="_blank"
														>
															<span className="font-medium text-foreground">
																{creator.creator}
															</span>
															<span className="flex items-center gap-1 text-sm text-muted-foreground">
																<ExternalLink className="h-3 w-3" />
																{creator.site}
															</span>
														</a>
													</Button>
												</motion.div>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}
