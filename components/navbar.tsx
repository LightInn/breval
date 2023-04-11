import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


export function Navbar() {

  const [showTransparentBackground, setShowTransparentBackground] = useState(true)


  function handleNav(e: Event) {

    e.target.scrollingElement.scrollTop > 0 ? setShowTransparentBackground(false) :
      setShowTransparentBackground(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNav(e))
  }, [])

  return (

    <header
      className={'fixed top-0 left-0 w-screen h-[80px] xl:h-[60px] z-50 flex flex-row xl:flex-row justify-center xl:justify-between items-center px-4 xl:px-20 xl:mt-0  xl:rounded-b-[25px] bg-slate-1000 transition-all  ' + (showTransparentBackground ? '2xl:bg-slate-1000/0' : '')}>
      {/*drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)]*/}
      <a href='/'
         className='w-8 h-8 xl:w-10 xl:h-10 translate-y-2  transition-all duration-100 ease-in-out  hover:scale-150 hover:translate-y-3 '>
        <Image src='/logo.png' width={100} height={100}
               alt='Logo signature de Bréval Le Floch' />
      </a>

      <div className='hidden xl:flex justify-between w-[200px] '>
        <Link href='/projet'
              className='hidden text-sm button-animated smoke font-body xl:block text-white'>
          <div>
            <span>G</span><span>A</span><span>L</span><span>E</span><span>R</span><span>I</span><span>E</span>
          </div>
        </Link>
        <a href='mailto:breval.lefloch@gmail.com'
           className='hidden text-sm button-animated smoke font-body xl:block text-white'>
          <div>
            <span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span>
          </div>
        </a>
      </div>

    </header>)
}