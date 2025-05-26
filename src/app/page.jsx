import { Suspense } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Journey from "@/components/journey"
import Projects from "@/components/projects"
import LoadingScreen from "@/components/loading-screen"
import { SectionDivider } from "@/components/svg-stickers"
import ScrollObject3D from "@/components/scroll-object-3d"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <ScrollObject3D />
      <Suspense fallback={<LoadingScreen />}>
        <div className="overflow-x-hidden">
          <Hero />
          <div className="sticker-container">
            <SectionDivider />
          </div>
          <About />
          <div className="sticker-container">
            <SectionDivider />
          </div>
          <Projects />
          <div className="sticker-container">
            <SectionDivider />
          </div>
          <Journey />
        </div>
      </Suspense>
    </main>
  )
}
