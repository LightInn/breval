// app/projects/page.tsx

'use client'

import {motion} from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import {BackgroundLines} from "@/components/ui/background-lines";
import Navbar from "@/components/navbar";


export default function ProjectClient(
    {projects}
) {

    return (
        <div className="relative min-h-screen w-full bg-neutral-900 text-white">


            <Navbar/>

            <header className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
                {/*<video*/}
                {/*    autoPlay*/}
                {/*    loop*/}
                {/*    muted*/}
                {/*    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"*/}
                {/*>*/}
                {/*    <source src="/header-bg.mp4" type="video/mp4"/>*/}
                {/*</video>*/}

                <BackgroundLines className="absolute top-0 left-0 w-full h-full object-cover opacity-30"/>


                <div className="relative z-10 text-center max-w-4xl px-6">
                    <motion.h1
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="text-5xl md:text-6xl font-bold leading-tight"
                    >
                        Crafting bold & meaningful digital experiences.
                    </motion.h1>
                    <p className="mt-6 text-lg text-neutral-300">
                        A curated selection of my most impactful work.
                    </p>
                </div>
            </header>

            <main className="px-6 py-24 max-w-7xl mx-auto space-y-24">
                {projects.map((project, i) => {
                    const data = project.attributes
                    const image = data.media.data[0]?.attributes.url
                    const even = i % 2 === 0

                    return (
                        <motion.section
                            key={data.title}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.6, delay: i * 0.1}}
                            className={`flex flex-col-reverse md:grid md:grid-cols-2 gap-16 items-center ${
                                even ? '' : 'md:flex-row-reverse'
                            }`}
                        >
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{data.title}</h2>
                                <p className="text-neutral-400">{data.short_description}</p>
                                <Link
                                    href={`/projects/${data.title}`}
                                    className="inline-block mt-4 px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
                                >
                                    Explore project →
                                </Link>
                            </div>
                            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={image}
                                    alt={data.title}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                                />
                            </div>
                        </motion.section>
                    )
                })}
            </main>
        </div>
    )
}
