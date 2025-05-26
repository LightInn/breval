"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 2000)

    return () => clearTimeout(timer);
  }, [])

  return (
    <div
      className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center">
        <svg
          width="80"
          height="80"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-6">
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="2"
            className="stroke-primary"
            strokeWidth="2" />
          <motion.path
            d="M16 8L24 16L16 24L8 16L16 8Z"
            className="fill-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }} />
        </svg>

        <h2 className="text-2xl font-bold mb-4 text-primary">Loading Experience</h2>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 2 }} />
        </div>

        <p className="text-sm text-muted-foreground mt-4 animate-pulse">Preparing digital canvas...</p>
      </motion.div>
    </div>
  );
}
