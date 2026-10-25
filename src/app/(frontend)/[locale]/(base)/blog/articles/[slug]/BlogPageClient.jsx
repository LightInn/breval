'use client'

import { motion } from 'framer-motion'
import { slug } from 'github-slugger'
import { ArrowLeft, Calendar, Clock, Tag as TagIcon, User } from 'lucide-react'
import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'
import BlogDetails from '@/components/Blog/BlogDetails'
import RenderMdx from '@/components/Blog/RenderMdx'
import Tag from '@/components/Elements/Tag'
import LocalizedText from '@/components/Global/localized-text'
import SharedContent from '@/components/Global/shared-content'
import Highlight from '@/components/Highlight'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { rgbDataURL } from '@/services/dataurl.services'
export default function BlogPageClient({ similarArticles, slug: pageSlug, jsonLd, blog }) {
	const t = useTranslations('common')
	const ui = useTranslations('ui')
	const formatter = useFormatter()
	return (
		<div className="relative mt-20 min-h-screen bg-background text-foreground">
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd),
				}}
				type="application/ld+json"
			/>

			<motion.div
				animate={{
					opacity: 1,
					y: 0,
				}}
				className="relative z-10"
				transition={{
					duration: 0.5,
				}}
			>
				{/* Navigation */}
				<nav aria-label={ui('breadcrumb')} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<ol className="flex flex-wrap items-center gap-y-2">
						<li className="list-none">
							<div className="flex items-center">
								<Link
									className="mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
									href={'/blog'}
								>
									<ArrowLeft className="mr-2 inline h-4 w-4" />
									blog
								</Link>
								<svg aria-hidden="true" className="h-5 w-auto text-muted-foreground" viewBox="0 0 6 20">
									<path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
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
						animate={{
							opacity: 1,
							scale: 1,
						}}
						className="pixel-corners relative mx-auto mb-12 min-h-[28rem] w-full sm:min-h-[32rem] max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8"
						transition={{
							duration: 0.6,
						}}
					>
						<div className="relative z-10 flex min-h-[28rem] items-center justify-center py-8 sm:min-h-[32rem]">
							<motion.div
								animate={{
									opacity: 1,
									y: 0,
								}}
								className="pixel-corners flex w-full flex-col justify-center gap-4 sm:gap-8 rounded-2xl border border-border bg-background/90 p-5 sm:p-8 backdrop-blur-xl md:max-w-[70vw]"
								transition={{
									duration: 0.6,
									delay: 0.2,
								}}
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
										<Badge className="flex items-center gap-1" key={idx} variant="secondary">
											<TagIcon className="h-3 w-3" />
											{tag}
										</Badge>
									))}
								</div>

								<SharedContent kind="article" id={blog.id} part="title">
									<motion.h1
										animate={{
											opacity: 1,
											y: 0,
										}}
										className="text-center text-2xl font-semibold !leading-normal text-foreground md:text-3xl lg:text-5xl"
										transition={{
											duration: 0.6,
											delay: 0.4,
										}}
									>
										{blog.title}
									</motion.h1>
								</SharedContent>

								<motion.div
									animate={{
										opacity: 1,
										y: 0,
									}}
									className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
									transition={{
										duration: 0.6,
										delay: 0.6,
									}}
								>
									{blog.author && (
										<div className="flex items-center gap-1">
											<User className="h-4 w-4" />
											{blog.author}
										</div>
									)}
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										{formatter.dateTime(new Date(blog.publishedAt), { dateStyle: 'long' })}
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

						<SharedContent kind="article" id={blog.id} part="image">
							<Image
								alt={blog.title}
								blurDataURL={rgbDataURL(231, 183, 202)}
								className="absolute inset-0 h-full w-full rounded-lg object-cover object-center"
								height={1024}
								placeholder="blur"
								priority
								sizes="100vw"
								src={blog.image || '/placeholder.svg'}
								width={1792}
							/>
						</SharedContent>
					</motion.div>

					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<BlogDetails blog={blog} slug={pageSlug} />

						<div className="mt-8 grid grid-cols-12 gap-y-8 lg:gap-8">
							{/* Sidebar */}
							<motion.div
								animate={{
									opacity: 1,
									x: 0,
								}}
								className="order-2 col-span-12 min-w-0 lg:order-1 lg:sticky lg:top-24 lg:col-span-3 lg:self-start"
								transition={{
									duration: 0.5,
									delay: 0.3,
								}}
							>
								{/* Similar Articles */}
								<Card className="pixel-corners border-border bg-card/50 backdrop-blur-sm">
									<CardHeader>
										<h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
											<TagIcon className="h-5 w-5" />
											{t('relatedArticles')}
										</h2>
									</CardHeader>
									<CardContent>
										{similarArticles.length > 0 ? (
											<ul className="space-y-3">
												{similarArticles.slice(0, 5).map((article, idx) => (
													<motion.li
														animate={{
															opacity: 1,
															y: 0,
														}}
														key={article.url}
														transition={{
															delay: 0.1 * idx,
															duration: 0.3,
														}}
													>
														<Button
															asChild
															className="h-auto w-full justify-start whitespace-normal p-2 text-left hover:bg-accent/10"
															variant="ghost"
														>
															<Link href={`/blog/articles/${article.url}`}>
																<div className="min-w-0 space-y-1">
																	<p className="line-clamp-2 break-words text-sm font-medium text-foreground">
																		{article.title}
																	</p>
																	<p className="text-xs text-muted-foreground">
																		{formatter.dateTime(new Date(article.publishedAt), { dateStyle: 'long' })}
																	</p>
																</div>
															</Link>
														</Button>
													</motion.li>
												))}
											</ul>
										) : (
											<p className="text-sm text-muted-foreground">
												<LocalizedText id="noRelated" />
											</p>
										)}
									</CardContent>
								</Card>
							</motion.div>

							{/* Main Content */}
							<motion.div
								animate={{
									opacity: 1,
									x: 0,
								}}
								className="order-1 col-span-12 min-w-0 lg:order-2 lg:col-span-9"
								transition={{
									duration: 0.5,
									delay: 0.4,
								}}
							>
								<Card className="pixel-corners border-border bg-card/50 backdrop-blur-sm">
									<CardContent className="p-4 sm:p-6 lg:p-8">
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
