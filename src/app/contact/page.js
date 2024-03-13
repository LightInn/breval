"use client";
import './App.css';
import Navbar from "./Components/navbar/Navbar";
import Page from "./Components/page/Page";
import React, {useEffect, useState} from "react";
import {usePalette} from 'react-palette';
import {createGlobalStyle} from 'styled-components';


export default function About() {
    const bibiliothecqueDImage = [
        '/blured_video.png',

    ]

    const [imgeUrl, setUrl] = useState('');


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
    return (
        <div>
            <AppStyle/>
            <Navbar/>

            <Page/>
        </div>
    );
}




//     '/img/bg/1.jpg',
//     '/img/bg/2.jpg',
//     '/img/bg/3.jpg',
//     '/img/bg/4.jpg',
//     '/img/bg/5.jpg',
//     '/img/bg/8.jpg',
//     '/img/bg/7.jpg',
//     '/img/bg/9.jpg',
//     '/img/bg/10.jpg',
//     '/img/bg/11.jpg',
//     '/img/bg/12.jpg',