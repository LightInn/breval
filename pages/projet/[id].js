import {Grid, Typography} from '@material-ui/core';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import React, {useState} from 'react'
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// import { RadioGroup } from '@headlessui/react'
// import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'

const product = {


    name: 'Basic Tee',
    price: '$35',
    rating: 3.9,
    reviewCount: 512,
    href: '#',
    breadcrumbs: [
        {id: 1, name: 'Women', href: '#'},
        {id: 2, name: 'Clothing', href: '#'},
    ],
    images: [
        {
            id: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
            imageAlt: "Back of women's Basic Tee in black.",
            primary: true,
        },
        {
            id: 2,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
            imageAlt: "Side profile of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 3,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
    ],
    colors: [
        {name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900'},
        {name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400'},
    ],
    sizes: [
        {name: 'XXS', inStock: true},
        {name: 'XS', inStock: true},
        {name: 'S', inStock: true},
        {name: 'M', inStock: true},
        {name: 'L', inStock: true},
        {name: 'XL', inStock: false},
    ],
    description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
    details: [
        'Only the best materials',
        'Ethically and locally made',
        'Pre-washed and pre-shrunk',
        'Machine wash cold with similar colors',
    ],
}
const policies = [


    {name: 'International delivery', icon: "µ", description: 'Get your order in 2 years'},
    {name: 'Loyalty rewards', icon: "$", description: "Don't look at other tees"},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProjectDetail({project}) {

    return (
        <div className="bg-slate-900 text-white min-h-screen">

            <Head>
                <title>Bréval LE FLOCH | Projets </title>
                <meta name="description"
                      content={project.attributes?.title + " : " + project.attributes?.short_description}/>

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

                <div className="hidden xl:flex justify-between w-[200px] " >
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


            <div className="pt-6 pb-16 sm:pb-24 ">
                <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8">
                    <ol role="list" className="flex items-center space-x-4">


                        <li>
                            <div className="flex items-center">
                                <Link href={"/projet"} className="mr-4 text-sm font-medium text-gray-400">
                                    projets
                                </Link>
                                <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor"/>
                                </svg>
                            </div>
                        </li>


                        <li className="text-sm">
                            <div aria-current="page"
                                 className="font-medium text-glow-500">
                                {project.attributes?.title}
                            </div>
                        </li>
                    </ol>
                </nav>


                <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                        <div className="lg:col-span-5 lg:col-start-8">
                            <div className="flex justify-between">
                                <h1 className="text-xl font-medium text-glow-500">{project.attributes?.title}</h1>
                                <p className="text-sm font-medium text-gray-500">{project.attributes?.date}</p>
                            </div>
                        </div>

                        {/* Image gallery */}
                        <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                            <h2 className="sr-only">Images</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                                {project.attributes?.media?.data?.map((image, idx) => (
                                    <img
                                        key={image.id}
                                        src={"https://breval-api.lightin.io" + image.attributes.url}
                                        alt={image.attributes.name}
                                        className={classNames(
                                            idx === 0 ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                                            'rounded-lg'
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 lg:col-span-5">
                            {/* URL VIEW */}
                            <a
                                type="submit"
                                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-glow-500 py-3 px-8 text-base font-medium text-black hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                href={project.attributes?.url}>
                                {project.attributes?.url}
                            </a>


                            {/* Product details */}
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-400">Description</h2>

                                <div
                                    className="prose prose-sm mt-4 text-gray-50"
                                    dangerouslySetInnerHTML={{__html: project.attributes?.description}}
                                />
                            </div>

                            {project.attributes?.creators &&


                                <section aria-labelledby="policies-heading"
                                         className="mt-10">

                                    {/* Policies */}

                                    <h2 id="policies-heading"  className="text-gray-400">
                                        Autres membres de l'équipe du projet :
                                    </h2>

                                    <dl className="grid mt-4 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                                        {project.attributes?.creators?.map((creator, idx) => (

                                            <a key={idx}
                                               href={"https://" + creator.site}
                                               className="rounded-lg bg-gray-900 p-6 text-center border transition-100 border-glow-600 hover:bg-glow-600 hover:text-black" >
                                                <dt>
                                                    <div className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                                                         aria-hidden="true"/>
                                                    <span
                                                        className="mt-4 text-sm font-medium">{creator.name}</span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-500">{creator.site}</dd>
                                            </a>
                                        ))}

                                    </dl>
                                </section>

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function ecx({project}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            </Grid>
            <Grid item xs={12} md={6}>

                <Typography variant="body1" gutterBottom>
                    {project.attributes?.description}
                </Typography>
                <Typography variant="body2" gutterBottom>

                </Typography>
            </Grid>
        </Grid>
    );
}

export async function getServerSideProps({params}) {
    const {id} = params;

    const res = await fetch(`https://breval-api.lightin.io/api/projets?filters[title][$eq]=${id}&populate=*`);
    const data = await res.json();

    console.log(data)
    console.log(data.data)

    return {
        props: {
            project: data.data[0],
        },
    };
}