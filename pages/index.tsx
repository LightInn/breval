import React from 'react'
import Head from 'next/head'
import { SocialIcons } from '../components/Social'
import 'animate.css/animate.min.css'
import { Title } from '../components/title'
import Image from 'next/image'
import Link from 'next/link'
import { Parallax } from 'react-parallax'
import { Navbar } from '../components/navbar'

export default function Home() {
  return (

    <div className='font-varela-round bg-slate-1000 text-Sky-50 snap-y snap-proximity'>

      <Head>
        <title>Bréval LE FLOCH | Dev </title>
        <meta name='description'
              content="Portfolio de Bréval LE FLOCH, un développeur spécialisé dans le développement d'applications web et mobile sur Nantes." />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='canonical'
          href='https://brev.al/projet'
          key='canonical'
        />

        {/*@ts-ignore*/}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
              rel='stylesheet' />
      </Head>

      <Navbar />


      <div className='flex relative justify-center items-center w-screen h-screen'>

        <Title />

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


            <Parallax blur={{ min: -35, max: 35 }}
                      bgImage='/landing.webp'
                      bgImageAlt='the cat' strength={100}>
              <div className='h-[100vh] hidden 2xl:block'>
              </div>
            </Parallax>
            <Image src={'/landing.webp'} alt={''} className={'absolute top-0 left-0 ' +
              'object-cover opacity-50 -z-10 mix-difference bg-slate-900 2xl:hidden block'} fill={true}
                   loading='eager'
            />


          </div>
        </div>

        <SocialIcons />


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
        <hr className='w-[50px]' />

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
          Je suis un étudiant en alternance qui habite à Nantes.
          Dès mon plus jeune âge, j'ai été fasciné par les possibilités infinies des ordinateurs et des
          nouvelles technologies.
          Alors que je continue d'apprendre et d'explorer cet univers en constant évolution,
          je suis motivé par ma passion de découvrir de nouveaux mondes et leurs nouvelles règles et mes
          rêves."
        </p>

      </section>


      <section className=' h-[100vh] z-20 box-border flex-wrap w-full
      flex flex-col justify-center items-start snap-start
      text-sky-50 relative z-10'>
        <div className={'absolute h-full w-full -z-10'}>
          <Image src={'/projets.png'} alt={''} className={'absolute top-0 left-0 ' +
            'object-cover opacity-50 -z-10 mix-difference bg-slate-900 '} fill={true}
                 loading='eager'
          />
          <div
            className={'absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-[#000000] to-transparent mask-image'} />
        </div>


        <h2
          className='xl:text-3xl text-xl mx-12 lg:mx-80 font-medium animate__animated animate__fadeInDown z-10'> Galerie
          de projets</h2>
        <Link
          type='button'
          className='inline-flex items-center mx-12 lg:mx-80 my-12 px-6 py-3 border border-transparent text-black font-medium
                    rounded-full shadow-sm text-black bg-glow-500 hover:bg-glow-600 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500'
          href={'/projet'}>
          Mes projets
        </Link>

      </section>


    </div>


  )
}

