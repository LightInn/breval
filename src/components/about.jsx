"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github, Linkedin, Code, Cpu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const roles = [
    { title: "CTO of the start-up", link: "ForMenu", url: "#", icon: <Globe className="w-4 h-4" /> },
    {
      title: "Co-founder of",
      link: "My-Makeup",
      url: "#",
      description: "a platform to reference makeup artists",
      icon: <Code className="w-4 h-4" />,
    },
    {
      title: "Co-founder of",
      link: "Artriste",
      url: "#",
      description: "an e-commerce website for art",
      icon: <Code className="w-4 h-4" />,
    },
    {
      title: "Co-founder of",
      link: "ForHives",
      url: "#",
      description: "the hub for our bees",
      icon: <Cpu className="w-4 h-4" />,
    },
  ]

  const journey = [
    {
      period: "Middle School",
      title: "First Steps into Digital World",
      description:
        "Discovered video games and 3D modeling with Blender. Started exploring the infinite possibilities of computers and new technologies.",
    },
    {
      period: "Early Exploration",
      title: "Open Source & Linux",
      description:
        "Delved into open-source software, experimented with Linux distributions, and began understanding game development and cybersecurity fundamentals.",
    },
    {
      period: "High School",
      title: "Robotics & Neural Networks",
      description:
        "Built a remote-controlled robot and developed a fascination with neural networks and how the human brain functions.",
    },
    {
      period: "University",
      title: "Computer Science Mastery",
      description:
        "Studied PostgreSQL, Docker, Kubernetes, and infrastructure management. Continued coding with a focus on security, systems, and networks.",
    },
    {
      period: "Professional",
      title: "Entrepreneurial Journey",
      description:
        "Created multiple projects: tutoring website, ForMenu (SaaS for dematerialized menus), My-Makeup (networking for makeup artists), and Forvoyez.com (automated meta-descriptions).",
    },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 dark:retro-grid-dark retro-grid-light opacity-20" />
      <div
        className="absolute inset-0 dark:sakura-bg-dark sakura-bg-light opacity-10" />
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Introduction */}
          <div className="order-2 lg:order-1">
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-6">
              Hello, my name is <span className="text-primary">Bréval Le Floch</span>
            </motion.h2>

            <motion.div variants={item} className="space-y-4 mb-8">
              {roles.map((role, index) => (
                <Card
                  key={index}
                  className="border-primary/20 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="text-primary mr-3 mt-1">{role.icon}</div>
                      <p className="text-sm">
                        {role.title}{" "}
                        <a
                          href={role.url}
                          className="text-primary hover:underline font-medium magnetic-button">
                          {role.link}
                        </a>
                        {role.description && <span>, {role.description}</span>}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div variants={item} className="space-y-4 mb-8">
              <p className="text-muted-foreground">
                I'm a work-study student living in Nantes. From my youngest age, I am very fascinated by the infinite
                possibilities of computers and new technologies.
              </p>
              <p className="text-muted-foreground">
                As I continue to learn and explore this ever-evolving universe, I'm driven by my passion to discover new
                worlds and their new rules. Currently focused on front-end development while maintaining a deep interest
                in all aspects of computer science.
              </p>
              <p className="text-muted-foreground">
                When I'm not coding, you'll find me exploring indie games or working on creative projects that push the
                boundaries of what's possible with technology.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 magnetic-button pixel-corners">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 magnetic-button pixel-corners">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 magnetic-button pixel-corners">
                <ExternalLink className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Photo & Journey */}
          <div className="order-1 lg:order-2 space-y-8">
            <motion.div variants={item} className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full" />
                <div
                  className="relative bg-card/80 backdrop-blur-sm p-3 rounded-2xl pixel-corners border border-primary/30 dark:dithered-dark dithered-light">
                  <div className="bg-card/90 p-4 rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Bréval Le Floch"
                      width={400}
                      height={400}
                      className="rounded-xl" />
                    <div
                      className="absolute bottom-8 left-8 right-8 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-primary/30">
                      <p className="text-center text-primary font-bold text-sm">BRÉVAL LE FLOCH</p>
                      <p className="text-center text-xs text-muted-foreground">Creative Developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div variants={item} className="space-y-4">
              <h3 className="text-xl font-bold text-center mb-6">My Journey</h3>
              {journey.map((step, index) => (
                <motion.div key={index} variants={item} className="relative">
                  <Card
                    className="border-primary/20 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded pixel-corners">
                              {step.period}
                            </span>
                            <h4 className="font-semibold text-sm">{step.title}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
