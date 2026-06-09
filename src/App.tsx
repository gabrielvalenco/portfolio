import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

const Home = lazy(() => import('@/pages/Home'))
const Certificates = lazy(() => import('@/pages/Certificates'))
const ProjectsPage = lazy(() => import('@/pages/Projects'))
const AboutPage = lazy(() => import('@/pages/About'))
const ExperiencePage = lazy(() => import('@/pages/Experience'))

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isTouch) return

    const lenis = new Lenis({
      duration: 0.7,
      smoothWheel: true,
      syncTouch: false,
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
      <CustomCursor />
      <ScrollToTop />
      <div className="min-h-dvh flex flex-col">
        <a href="#home" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] px-3 py-2 rounded bg-primary text-primary-foreground">Ir para conteúdo</a>
        <main className="flex-1">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/certificates" element={<Certificates />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}
