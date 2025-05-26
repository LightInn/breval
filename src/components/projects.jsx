"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

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

  const projects = [
    {
      title: "ForMenu",
      description: "A SaaS platform for dematerialized menus in restaurants with QR code generation and analytics.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
      featured: true,
    },
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
      description: "An e-commerce website for art and artists with secure payment processing.",
      tags: ["Vue.js", "Firebase", "Stripe", "Cloudinary"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
    {
      title: "ForHives",
      description: "A hub for bee-related projects and initiatives with interactive maps.",
      tags: ["React", "GraphQL", "AWS", "Mapbox"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/0 via-primary/5 to-background/0" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my creative work and technical projects. Each project represents a unique challenge and
            learning experience.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className={`overflow-hidden border-primary/20 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 h-full ${project.featured ? "md:col-span-2" : ""}`}>
                <div
                  className={`relative overflow-hidden ${project.featured ? "h-64" : "h-48"}`}>
                  <div className="absolute inset-0 dark:dithered-dark dithered-light opacity-30" />
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground pixel-corners">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <h3
                      className={`font-bold text-white ${project.featured ? "text-2xl" : "text-xl"}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="border-primary/30 bg-primary/10 pixel-corners">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary/20 magnetic-button pixel-corners">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary hover:bg-primary/20 magnetic-button pixel-corners">
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
          <Link href="/projects">
            <Button className="bg-primary hover:bg-primary/90 magnetic-button pixel-corners">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
