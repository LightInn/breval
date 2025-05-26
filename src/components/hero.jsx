"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Play } from "lucide-react"
import SakuraFall from "@/components/sakura-fall"

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if autoplay fails
        console.log("Autoplay prevented")
      })
    }
  }, [])

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg?height=1080&width=1920">
        <source src="/placeholder-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-sakura-primary via-sakura-secondary to-mountain-primary" />
      </video>
      {/* Video Overlay */}
      <div className="video-overlay" />
      {/* Sakura Fall Effect */}
      <SakuraFall />
      {/* Background Patterns */}
      <div
        className="absolute inset-0 dark:retro-grid-dark retro-grid-light opacity-30" />
      <div
        className="absolute inset-0 dark:sakura-bg-dark sakura-bg-light opacity-20" />
      <div
        className="absolute bottom-0 left-0 right-0 dark:mountain-bg-dark mountain-bg-light opacity-40" />
      <div className="container px-4 mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6">
            <span
              className="inline-block px-6 py-2 bg-card/80 backdrop-blur-md rounded-full border border-primary/30 text-sm font-medium text-muted-foreground pixel-corners">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6">
            <span className="dark:text-shadow-dark text-shadow-light">BRÉVAL</span>
            <br />
            <span className="text-primary dark:text-shadow-dark text-shadow-light">LE FLOCH</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <p
                className="relative text-lg md:text-xl px-8 py-3 rounded-full backdrop-blur-sm border border-primary/30 bg-card/60 pixel-corners">
                Creative Developer & Digital Craftsman
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            CTO of ForMenu, Co-founder of multiple startups, and passionate about exploring the infinite possibilities
            of technology and creative development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="magnetic-button bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full pixel-corners">
              <Play className="mr-2 h-5 w-5" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="magnetic-button border-primary/30 hover:bg-primary/10 px-8 py-3 rounded-full pixel-corners">
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-4">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center p-2 bg-card/30 backdrop-blur-sm">
            <ArrowDown className="w-4 h-4 text-primary animate-bounce-slow" />
          </motion.div>
        </div>
      </motion.div>
      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-5" />
    </section>
  );
}
