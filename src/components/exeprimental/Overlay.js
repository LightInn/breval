"use client"

import {MeshPortalMaterial, Scroll, useCursor, useScroll} from "@react-three/drei";
import {easing, geometry} from 'maath'
import {extend, useFrame} from '@react-three/fiber'

import * as THREE from "three";

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll as uS, useTransform } from 'framer-motion'
import { ArrowDownCircle, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import AnimatedTitle from "@/components/exeprimental/Sectiona";

const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')


extend(geometry)


export function Overlay({cameraRef}) {

    // const projects = await getProject()
    const [step, setStep] = useState(0)


    const data = useScroll()

    console.log("test", cameraRef)

    const bird = {
        x: 1.3, y: 15.7, z: -2.6
    }

    const farView = {
        x: 6.8, y: 15.5, z: -2.5
    }

    const sideView = {
        x: 50, y: 15, z: -3
    }


    useEffect(() => {

        // switch (step) for camera position
        if (cameraRef && step === 1) {
            cameraRef.current?.setLookAt(2.5, 16.2, -18.5, farView.x, farView.y, farView.z, true)
        }
        if (cameraRef && step === 2) {
            cameraRef.current?.setLookAt(43, 17, 120, sideView.x, sideView.y, sideView.z, true)
        }
        if (cameraRef && step === 3) {
            cameraRef.current?.setLookAt(30, -50, -30, bird.x, bird.y, bird.z, true)
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
        if (b <= 0.5 && step !== 1) {
            setStep(1)
        }
        if ((b >= 0.8 && step < 2) || (c < 0.5 && step > 2)) {
            setStep(2)
        }
        if ((c >= 0.5 && step < 3) || (c < 0.5 && step > 3)) {
            setStep(3)
        }

        // console.log(step)
        // console.log(b, c)

    })

    const width = 1;
    const height = 1.61803398875;

    // return null;
    return (<Scroll html>

        <>
            <section className="h-screen w-screen relative">
                <div className="flex items-center h-full px-4">
                    {/* Conteneur du texte */}
                    <div
                        className="max-w-2xl w-full bg-white/20 backdrop-blur-lg rounded-md p-6 md:py-8 md:px-12 mx-auto md:mx-0 md:ml-16">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            className="text-center"
                        >
                            <AnimatedTitle text="My Projects"/>
                            <motion.p
                                className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: 0.5}}
                            >
                                As a web developer, I've had the opportunity to work on various exciting projects.
                                Here's a showcase of my achievements and creative solutions.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>


                <section className="h-screen w-screen relative">


                    <div className="min-h-screen flex flex-col items-center justify-center p-4">

                    </div>


                </section>
            </section>
            <section className="h-screen w-screen relative ">
                <div className="flex items-center h-full px-4">
                    {/* Conteneur du texte */}
                    <div
                        className="max-w-2xl w-full bg-white/20 backdrop-blur-lg rounded-md p-6 md:py-8 md:px-12 mx-auto md:mx-0 md:mr-16 md:ml-auto">
                        <h1 className="text-gray-50 text-3xl font-bold tracking-tight sm:text-4xl">
                            Here is a list of my featured projects
                        </h1>
                        <p className="text-gray-300 mt-4">
                            These are the last or biggest projects I have worked on.
                        </p>

                        <div className="grid grid-cols-1 gap-4 mt-8">
                            <div
                                className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/20 p-4 rounded-md">
                                <div className="flex items-center">
                                    <img src="https://via.placeholder.com/150" alt="project"
                                         className="w-20 h-20 rounded-md"/>
                                    <div className="ml-4">
                                        <h2 className="text-gray-50 font-bold text-xl">Project 1</h2>
                                        <p className="text-gray-300">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="h-screen w-screen relative ">
                <div className="flex flex-col items-center h-full px-4">
                    {/* Conteneur du texte */}
                    <div
                        className="max-w-2xl w-full bg-white/20 backdrop-blur-lg rounded-md p-6 md:py-8 md:px-12 mx-auto text-center">
                        <h1 className="text-gray-50 text-3xl font-bold tracking-tight sm:text-4xl">
                            All my projects
                        </h1>
                        <p className="text-gray-300 mt-4">
                            Here is the list of all the projects I have worked on, along with the timeline.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="mt-12 w-full max-w-4xl">
                        <div className="relative border-l border-gray-300">
                            {/* Exemple de projets à mapper */}
                            <div className="mb-8 ml-6">
                                <div
                                    className="absolute -left-3 w-6 h-6 bg-gray-50 rounded-full border-2 border-green-400"></div>
                                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-md">
                                    <h2 className="text-gray-50 font-bold text-xl">Project 1</h2>
                                    <p className="text-gray-300 text-sm mt-2">Description of the project goes here.</p>
                                    <span className="text-gray-400 text-xs">January 2023</span>
                                </div>
                            </div>

                            <div className="mb-8 ml-6">
                                <div
                                    className="absolute -left-3 w-6 h-6 bg-gray-50 rounded-full border-2 border-green-400"></div>
                                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-md">
                                    <h2 className="text-gray-50 font-bold text-xl">Project 2</h2>
                                    <p className="text-gray-300 text-sm mt-2">Description of another project.</p>
                                    <span className="text-gray-400 text-xs">March 2023</span>
                                </div>
                            </div>

                            <div className="mb-8 ml-6">
                                <div
                                    className="absolute -left-3 w-6 h-6 bg-gray-50 rounded-full border-2 border-green-400"></div>
                                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-md">
                                    <h2 className="text-gray-50 font-bold text-xl">Project 3</h2>
                                    <p className="text-gray-300 text-sm mt-2">Another detailed description.</p>
                                    <span className="text-gray-400 text-xs">June 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>


    </Scroll>)
}

async function getProject() {
    const res = await fetch('https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*')
    const data = await res.json()

    return data.data
}
