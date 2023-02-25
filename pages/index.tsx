import React, {Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {PresentationControls} from '@react-three/drei'
import {LightSceneModel, MeModel} from '../components/Me'
import Head from 'next/head'
import {SocialIcons} from '../components/Social'
import 'animate.css/animate.min.css'
import {Title} from '../components/title'
import Image from "next/image";
import Link from 'next/link'
import {responsiveFontSizes} from "@material-ui/core";


export default function Home() {
    return (

        <div className='font-varela-round bg-slate-1000 text-Sky-50 snap-y snap-proximity'>

            <Head>
                <title>Bréval LE FLOCH | Dev </title>
                <meta name="description"
                      content="Portfolio de Bréval LE FLOCH, un développeur spécialisé dans le développement d'applications web et mobile sur Nantes."/>

                <link rel='preconnect' href='https://fonts.googleapis.com'/>

                {/*@ts-ignore*/}
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin/>
                <link href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
                      rel='stylesheet'/>
            </Head>


            <header
                className='fixed top-0 left-0 w-screen h-[40px] xl:h-[40px] z-50 flex flex-row xl:flex-row justify-center xl:justify-between items-center px-4 xl:px-20 xl:mt-0
                bg-slate-1000   drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] xl:rounded-b-[25px]'>

                <a href='/'
                   className='w-8 h-8 xl:w-10 xl:h-10 translate-y-2  transition-all duration-100 ease-in-out  hover:scale-150 hover:translate-y-3 '>
                    <Image src='/logo.png' width={100} height={100}
                           alt='Logo signature de Bréval Le Floch'/>
                </a>

                <div className="hidden xl:flex justify-between w-[200px] ">
                    <Link href="/projet"
                          className='hidden text-sm button-animated smoke font-body xl:block text-white'>
                        <div>
                            <span>G</span><span>A</span><span>L</span><span>L</span><span>E</span><span>R</span><span>I</span><span>E</span>
                        </div>
                    </Link>
                    <a href='mailto:breval.lefloch@gmail.com'
                       className='hidden text-sm button-animated smoke font-body xl:block text-white'>
                        <div>
                            <span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span>
                        </div>
                    </a>
                </div>

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
                        className='text-sm tracking-wider opacity-20 origin-bottom-left -rotate-90 font-body text-glow-500 xl:text-xl'>‣
                        BRÉVAL LE FLOCH </h2>

                </div>


            </div>


            <section className='bg-slate-900  h-[30px] snap-start
      flex justify-center items-center
      drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] z-1 rounded-t-full'>
                {/* @ts-ignore */}
                <hr className='w-[50px]'/>

                {/*// Figure here*/}

            </section>


            <section className='bg-slate-900 h-[100vh] z-20 box-border flex-wrap w-full
      flex flex-col justify-center items-center snap-start
      text-sky-50  '>


                <h2 className='xl:text-3xl text-xl font-medium m-8 animate__animated animate__fadeInDown'>Bonjour, je
                    m'appelle
                    <span className='text-glow-500'>
                        &nbsp;
                        Bréval Le
                    Floch
                    </span></h2>
                <p className='xl:text-xl text-2xs xl:m-[150px] m-8 lg:max-w-screen-lg
                 animate__animated animate__fadeInUp'>
                    Je suis un étudiant en alterance qui habite à Nantes.
                    Dès mon plus jeune âge, j'ai été fasciné par les possibilités infinies des ordinateurs et des
                    nouvelles technologies.
                    Alors que je continue d'apprendre et d'explorer cet univers en constant évolution,
                    je suis motivé par ma passion de découvrir de nouveaux mondes et leurs nouvelles règles et mes
                    rêves."
                </p>

            </section>


            <section className=' h-[100vh] z-20 box-border flex-wrap w-full
      flex flex-col justify-center items-start snap-start
      text-sky-50 relative bg-slate-900 z-10'>
                <div className={"absolute h-full w-full -z-10"}>
                    <Image src={"/projets.png"} alt={""} className={"absolute top-0 left-0 " +
                        "object-cover opacity-50 -z-10 mix-difference bg-slate-900 "} fill={true}></Image>
                    <div
                        className={"absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-[#000000] to-transparent mask-image"}/>
                </div>


                <h2 className='xl:text-3xl text-xl mx-12 lg:mx-80 font-medium animate__animated animate__fadeInDown z-10'> Galerie
                    de projets</h2>
                <Link
                    type="button"
                    className="inline-flex items-center mx-12 lg:mx-80 my-12 px-6 py-3 border border-transparent text-black font-medium
                    rounded-full shadow-sm text-white bg-glow-500 hover:bg-glow-600 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500"
                    href={"/projet"}>
                    Mes projets
                </Link>

            </section>

        </div>


    )
}

