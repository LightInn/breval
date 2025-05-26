"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ScrollObject3D from "@/components/scroll-object-3d"

export default function BlogPage() {
  const ref = useRef(null)
  const featuredRef = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const isFeaturedInView = useInView(featuredRef, { once: false, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const featuredPost = {
    title: "The Future of Creative Development",
    excerpt:
      "Exploring the intersection of art, technology, and human experience in the digital age. How creative coding is shaping the future of interactive experiences.",
    date: "May 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Creative Coding", "Web Development", "Digital Art"],
    slug: "#",
  }

  const blogPosts = [
    {
      title: "Building Immersive 3D Experiences with Three.js",
      excerpt: "A deep dive into creating engaging 3D web experiences using Three.js and React Three Fiber.",
      date: "April 22, 2023",
      readTime: "6 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Three.js", "WebGL", "React"],
      slug: "#",
    },
    {
      title: "The Art of Generative Design",
      excerpt: "How algorithms and randomness can create beautiful, unique visual experiences.",
      date: "March 18, 2023",
      readTime: "5 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Generative Art", "Algorithms", "Creative Coding"],
      slug: "#",
    },
    {
      title: "Optimizing Performance in Creative Web Projects",
      excerpt: "Techniques for maintaining smooth performance in graphics-heavy web applications.",
      date: "February 10, 2023",
      readTime: "7 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Performance", "Optimization", "Web Development"],
      slug: "#",
    },
    {
      title: "Creating Responsive Animations with Framer Motion",
      excerpt: "A guide to building fluid, responsive animations that enhance user experience.",
      date: "January 5, 2023",
      readTime: "4 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Animation", "Framer Motion", "React"],
      slug: "#",
    },
    {
      title: "The Role of Typography in Digital Design",
      excerpt: "How typography choices impact user experience and brand perception in digital products.",
      date: "December 12, 2022",
      readTime: "5 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Typography", "Design", "UX"],
      slug: "#",
    },
    {
      title: "Exploring WebGL Shaders for Creative Effects",
      excerpt: "An introduction to GLSL shaders and how they can create stunning visual effects on the web.",
      date: "November 28, 2022",
      readTime: "9 min read",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["WebGL", "GLSL", "Shaders"],
      slug: "#",
    },
  ]

  const categories = [
    "All Posts",
    "Creative Coding",
    "Web Development",
    "Design",
    "3D Graphics",
    "Tutorials",
    "Case Studies",
  ]

  return (
    <main
      className="pt-20 min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <div className="relative">
        <ScrollObject3D />

        <section className="py-20 relative">
          <div className="absolute inset-0 retro-grid opacity-30"></div>
          <div className="absolute inset-0 sakura-bg opacity-10"></div>

          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                <span className="text-primary">Blog</span> & Thoughts
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Insights, tutorials, and reflections on creative development, digital art, and the intersection of
                technology and creativity.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "bg-primary hover:bg-primary/80" : "border-primary/30 hover:bg-primary/20"}>
                  {category}
                </Button>
              ))}
            </div>

            {/* Featured Post */}
            <motion.div
              ref={featuredRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isFeaturedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="mb-16">
              <div
                className="relative rounded-lg overflow-hidden border border-primary/30 bg-gray-900/60 backdrop-blur-sm">
                <div className="absolute inset-0 dithered opacity-20"></div>
                <div className="md:flex">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-primary/30 bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                      <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{featuredPost.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <Link href={featuredPost.slug}>
                        <Button className="w-full md:w-auto bg-primary hover:bg-primary/80">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <motion.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <motion.div key={index} variants={item}>
                  <Card
                    className="overflow-hidden border-primary/20 bg-gray-900/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105" />
                    </div>

                    <CardContent className="pt-6 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="border-primary/30 bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <Link href={post.slug} className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-between hover:bg-primary/20 hover:text-white">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-12">
              <Button variant="default" className="bg-primary hover:bg-primary/80">
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
