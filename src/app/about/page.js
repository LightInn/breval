"use client";
import "./App.css";
import Navbar from "../../components/About/Navbar";
import React, { useEffect, useState } from "react";
import { usePalette } from "react-palette";
import { createGlobalStyle } from "styled-components";
import AboutCoverSection from "@/components/About/AboutCoverSection";
import Skills from "@/components/About/Skills";
import { Playground } from "@/components/About/Playground";

export default function About() {
  const bibiliothecqueDImage = [
    // "/dynamic/0.webp",
    "/dynamic/1.webp",
    "/dynamic/2.webp",
    "/dynamic/3.webp",
    "/dynamic/4.webp",
    "/dynamic/5.webp",
    "/dynamic/6.webp",
    "/dynamic/7.webp",
    "/dynamic/8.webp",
    "/dynamic/9.webp",
    "/dynamic/10.webp",
    "/dynamic/11.webp",
    "/dynamic/12.webp",
    "/dynamic/13.webp",
    "/dynamic/14.webp",
    "/dynamic/15.webp",
    "/dynamic/16.webp",
    "/dynamic/17.webp",
    "/dynamic/18.webp",
    "/dynamic/19.webp",
    "/dynamic/20.webp",
    "/dynamic/21.webp",
    "/dynamic/22.webp",
    "/dynamic/23.webp",
    "/dynamic/24.webp",
    "/dynamic/25.webp",
  ];

  const [imgeUrl, setUrl] = useState("/dynamic/0.webp");

  const [color, setColor] = useState("");

  const [reload, setReload] = useState(0);

  useEffect(() => {
    setUrl(
      bibiliothecqueDImage[
        Math.floor(Math.random() * bibiliothecqueDImage.length)
      ],
    );
  }, [reload]);

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
        <AboutCoverSection setReload={setReload}  />

        <Playground image={imgeUrl} setReload={setReload} />

        <Skills />
      </div>
    </div>
  );
}
