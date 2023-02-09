import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {PresentationControls} from '@react-three/drei'
import {MeModel, LightSceneModel} from '../components/Me'
import Head from 'next/head'
import {SocialIcons} from '../components/Social'
import 'animate.css/animate.min.css'
import {Title} from '../components/title'
import Image from "next/image";


export default function Home() {
    return (


        <div className='font-varela-round bg-slate-800 text-Sky-50 snap-y snap-proximity'>

            <Head>
                <title>Bréval LE FLOCH | Dev </title>
                <meta
                    name="Portefolio of Bréval LE FLOCH, Developer specialized in the development of web and mobile applications."/>

                <link rel='preconnect' href='https://fonts.googleapis.com'/>

                {/*@ts-ignore*/}
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin/>
                <link href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
                      rel='stylesheet'/>

            </Head>


            <header
                className='fixed top-0 left-0 w-screen h-[40px] xl:h-[80px] z-50 flex flex-row xl:flex-row justify-between items-center px-4 xl:px-20 mt-8 xl:mt-0'>

                <a href='/' className='w-8 h-8 xl:w-10 xl:h-10'>
                    <Image src='/logo.png' width={100} height={100}
                           alt='Logo Bréval Le Floch Signature'/>
                </a>
                <a href='mailto:breval.lefloch@gmail.com'
                   className='hidden text-sm button-animated smoke font-body xl:block text-white'>
                    <div>
                        <span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span>
                    </div>
                </a>
            </header>


            <div className='flex relative justify-center items-center w-screen h-screen'>

                <Title/>

                <div
                    className='flex absolute top-1/2 left-1/2 z-10 justify-center items-center transform -translate-x-1/2 -translate-y-1/2'>


                    <div
                        className='p-0 m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden clear-both'>

                        <div className='area'>
                            <ul className='circles'>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>

                        <Suspense fallback={
                            <div></div>
                        }>
                            <Canvas>
                                <PresentationControls

                                    global={false} // Spin globally or by dragging the model
                                    cursor={true} // Whether to toggle cursor style on drag
                                    snap={true} // Snap-back to center (can also be a spring config)
                                    speed={1} // Speed factor
                                    zoom={1} // Zoom factor when half the polar-max is reached
                                    rotation={[0, 0, 0]} // Default rotation
                                    polar={[-Math.PI / 4, Math.PI / 8]} // Vertical limits
                                    azimuth={[-Math.PI / 2, Math.PI / 2]} // Horizontal limits
                                    config={{mass: 1, tension: 100, friction: 8}} // Spring config
                                >

                                    <MeModel scale={5}/>
                                    <LightSceneModel scale={5}/>
                                </PresentationControls>
                            </Canvas>
                        </Suspense>

                    </div>
                </div>

                <SocialIcons/>


                <div className='flex absolute bottom-0 left-0 justify-center items-center p-8 mb-12 xl:p-20 xl:mb-0'>
                    <h2
                        className='text-sm tracking-wider opacity-20 origin-bottom-left -rotate-90 font-body text-sky-50 xl:text-xl'>‣
                        BRÉVAL LE FLOCH </h2>

                </div>


            </div>


            <section className='bg-slate-900 rounded-t-full h-[30px] snap-start
      flex justify-center items-center
      drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] z-1'>
                {/* @ts-ignore */}
                <hr className='w-[50px]'/>

                {/*// Figure here*/}

            </section>


            <section className='bg-slate-900 h-[100vh] z-20 box-border flex-wrap w-full
      flex flex-col justify-center items-center snap-start
      text-sky-50  '>


                <h2 className='xl:text-3xl text-xl font-medium animate__animated animate__fadeInDown'>Hello, my name is
                    Bréval Le
                    Floch</h2>
                <p className='xl:text-xl text-2xs xl:m-[150px] m-8 animate__animated animate__fadeInUp'>
                    and I'm a French student based in Nantes. From a young age, I've been fascinated by the endless
                    possibilities
                    of computers and technology. As I continue to learn and explore this ever-evolving field, I am
                    driven by my
                    passion for discovery and my dreams for the future.
                </p>


            </section>

        </div>


    )
}

