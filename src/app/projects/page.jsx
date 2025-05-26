"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Filter } from "lucide-react"
import Image from "next/image"
import ScrollObject3D from "@/components/scroll-object-3d"

export default function ProjectsPage() {
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

  const featuredProject = {
    title: "ForMenu",
    description:
      "A SaaS platform for dematerialized menus in restaurants with QR code generation, analytics, and a powerful CMS for restaurant owners.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    image: "/placeholder.svg?height=600&width=1200",
    github: "#",
    demo: "#",
  }

  const projects = [
    {
      title: "My-Makeup",
      description: "A networking site for professional makeup artists to showcase their work and connect with clients.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "Artriste",
      description: "An e-commerce website for art and artists with secure payment processing and artist profiles.",
      tags: ["Vue.js", "Firebase", "Stripe", "Cloudinary"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "ForHives",
      description: "A hub for bee-related projects and initiatives with interactive maps and data visualization.",
      tags: ["React", "GraphQL", "AWS", "Mapbox"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio v2",
      description: "Previous version of my personal portfolio website with interactive elements and animations.",
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A real-time weather dashboard with location-based forecasts and interactive maps.",
      tags: ["React", "OpenWeather API", "Chart.js"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description:
        "A productivity tool for managing tasks with drag-and-drop functionality and team collaboration features.",
      tags: ["React", "Redux", "Firebase", "Material UI"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
  ]

  const categories = ["All Projects", "Web Development", "Mobile Apps", "UI/UX Design", "3D & Interactive", "SaaS"]

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
                <span className="text-primary">Project</span> Gallery
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A showcase of my creative work and technical projects. Each project represents a unique challenge and
                learning experience in my journey as a developer.
              </p>
            </motion.div>

            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-wrap gap-3">
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

              <Button
                variant="outline"
                size="sm"
                className="border-primary/30 hover:bg-primary/20">
                <Filter className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </div>

            {/* Featured Project */}
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
                      src={featuredProject.image || "/placeholder.svg"}
                      alt={featuredProject.title}
                      fill
                      className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured Project</Badge>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredProject.title}</h2>
                      <p className="text-muted-foreground mb-6">{featuredProject.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredProject.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-primary/30 bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="border-primary hover:bg-primary/20">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                      <Button className="bg-primary hover:bg-primary/80">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              ref={ref}
              variants={container}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div key={index} variants={item}>
                  <Card
                    className="overflow-hidden border-primary/20 bg-gray-900/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105" />
                    </div>

                    <CardContent className="pt-6 flex-grow">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="border-primary/30 bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="border-primary/30 bg-primary/10">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary hover:bg-primary/20">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
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
                Load More Projects
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
