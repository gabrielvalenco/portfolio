import { useEffect, lazy, Suspense, type ComponentType } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import { Router } from '@/lib/router'
import { useLocation } from '@/lib/location'
import { useLang } from '@/i18n/context'

const NotFound = lazy(() => import('@/pages/NotFound'))

// A Home vai no pacote principal; as demais paginas so sao baixadas quando visitadas.
const PAGES: Record<string, ComponentType> = {
  '/': Home,
  '/projects': lazy(() => import('@/pages/Projects')),
  '/more-projects': lazy(() => import('@/pages/MoreProjects')),
  '/about': lazy(() => import('@/pages/About')),
  '/experience': lazy(() => import('@/pages/Experience')),
  '/certificates': lazy(() => import('@/pages/Certificates')),
}

const SITE = 'https://www.gabrielvalenco.com.br'

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  )
}

function Shell() {
  const { t } = useLang()
  const { pathname } = useLocation()
  const Page = PAGES[normalize(pathname)] ?? NotFound
  return (
    <>
      <ScrollToTop />
      <RouteMeta />
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
              <Page />
            </main>
            <Footer />
          </div>
        </Suspense>
      </div>
    </>
  )
}

/** Titulo, canonical e robots por rota: cada pagina aparece com o proprio nome na aba e nos buscadores. */
function RouteMeta() {
  const { pathname } = useLocation()
  const { t } = useLang()

  useEffect(() => {
    const path = normalize(pathname)
    const pages: Record<string, string> = {
      '/projects': t.projectsPage.title,
      '/more-projects': t.moreProjects.title,
      '/about': t.about.title,
      '/experience': t.experience.title,
      '/certificates': t.certificates.title,
    }
    const known = path in PAGES
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
      // A secao pode ainda nao existir (pagina ou cena lazy): tenta por alguns quadros.
      let tries = 0
      let raf = 0
      const go = () => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ block: 'start' })
        else if (tries++ < 40) raf = requestAnimationFrame(go)
      }
      go()
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [key, hash])
  return null
}
