'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Holocard from '@/components/Home/Holocard'
import Link from 'next/link'
import {BackgroundLines} from "@/components/ui/background-lines";

// Custom cursor that follows the mouse with a spring
function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })
    const springX = useSpring(position.x, { stiffness: 300, damping: 30 })
    const springY = useSpring(position.y, { stiffness: 300, damping: 30 })

    useEffect(() => {
        function handleMouse(e) {
            setPosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouse)
        return () => window.removeEventListener('mousemove', handleMouse)
    }, [])

    return (
        <motion.div
            style={{ translateX: springX, translateY: springY }}
            className="pointer-events-none fixed top-0 left-0 h-6 w-6 rounded-full bg-[#ffc6d3]/50 mix-blend-plus-lighter"
        />
    )
}

// Sticky “magnet” button in the corner
function MagnetButton() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    function handleMouse(e) {
        const rect = e.target.getBoundingClientRect()
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        x.set(dx * 0.2)
        y.set(dy * 0.2)
    }

    function handleLeave() {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ x, y }}
            className="fixed bottom-8 right-8 z-50 rounded-full bg-[#ffc6d3] px-6 py-3 font-medium text-black shadow-lg"
        >
            Contact me
        </motion.button>
    )
}

export default function ProjectClient({ projects }) {
    return (
        <>
            <CustomCursor />
            <MagnetButton />

            <section className="relative overflow-hidden bg-black text-white min-h-screen px-6 py-24">
                {/* Animated background noise */}

                <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                    <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                        Sanjana Airlines, <br /> Sajana Textiles.
                    </h2>
                    <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                        Get the best advices from our experts, including expert artists,
                        painters, marathon enthusiasts and RDX, totally free.
                    </p>
                </BackgroundLines>


                <div className="relative z-10 mx-auto max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-4xl font-bold text-[#ffc6d3] mb-16"
                    >
                        My Project Journey
                    </motion.h1>

                    {/* Timeline container */}
                    <div className="relative ml-4 pl-8 before:absolute before:top-0 before:left-2 before:h-full before:w-1 before:bg-[#ffc6d3]/50">
                        {projects.map((proj, index) => {
                            const { title, short_description, date, media } = proj.attributes
                            const isLeft = index % 2 === 0

                            return (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className={`mb-16 flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className="relative w-3/4">
                                        {/* Timeline marker */}
                                        <div className="absolute top-2 left-[-1.5rem] h-3 w-3 rounded-full bg-[#ffc6d3]" />
                                        {/* Date label */}
                                        <span className="absolute top-0 text-xs text-gray-400 -mt-4">
                      {new Date(date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                      })}
                    </span>

                                        <Link href={`/projects/${title}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.02, rotateZ: 1 }}
                                                className="group cursor-pointer overflow-hidden rounded-xl border border-[#ffc6d3] bg-white/5 p-4 shadow-xl transition-all"
                                            >
                                                <Holocard
                                                    imageSrc={media.data[0]?.attributes.url}
                                                    height={200}
                                                    width={320}
                                                    radius={8}
                                                />
                                                <div className="mt-4">
                                                    <h3 className="text-2xl font-semibold text-[#ffc6d3]">{title}</h3>
                                                    <p className="mt-2 text-sm text-gray-300">{short_description}</p>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
