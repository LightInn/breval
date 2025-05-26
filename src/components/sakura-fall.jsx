"use client";
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function SakuraFall() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const generatePetals = () => {
      const newPetals = []
      const count = Math.min(window.innerWidth / 25, 25) // Responsive petal count

      for (let i = 0; i < count; i++) {
        newPetals.push({
          id: i,
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          size: 8 + Math.random() * 12,
          rotation: Math.random() * 360,
          delay: Math.random() * 15,
          duration: 10 + Math.random() * 15,
        })
      }

      setPetals(newPetals)
    }

    generatePetals()

    const handleResize = () => {
      generatePetals()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          initial={{
            x: `${petal.x}vw`,
            y: `${petal.y}vh`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            x: [
              `${petal.x}vw`,
              `${petal.x + (Math.random() * 15 - 7.5)}vw`,
              `${petal.x + (Math.random() * 30 - 15)}vw`,
            ],
            y: [`${petal.y}vh`, `${110 + Math.random() * 20}vh`],
            rotate: [petal.rotation, petal.rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}>
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C12 2 14 6 12 10C10 14 12 18 12 18C12 18 10 14 12 10C14 6 12 2 12 2Z"
              fill="rgba(255, 182, 193, 0.8)" />
            <path
              d="M12 2C12 2 10 6 12 10C14 14 12 18 12 18C12 18 14 14 12 10C10 6 12 2 12 2Z"
              fill="rgba(255, 182, 193, 0.8)" />
            <circle cx="12" cy="10" r="2" fill="rgba(255, 255, 255, 0.9)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
