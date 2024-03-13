"use client";
import './App.css';
import Navbar from "./Components/navbar/Navbar";
import React, {useEffect, useState} from "react";
import {usePalette} from 'react-palette';
import {createGlobalStyle} from 'styled-components';
import AboutCoverSection from "@/components/About/AboutCoverSection";
import Link from "next/link";
import Skills from "@/components/About/Skills";
import {
    useRive,
    useStateMachineInput,
} from "@rive-app/react-canvas";



export default function About() {
    const bibiliothecqueDImage = [
        '/blured_video.png',

    ]

    const [imgeUrl, setUrl] = useState('#fff');

    const [color, setColor] = useState('')


    useEffect(() => {
            setUrl(bibiliothecqueDImage[Math.floor(Math.random() * bibiliothecqueDImage.length)])
        }, []
    )


    const {data} = usePalette(imgeUrl)
    const AppStyle = createGlobalStyle`html {

      --bg-img: url(${imgeUrl});

      --primary: ${data.vibrant};
      --secondary: ${data.muted};

      --primary-light: ${data.lightVibrant};
      --secondary-light: ${data.lightMuted};


      --primary-dark: ${data.darkVibrant};
      --secondary-dark: ${data.darkMuted};
        
    }`;


    const { rive, RiveComponent } = useRive({
        src: 'alien_spider.riv',
        stateMachines: "State Machine 1",
        autoplay: false,

    });

    const highlightCanada = useStateMachineInput(
        rive,
        "stateMachine",
        "canada"
    );







    return (
        <div>


            <AppStyle/>
            <Navbar/>

            <div className="p-20 m-20">

                <AboutCoverSection/>

                <Skills/>

                <h2 className="mt-8 font-semibold text-lg md:text-2xl self-start mx-5 xs:mx-10 sm:mx-12 md:mx-16 lg:mx-20 text-dark dark:text-light dark:font-normal">
                    Have a project in mind? Reach out to me 📞 from <Link href="/contact"
                                                                         className="!underline underline-offset-2">here</Link> and
                    let&apos;s make it happen.
                </h2>


                <RiveComponent className="w-96 h-96"
                    onMouseEnter={() => rive && rive.play()}
                    onMouseLeave={() => rive && rive.pause()}
                />

                <input onChange={(e) => setColor(e.target.value)} value={color}/>


                    <div>PHP</div>
                    <div>JS</div>
                    <div>Dart</div>
                    <div>Kotlin</div>
                    <div>Java</div>
                    <div>C</div>
                    <div>HTML</div>
                    <div>C++</div>
                    <div>VueJS</div>
                    <div>Ionic</div>
                    <div>C#</div>
                    <div>CSS</div>
                    <div>Angular</div>
                    <div>Flask</div>
                    <div>Python</div>
                    <div>Flutter</div>

                    <div>Ansible</div>
                    <div>MariaDB</div>
                    <div>Postgresql</div>
                    <div>Apache</div>
                    <div>Git</div>
                    <div>SSH</div>
                    <div>OpenVPN</div>
                    <div>Bash</div>

            </div>
        </div>
);
}
