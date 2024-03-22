"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [showTransparentBackground, setShowTransparentBackground] =
    useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleNav(e) {
    // @ts-ignore
    e.target.scrollingElement.scrollTop > 0
      ? setShowTransparentBackground(false)
      : setShowTransparentBackground(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNav(e));
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 flex w-screen flex-col items-center justify-center text-black transition-all md:h-[80px] backdrop-blur-md md:backdrop-filter-none`}
    >
      {/* pill */}
      <div
        className={`hidden md:flex w-max-[500px] h-[60px] w-[500px] flex-row items-center justify-center rounded-full
                    bg-glow-500/90 px-20 opacity-90 backdrop-blur-xl drop-shadow-[0px_6px_23px_-2px_rgba(0,0,0,0.9)]
                    transition-all hover:opacity-100 
                    ${
                      showTransparentBackground
                        ? ""
                        : "h-[40px] rounded-t-none hover:h-[60px] hover:rounded-full translate-y-[-20px] hover:translate-y-[10px]"
                    }
                    `}
      >
        <Link
          href="/"
          className={`m-0 flex origin-center 
                     items-center justify-center rounded-full p-0 transition-all
                     duration-100  ease-in-out hover:w-24 h-full w-16 no-underline`}
        >
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo signature de Bréval Le Floch"
          />
        </Link>

        <Link
          href="/projects"
          className={`button-animated  smoke m-0 origin-center items-center justify-center 
                     rounded-full p-0 transition-all duration-100 
                     ease-in-out hover:w-32 flex h-full w-24 no-underline
                     `}
          // ${showTransparentBackground ? '' : 'md:w-0  hover:w-32'}
        >
          <div>
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span>J</span>
            <span>E</span>
            <span>C</span>
            <span>T</span>
            <span>S</span>
          </div>
        </Link>
        <Link
          href="/blog"
          className={`button-animated  smoke m-0 hidden origin-center items-center justify-center 
                     rounded-full p-0 transition-all duration-100 
                     ease-in-out hover:w-32 md:flex h-full w-24 no-underline
                     `}
          // ${showTransparentBackground ? '' : 'md:w-0  hover:w-32'}
        >
          <div>
            <span>B</span>
            <span>L</span>
            <span>O</span>
            <span>G</span>
          </div>
        </Link>
        <Link
          href="/about"
          className={`button-animated  smoke m-0 origin-center items-center justify-center 
                     rounded-full p-0 transition-all duration-100 
                     ease-in-out flex h-full w-24 hover:w-32
                     `}
        >
          <div>
            <span>A</span>
            <span>B</span>
            <span>O</span>
            <span>U</span>
            <span>T</span>
          </div>
        </Link>
      </div>

      {/* Mobile view under md*/}
      <div
        className={
          "flex flex-col md:hidden  w-full " +
          (isMobileOpen ? "bg-accent/60" : "")
        }
      >
        <div
          className={
            "flex h-[60px] bg-accent/60 justify-between items-center px-4"
          }
        >
          <Link
            href="/public"
            className={`m-0 flex origin-center 
                     items-center justify-center rounded-full p-0 transition-all
                     duration-100  ease-in-out h-full w-16 no-underline`}
          >
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Logo signature de Bréval Le Floch"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="absolute -inset-0.5"></span>

            <span className="sr-only">Open main menu</span>

            <svg
              x-description="Icon when menu is closed."
              className={"block h-6 w-6" + (isMobileOpen ? " hidden" : "")}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              ></path>
            </svg>

            <svg
              x-description="Icon when menu is open."
              className={"h-6 w-6" + (isMobileOpen ? " block" : " hidden")}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className={" h-screen " + (isMobileOpen ? "block" : "hidden")}>
          <div
            className={"px-2 pt-2 pb-3 space-y-1"}
            id="mobile-menu"
            aria-expanded="false"
          >
            <Link
              href="/public"
              className={
                "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              }
            >
              Home
            </Link>
            <Link
              href="/projet"
              className={
                "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              }
            >
              Projet
            </Link>
            <Link
              href="/blog"
              className={
                "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              }
            >
              Blog
            </Link>
            {/*<Link*/}
            {/*    href="/contact"*/}
            {/*    className={"text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}*/}
            {/*>*/}
            {/*    Contact*/}
            {/*</Link>*/}
          </div>
        </div>
      </div>
    </header>
  );
}
