import React, { useEffect, useRef, useState } from 'react'

export function Title() {
  const [isLoading, setIsLoading] = useState(true)
  const titleRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <h1
      className={`z-20 text-3xl font-semibold uppercase tracking-widest text-slate-50 xl:text-8xl ${
        isLoading ? 'loading' : ''
      }`}
      id="title-landing"
      ref={titleRef}
    >
      BRÉVAL LE FlOCH
    </h1>
  )
}
