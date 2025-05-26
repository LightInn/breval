"use client";
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Laptop, Code, Server, Rocket, Cpu, Database, Globe } from "lucide-react"

export default function Journey() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(null)

  const timelineItems = [
    {
      year: "2012",
      title: "First Steps in Programming",
      description: "Discovered Blender and started coding in Python within the Blender Game Engine at the age of 13.",
      icon: <Code />,
      color: "bg-blue-500",
    },
    {
      year: "2014",
      title: "Open Source Exploration",
      description:
        "Delved into open-source, trying Linux distributions and dual boots. Started a computer club at school.",
      icon: <Laptop />,
      color: "bg-green-500",
    },
    {
      year: "2016",
      title: "Network & Security",
      description:
        "Discovered networks, addressing, packet transmission, UDP, and TCP. Built a small remote-controlled robot.",
      icon: <Server />,
      color: "bg-yellow-500",
    },
    {
      year: "2018",
      title: "Neural Networks & AI",
      description: "Developed an interest in understanding how the human brain and neural networks function.",
      icon: <Cpu />,
      color: "bg-purple-500",
    },
    {
      year: "2020",
      title: "Computer Science School",
      description:
        "Mastered databases, Docker, Kubernetes, and automated deployments. Learned to set up and secure infrastructures.",
      icon: <Database />,
      color: "bg-red-500",
    },
    {
      year: "2022",
      title: "SaaS Projects",
      description: "Created ForMenu, My-Makeup, and other SaaS platforms. Specialized in front-ops development.",
      icon: <Globe />,
      color: "bg-orange-500",
    },
    {
      year: "Present",
      title: "Continuous Innovation",
      description: "Continuing to explore new technologies and build exciting projects that push boundaries.",
      icon: <Rocket />,
      color: "bg-primary",
    },
  ]

  return (
    <section id="journey" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-20"></div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The path that led me to where I am today, from my first lines of code to building complex systems.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 transform -translate-x-1/2 origin-top"></motion.div>

          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`w-8 h-8 rounded-full ${
                      activeIndex === index ? "bg-primary" : "bg-gray-800"
                    } border-2 border-primary flex items-center justify-center text-white`}>
                    {item.icon}
                  </motion.div>
                </div>
                {/* Content */}
                <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <div
                    className={`p-4 rounded-lg ${
                      activeIndex === index ? "bg-gray-800/80 border-primary" : "bg-gray-900/60 border-gray-800"
                    } border backdrop-blur-sm transition-all duration-300 dithered`}>
                    <div className="flex items-center mb-2">
                      <span className="text-primary font-mono font-bold">{item.year}</span>
                      <div className="h-px bg-primary/30 flex-grow mx-2"></div>
                      <span className="font-bold">{item.title}</span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
