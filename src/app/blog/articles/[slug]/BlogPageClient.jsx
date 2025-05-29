'use client'

import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, User, Tag as TagIcon } from 'lucide-react'
import Link from 'next/link'
import { slug } from 'github-slugger'

import { rgbDataURL } from '@/services/dataurl.services'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import BlogDetails from '@/components/Blog/BlogDetails'
import RenderMdx from '@/components/Blog/RenderMdx'
import Highlight from '@/components/Highlight'
import Tag from '@/components/Elements/Tag'

export default function BlogPageClient({
	blog,
	similarArticles,
	jsonLd,
	slug: pageSlug,
}) {
	return (
		<div className="relative min-h-screen bg-background text-foreground">
			<div className="retro-grid-dark pointer-events-none absolute inset-0 opacity-20"></div>

			<Head>
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
					rel="stylesheet"
				/>
			</Head>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative z-10"
			>
				{/* Navigation */}
				<nav
					aria-label="Breadcrumb"
					className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
				>
					<ol className="flex items-center space-x-4" role="list">
						<li className="list-none">
							<div className="flex items-center">
								<Link
									className="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
									href={'/blog'}
								>
									<ArrowLeft className="mr-2 inline h-4 w-4" />
									blog
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
								{blog?.title}
							</div>
						</li>
					</ol>
				</nav>

				<article className="relative">
					{/* Hero Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}
						className="pixel-corners relative mx-auto mb-12 h-[70vh] w-full max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
					>
						<div className="absolute inset-0 z-10 flex items-center justify-center">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="pixel-corners flex h-full w-full flex-col justify-center gap-8 rounded-2xl border border-border bg-background/80 p-8 backdrop-blur-xl md:max-w-[70vw]"
							>
								<div className="flex flex-wrap justify-center gap-2">
									{blog.tags?.[0] && (
										<Tag
											className="px-6 py-2 text-sm"
											link={`/blog/categories/${slug(blog.tags[0])}`}
											name={blog.tags[0]}
										/>
									)}
									{blog.tags?.slice(1, 3).map((tag, idx) => (
										<Badge
											key={idx}
											variant="secondary"
											className="flex items-center gap-1"
										>
											<TagIcon className="h-3 w-3" />
											{tag}
										</Badge>
									))}
								</div>

								<motion.h1
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="text-center text-2xl font-semibold !leading-normal text-foreground md:text-3xl lg:text-5xl"
								>
									{blog.title}
								</motion.h1>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.6 }}
									className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
								>
									{blog.author && (
										<div className="flex items-center gap-1">
											<User className="h-4 w-4" />
											{blog.author}
										</div>
									)}
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{new Date(blog.publishedAt).toLocaleDateString()}
									</div>
									{blog.readingTime && (
										<div className="flex items-center gap-1">
											<Clock className="h-4 w-4" />
											{blog.readingTime}
										</div>
									)}
								</motion.div>
							</motion.div>
						</div>

						<Image
							alt={blog.title}
							blurDataURL={rgbDataURL(231, 183, 202)}
							className="h-full w-full rounded-lg object-cover object-center"
							height={1024}
							placeholder="blur"
							priority
							sizes="100vw"
							src={blog.image}
							width={1792}
						/>
					</motion.div>

					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<BlogDetails blog={blog} slug={pageSlug} />

						<div className="mt-8 grid grid-cols-12 gap-y-8 lg:gap-8">
							{/* Sidebar */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
								className="sticky top-8 col-span-12 lg:col-span-3"
							>
								{/* Similar Articles */}
								<Card className="pixel-corners border-border bg-card/50 backdrop-blur-sm">
									<CardHeader>
										<h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
											<TagIcon className="h-5 w-5" />
											Similar Articles
										</h2>
									</CardHeader>
									<CardContent>
										{similarArticles.length > 0 ? (
											<ul className="space-y-3">
												{similarArticles.slice(0, 5).map((article, idx) => (
													<motion.li
														key={article.url}
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.1 * idx }}
													>
														<Button
															asChild
															variant="ghost"
															className="h-auto w-full justify-start p-2 text-left hover:bg-accent/10"
														>
															<Link href={`/blog/articles/${article.url}`}>
																<div className="space-y-1">
																	<p className="line-clamp-2 text-sm font-medium text-foreground">
																		{article.title}
																	</p>
																	<p className="text-xs text-muted-foreground">
																		{new Date(
																			article.publishedAt
																		).toLocaleDateString()}
																	</p>
																</div>
															</Link>
														</Button>
													</motion.li>
												))}
											</ul>
										) : (
											<p className="text-sm text-muted-foreground">
												Aucun article similaire trouvé.
											</p>
										)}
									</CardContent>
								</Card>
							</motion.div>

							{/* Main Content */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								className="col-span-12 lg:col-span-9"
							>
								<Card className="pixel-corners border-border bg-card/50 backdrop-blur-sm">
									<CardContent className="p-6 lg:p-8">
										<RenderMdx blog={blog} />
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>

					<Highlight />
				</article>
			</motion.div>
		</div>
	)
}
