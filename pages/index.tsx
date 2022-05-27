import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, PresentationControls } from '@react-three/drei'
import { MeModel, LightSceneModel } from '../components/Me'
import Head from 'next/head'
import { PuffLoader } from 'react-spinners'
import { SocialIcons } from '../components/Social'


export default function Home() {
  return (


    <div className='font-varela-round bg-slate-800 text-Sky-50'>

      <Head>

        <title>Bréval LE FLOCH | Dév </title>


        <link rel='preconnect' href='https://fonts.googleapis.com' />

        {/*@ts-ignore*/}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
              rel='stylesheet' />

      </Head>


      <header
        className='fixed top-0 left-0 w-screen h-[40px] xl:h-[80px] z-50 flex flex-row xl:flex-row justify-between items-center px-4 xl:px-20 mt-8 xl:mt-0'>

        <a href='/' className='w-8 h-8 xl:w-10 xl:h-10'>
          <img src='/logo.png'
               alt='Logo Bréval Le Floch Signature' />
        </a>
        <a href='/contact' className='hidden text-sm button-animated smoke font-body xl:block text-white'>
          <div><span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span></div>
        </a>
      </header>


      <div className='flex relative justify-center items-center w-screen h-screen'>


        <h1 className='z-20 text-3xl text-slate-50 font-semibold tracking-widest uppercase xl:text-8xl'
            id='title-landing'>
          BRÉVAL LE FlOCH
        </h1>


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
                config={{ mass: 1, tension: 100, friction: 8 }} // Spring config
              >


                <Suspense fallback={
                  null
                }>
                  <MeModel scale={5} />
                  <LightSceneModel scale={5} />
                </Suspense>

              </PresentationControls>
            </Canvas>

          </div>
        </div>

        <SocialIcons />


        <div className='flex absolute bottom-0 left-0 justify-center items-center p-8 mb-12 xl:p-20 xl:mb-0'>
          <h2
            className='text-sm tracking-wider opacity-20 origin-bottom-left -rotate-90 font-body text-sky-50 xl:text-xl'>‣
            BRÉVAL LE FLOCH </h2>

        </div>


      </div>


      <section className='bg-slate-900 rounded-t-full h-[30px]
      flex justify-center items-center
      drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] z-1'>
        {/* @ts-ignore */}
        <hr className='w-[50px]' />

        {/*// Figure here*/}

      </section>


      <section className='bg-slate-900 h-[100vh] z-2
      flex flex-col justify-center items-center
      text-sky-50 text-lg'>

        <p>Let me introduce myself</p>

        <p>I'm a french studend living Nantes, I have a few dreams and I loved computering the moment I touched
          my first pc at 4yo </p>

        <p>You know, their is a lot of things to learn and understand in the universe, and for me, computering
          is just like another universe opening to us, with every thig to explore</p>

        {/*// Figure here*/}

      </section>

    </div>


  )
}

