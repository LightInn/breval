"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Divider from "../components/divider";
import Presentation from "../components/presentation";

export default function Home() {
  return (
    <div className="text-Sky-50 snap-y snap-proximity bg-slate-1000 font-varela-round">
      <Head>
        <title>Bréval LE FLOCH | Dev </title>
        <meta
          name="description"
          content="Portfolio de Bréval LE FLOCH, un développeur spécialisé dans le développement d'applications web et mobile sur Nantes."
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://brev.al/projet" key="canonical" />

        {/*@ts-ignore*/}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <Hero />
      <Divider top={true} />
      <Presentation />
      <Divider top={false} />
      <section
        className="relative z-20 box-border flex
      h-[100vh] w-full -translate-y-[30px] transform snap-start
      flex-col flex-wrap items-start justify-center pb-[30px] text-sky-50"
      >
        <div className={"absolute -z-10 h-full w-full"}>
          <Image
            src={"/projets.png"}
            alt={""}
            className={
              "absolute left-0 top-0 " +
              "mix-difference -z-10 bg-slate-1000 object-cover opacity-50 "
            }
            fill={true}
            loading="eager"
          />
          <div
            className={
              "mask-image absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#000101] via-transparent to-transparent"
            }
          />
          <div
            className={
              "mask-image-bottom absolute left-0 top-0 h-full w-full bg-gradient-to-t from-[#000101] via-transparent to-transparent"
            }
          />
        </div>

        <div
          className={
            "flex w-screen flex-col items-center justify-center gap-4 md:items-start lg:px-80"
          }
        >
          <h2 className="z-10 text-xl font-medium  xl:text-3xl">
            Projects Gallery
          </h2>
          <div>
            <Link
              type="button"
              className="button inline-flex items-center rounded-full border border-transparent bg-glow-500 px-3 py-3  font-medium
                    text-black shadow-sm hover:bg-glow-600 focus:outline-none focus:ring-2 focus:ring-indigo-500
                    focus:ring-offset-2 no-underline"
              href={"/projet"}
            >
              My projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
