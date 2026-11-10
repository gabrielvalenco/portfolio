import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Backdrop from '@/components/Backdrop'
import Cursor from '@/components/Cursor'
import { useLang } from '@/i18n/context'

const Certificates = lazy(() => import('@/pages/Certificates'))
const ProjectsPage = lazy(() => import('@/pages/Projects'))
const MoreProjects = lazy(() => import('@/pages/MoreProjects'))
const AboutPage = lazy(() => import('@/pages/About'))
const ExperiencePage = lazy(() => import('@/pages/Experience'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const SITE = 'https://www.gabrielvalenco.com.br'

export default function App() {
  const { t } = useLang()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteMeta />
      <Backdrop />
      <Cursor />
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
          {/* #page: o Header marca este bloco como `inert` enquanto o menu mobile esta aberto. */}
          <div id="page" className="flex flex-1 flex-col">
            <main id="main" className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/more-projects" element={<MoreProjects />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

/** Titulo, canonical e robots por rota: cada pagina aparece com o proprio nome na aba e nos buscadores. */
function RouteMeta() {
  const { pathname } = useLocation()
  const { t } = useLang()

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const pages: Record<string, string> = {
      '/projects': t.projectsPage.title,
      '/more-projects': t.moreProjects.title,
      '/about': t.about.title,
      '/experience': t.experience.title,
      '/certificates': t.certificates.title,
    }
    const known = path === '/' || path in pages
    document.title = path === '/' ? t.meta.title : `${pages[path] ?? t.notFound.title} | Gabriel Valenço`
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE}${known ? path : '/'}`)

    // Rota inexistente nao deve ser indexada (o servidor devolve 200 por causa do rewrite da SPA).
    let robots = document.querySelector('meta[name="robots"]')
    if (known) robots?.remove()
    else {
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex')
    }
  }, [pathname, t])

  return null
}

/** Volta ao topo a cada navegacao; com hash (ex.: /#projects), rola ate a secao. */
function ScrollToTop() {
  const { key, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // As paginas internas sao lazy: espera a secao existir.
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
