"use client";
import "./App.css";
import Navbar from "../../components/About/Navbar";
import React, {useEffect, useState} from "react";
import {usePalette} from "react-palette";
import {createGlobalStyle} from "styled-components";
import AboutCoverSection from "@/components/About/AboutCoverSection";
import Skills from "@/components/About/Skills";
import {Playground} from "@/components/About/Playground";

export default function About() {
  const bibiliothecqueDImage = [
    "/blured_video.png",
    "/dynamic/1.webp",
    "/dynamic/2.webp",
    "/dynamic/3.webp",
    "/dynamic/4.webp",
    "/dynamic/5.jpg",
    "/dynamic/6.jpg",
    "/dynamic/7.jpg",
    "/dynamic/9.jpg",
    "/dynamic/11.jpg",
    "/dynamic/13.jpg",
    "/dynamic/15.jpg",
    "/dynamic/16.jpg",
    "/dynamic/17.jpg",
    "/dynamic/8.jpg",
    "/dynamic/10.jpg",
    "/dynamic/12.jpg",
    "/dynamic/14.jpg",
  ];

  const [imgeUrl, setUrl] = useState("#fff");

  const [color, setColor] = useState("");

  useEffect(() => {
    setUrl(
      bibiliothecqueDImage[
        Math.floor(Math.random() * bibiliothecqueDImage.length)
      ],
    );
  }, []);

  const { data } = usePalette(imgeUrl);
  const AppStyle = createGlobalStyle`html {

        --bg-img: url(${imgeUrl});

        --vibrant: ${data.vibrant};
        --muted: ${data.muted};

        --vibrant-light: ${data.lightVibrant};
        --muted-light: ${data.lightMuted};

        --vibrant-dark: ${data.darkVibrant};
        --muted-dark: ${data.darkMuted};

    }`;

  return (
    <div className="w-full">
      <AppStyle />
      <Navbar />

      <div className="">
        <AboutCoverSection />

        <Playground />

        <Skills />
      </div>
    </div>
  );
}
