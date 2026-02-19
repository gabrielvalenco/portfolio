import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Certificates from '@/pages/Certificates'

export default function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: true,
      autoResize: true,
    })
    let rafId: number | null = null
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
  return (
    <BrowserRouter>
      <div className="min-h-dvh flex flex-col">
        <a href="#home" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] px-3 py-2 rounded bg-primary text-primary-foreground">Ir para conteúdo</a>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
