import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const Blob = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 50,
        y: mousePosition.y - 50,
      }}
      className="fixed top-0 left-0 z-50 h-20 w-20 rounded-full bg-blue-500"
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
    />
  )
}

export default Blob
