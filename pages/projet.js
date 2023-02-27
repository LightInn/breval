import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Project({ projects }) {
  return (
    <div className='bg-slate-900 min-h-screen'>

      <Head>
        <title>Bréval LE FLOCH | Projets </title>
        <meta name='description'
              content='Liste des projets de developpement realisé par Bréval LE FLOCH.' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='canonical'
          href='https://brev.al'
          key='canonical'
        />

        {/*@ts-ignore*/}
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link href='https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'
              rel='stylesheet' />
      </Head>


      <header
        className='fixed top-0 left-0 w-screen h-[40px] z-50 flex flex-row xl:flex-row justify-center xl:justify-between items-center px-4 xl:px-20 xl:mt-0
                bg-slate-1000   drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] xl:rounded-b-[25px]'>

        <a href='/'
           className='w-8 h-8 xl:w-10 xl:h-10 translate-y-2  transition-all duration-100 ease-in-out  hover:scale-150 hover:translate-y-3 '>
          <Image src='/logo.png' width={100} height={100}
                 alt='Logo signature de Bréval Le Floch' />
        </a>

        <div className='hidden xl:flex justify-between w-[200px] '>
          <Link href='/projet'
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


      <div className='mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 '>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl'>Mes projets</h2>
          <p className='mt-4 text-gray-300'>
            En tant que developpeur web, j'ai eu l'occasion de travailler sur des projets variés.
            Voici une liste non exhaustive de mes réalisations.
          </p>
        </div>

        <div className='mt-16 space-y-16'>
          {projects.map((project, projectIdx) => (
            <Link
              key={project.attributes.title}
              className='flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 p-8
                            border-2 border-slate-900 hover:border-glow-600 hover:shadow-lg
                            rounded-lg transition ease-in-out duration-150  overflow-hidden'
              href={'/projet/' + project.attributes.title}>
              <div
                className={classNames(
                  projectIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:mt-0 lg:row-start-1 lg:col-span-5 xl:col-span-4'
                )}
              >
                <h3 className='text-lg font-medium text-gray-50'> {project.attributes.title}</h3>
                <p className='mt-2 text-sm text-gray-300'> {project.attributes.short_description}</p>
                <div
                  className='inline-flex items-center my-12 px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm
                                     bg-glow-500 text-black hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-glow-600'
                >en savoir plus
                </div>
              </div>

              <div
                className={classNames(
                  projectIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                  'flex-auto lg:row-start-1 lg:col-span-7 xl:col-span-8'
                )}
              >
                <div className='aspect-w-5 aspect-h-2 overflow-hidden rounded-lg bg-gray-100'>
                  <img
                    src={'https://breval-api.lightin.io' + project.attributes.media.data[0]?.attributes.url}
                    alt={project.attributes.media.data[0]?.attributes.name}
                    className='object-cover object-center' />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps() {
  const res = await fetch('https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*')
  const data = await res.json()

  return {
    props: {
      projects: data.data,
      revalidate: 3600
    }
  }
}