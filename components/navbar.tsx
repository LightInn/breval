import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export function Navbar() {
  const [showTransparentBackground, setShowTransparentBackground] =
    useState(true)

  function handleNav(e: Event) {
    // @ts-ignore
    e.target.scrollingElement.scrollTop > 0
      ? setShowTransparentBackground(false)
      : setShowTransparentBackground(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNav(e))
  }, [])

  return (
    <header
      className={
        'fixed left-0 top-0 z-50 flex h-[80px] w-screen flex-row items-center justify-center bg-slate-1000 px-4 transition-all xl:mt-0 xl:h-[60px] xl:flex-row  xl:justify-between xl:rounded-b-[25px] xl:px-20  ' +
        (showTransparentBackground ? '2xl:bg-slate-1000/0' : '')
      }
    >
      {/*drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)]*/}
      <a
        href="/"
        className="h-8 w-8 translate-y-2 transition-all duration-100  ease-in-out hover:translate-y-3 hover:scale-150  xl:h-10 xl:w-10 "
      >
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Logo signature de Bréval Le Floch"
        />
      </a>

      <div className="hidden w-[200px] justify-between xl:flex ">
        <Link
          href="/projet"
          className="button-animated smoke hidden font-body text-sm text-white xl:block"
        >
          <div>
            <span>G</span>
            <span>A</span>
            <span>L</span>
            <span>E</span>
            <span>R</span>
            <span>I</span>
            <span>E</span>
          </div>
        </Link>
        <a
          href="mailto:breval.lefloch@gmail.com"
          className="button-animated smoke hidden font-body text-sm text-white xl:block"
        >
          <div>
            <span>C</span>
            <span>O</span>
            <span>N</span>
            <span>T</span>
            <span>A</span>
            <span>C</span>
            <span>T</span>
          </div>
        </a>
      </div>
    </header>
  )
}
