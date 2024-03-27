import { Title } from "./title";
import Image from "next/image";
import { SocialIcons } from "./Social";
import React from "react";
import rgbDataURL from "@/services/dataurl.services";

export default function Hero() {
  return (
    <div className="relative z-20 flex h-screen w-screen items-center justify-center">
      <Title />

      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
        <div className="video-background relative clear-both m-0 h-[100vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0">
          <div className="area ">
            <ul className="circles">
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

          <Image
            src={"/blured_video.png"}
            alt={""}
            className={
              "absolute left-0 top-0 blur-md  " +
              "mix-difference -z-10 block bg-slate-900 object-cover opacity-75  "
            }
            loading="eager"
            placeholder="blur"
            blurDataURL={rgbDataURL(231, 183, 202)}
            quality={10}
            fill={true}
          />

          <iframe
            title={"landing page background video"}
            className={
              "absolute left-0 top-0 h-full w-full object-cover object-center border-0 " +
              "mix-difference animate-video -z-10 block bg-slate-900 object-cover opacity-75"
            }
            id="topHeroVideo"
            src="https://player.vimeo.com/video/879007060?background=1"
            width="1920"
            height="1080"
            allow="autoplay"
            data-ready="true"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <SocialIcons />

      <div className="absolute bottom-0 left-0 mb-12 flex items-center justify-center p-8 xl:mb-0 xl:p-20">
        <h2 className="z-50 origin-bottom-left -rotate-90 font-body text-sm tracking-wider text-glow-500 opacity-80 xl:text-xl">
          ‣ BRÉVAL LE FLOCH{" "}
        </h2>
      </div>
    </div>
  );
}
