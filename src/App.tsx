import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLang } from '@/i18n/context'

const Home = lazy(() => import('@/pages/Home'))
const Certificates = lazy(() => import('@/pages/Certificates'))
const ProjectsPage = lazy(() => import('@/pages/Projects'))
const MoreProjects = lazy(() => import('@/pages/MoreProjects'))
const AboutPage = lazy(() => import('@/pages/About'))
const ExperiencePage = lazy(() => import('@/pages/Experience'))

export default function App() {
  const { t } = useLang()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only fixed left-2 top-2 z-[60] rounded-md bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only"
        >
          {t.common.skip}
        </a>
        <Header />
        {/* O rodape fica dentro do Suspense para nao aparecer no topo enquanto a pagina carrega. */}
        <Suspense fallback={<div className="min-h-dvh" aria-hidden />}>
          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/more-projects" element={<MoreProjects />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/certificates" element={<Certificates />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

/** Volta ao topo a cada navegacao; com hash (ex.: /#projects), rola ate a secao. */
function ScrollToTop() {
  const { key, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // A Home e lazy: espera a secao existir.
      let tries = 0
      const go = () => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ block: 'start' })
        else if (tries++ < 20) requestAnimationFrame(go)
      }
      go()
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [key, hash])
  return null
}
