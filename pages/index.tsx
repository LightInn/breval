import React, {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {Vector3} from 'three';
import {Me} from '../components/Me';
import {Headers} from "next/dist/server/web/spec-compliant/headers";
import Head from "next/head";


export default function Home() {
    return (


        <div className="font-varela-round">

            <Head>

                <title>Bréval LE FLOCH | Dév </title>


                <link rel="preconnect" href="https://fonts.googleapis.com"/>

                {/*@ts-ignore*/}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
                      rel="stylesheet"/>

            </Head>


            <div style={{width: "50vw", height: "50vh"}} className="bg-red-500">
                {/*<Canvas>*/}
                {/*    < OrbitControls makeDefault position={new Vector3(0, 0, 5)}/>*/}
                {/*    <ambientLight/>*/}
                {/*    <pointLight position={[10, 10, 10]}/>*/}

                {/*    <Suspense fallback={null}>*/}
                {/*        <Me/>*/}
                {/*    </Suspense>*/}

                {/*</Canvas>*/}
            </div>

            <nav>

                <p className="bg-red-500 ">brev.al</p>

                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Project</li>
                    <li>Resume</li>
                    <li>Social</li>
                </ul>
            </nav>


            <section>

                <p>Hi !</p>
                <h1>I'm Bréval Le Floch</h1>
                <h2>A developper</h2>


                {/*// Figure here*/}

            </section>


            <section>
                <p>Let me introduce myself</p>


                <p>I'm a french studend living Nantes, I have a few dreams and I loved computering the moment I touched
                    my first pc at 4yo </p>
                <p>You know, their is a lot of things to learn and understand in the universe, and for me, computering
                    is just like another universe opening to us, with every thig to explore</p>
            </section>


        </div>
    )
}

