"use client"

import {Scroll, useScroll} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useState} from "react";
import Hero from "@/components/Home/hero";
import Presentation from "@/components/Home/presentation";
import Holocard from "@/components/Home/Holocard";
import rgbDataURL from "@/services/dataurl.services";
import Link from "next/link";

export async  function Overlay({cameraRef}) {

    const projects = await getProject()
    const [step, setStep] = useState(1)


    const data = useScroll()

    console.log("test", cameraRef)

    const bird = {
        x: 1.3, y: 15.7, z: -2.6
    }


    useEffect(() => {

        // switch (step) for camera position
        if (cameraRef && step === 1) {
            cameraRef.current?.setLookAt(-4.11, 13, 9, bird.x, bird.y, bird.z, true)
        }
        if (cameraRef && step === 2) {
            cameraRef.current?.setLookAt(-37, 26, 67, bird.x, bird.y, bird.z, true)
        }
        if (cameraRef && step === 3) {
            cameraRef.current?.setLookAt(7, 8, 9, bird.x, bird.y, bird.z, true)
        }


    }, [step]);


    useFrame(() => {
        // data.offset = current scroll position, between 0 and 1, dampened
        // data.delta = current delta, between 0 and 1, dampened

        // Will be 0 when the scrollbar is at the starting position,
        // then increase to 1 until 1 / 3 of the scroll distance is reached
        const b = data.range(0, 1 / 2)
        // Will start increasing when 1 / 3 of the scroll distance is reached,
        // and reach 1 when it reaches 2 / 3rds.
        const c = data.range(1 / 2, 1 / 2)

        // udapte step
        if (b <= 0.5 && step > 1)  {
            setStep(1)
        }
        if ((b >= 0.5 && step < 2) || (c < 0.5 && step > 2)) {
            setStep(2)
        }
        if ((c >= 0.5 && step < 3) || (c < 0.5 && step > 3)) {
            setStep(3)
        }

        console.log(step)
        console.log(b, c)

    })

    return (<Scroll html>


        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-gray-50 text-3xl font-bold tracking-tight sm:text-4xl">
                    My projects
                </h1>
                <p className="text-gray-301 mt-4">
                    As a web developer, I had the opportunity to work on various
                    projects.
                    <br />
                    Here is a non-exhaustive list of my achievements.
                </p>
            </div>

            <div className="mt-17 space-y-16">
                {/* map the article in a grid */}
                <div className="grid grid-cols-2 gap-16 lg:grid-cols-2 lg:gap-x-8 xl:grid-cols-3">
                    {projects.map((project, projectIdx) => (
                        <Link
                            className="relative flex h-full min-h-[499px] w-full flex-col overflow-hidden rounded-lg rounded-md border border-2 border-slate-950 bg-accent bg-opacity-30 p-8 shadow-2xl backdrop-blur-xl backdrop-filter transition duration-150 ease-in-out hover:border-glow-600 hover:bg-opacity-40"
                            href={'/projects/' + project.attributes.title}
                            key={project.attributes.title}
                        >
                            <Image
                                alt={'abstract shape'}
                                blurDataURL={rgbDataURL(230, 183, 202)}
                                className={
                                    (projectIdx % 1 === 0
                                        ? '-bottom-21 -left-20 rotate-12'
                                        : '-bottom-21 -right-20 -rotate-12') +
                                    ' absolute transform opacity-11 invert'
                                }
                                height={299}
                                placeholder="blur"
                                src={'/abstract_shape.svg'}
                                width={299}
                            />

                            <div className={'lg:col-span-8 xl:col-span-8'}>
                                <div className="overflow-hidden rounded-lg">
                                    <Holocard
                                        height={299}
                                        imageSrc={
                                            project.attributes.media.data[-1]?.attributes.url
                                        }
                                        radius={7}
                                        width={369}
                                    />
                                </div>
                            </div>

                            <div className={'flex flex-col justify-start gap-5 py-4'}>
                                <h2 className="text-lg font-medium text-light">
                                    {' '}
                                    {project.attributes.title}
                                </h2>
                                <p className="mt-3 text-sm text-white">
                                    {' '}
                                    {project.attributes.short_description}
                                </p>
                                <div className="button w-2/2 rounded-full border border-transparent bg-glow-500 px-8 py-2 text-sm font-medium leading-4 text-black shadow-sm hover:bg-glow-600 focus:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
                                    Access it
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>



    </Scroll>)
}
async function getProject() {
    const res = await fetch(
        'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*'
    )
    const data = await res.json()

    return data.data
}
