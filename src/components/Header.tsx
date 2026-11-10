import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useLang } from '@/i18n/context'
import { cn } from '@/lib/utils'

const links = [
  { hash: 'projects', key: 'projects' },
  { hash: 'about', key: 'about' },
  { hash: 'experience', key: 'experience' },
  { hash: 'courses', key: 'courses' },
  { hash: 'contact', key: 'contact' },
] as const

/** Secao da Home que esta no meio da tela (para destacar o link correspondente). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return
    const sections = links.map(l => document.getElementById(l.hash)).filter(el => el !== null)
    // Faixa fina no meio da janela: so uma secao cruza por vez.
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive(prev => (prev === entry.target.id ? null : prev))
        }
      },
      { rootMargin: '-45% 0px -55% 0px' },
    )
    sections.forEach(s => io.observe(s))
    return () => {
      io.disconnect()
      setActive(null)
    }
  }, [enabled])

  return active
}

export default function Header() {
  const { lang, t } = useLang()
  const { pathname, key } = useLocation()
  const [open, setOpen] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(pathname === '/')

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty('--progress', String(max > 0 ? Math.min(window.scrollY / max, 1) : 0))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Menu aberto: trava o scroll, tira o conteudo de tras do alcance do teclado e fecha com Esc.
  useEffect(() => {
    if (!open) return
    const page = document.getElementById('page')
    document.documentElement.style.overflow = 'hidden'
    page?.setAttribute('inert', '')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    // Ao alargar a janela para o layout desktop, o menu some: fecha junto.
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktop = () => desktop.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.documentElement.style.overflow = ''
      page?.removeAttribute('inert')
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open])

  // Qualquer navegacao fecha o menu.
  const [lastKey, setLastKey] = useState(key)
  if (lastKey !== key) {
    setLastKey(key)
    setOpen(false)
  }

  return (
    <>
      <div ref={progressRef} aria-hidden className="scroll-progress" />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-6 md:pt-6">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 rounded-full border border-border bg-background/80 pl-2 pr-2 shadow-lg shadow-black/10 backdrop-blur-xl">
          <Link to="/" aria-label="Gabriel Valenço" className="group/logo flex items-center gap-2.5 rounded-full pr-2 text-foreground no-underline">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full bg-lime font-display text-sm font-extrabold tracking-tighter text-ink transition-transform duration-300 group-hover/logo:rotate-[-12deg]"
            >
              GV
            </span>
            <span aria-hidden className="hidden whitespace-nowrap font-display text-base font-bold tracking-tight sm:inline">
              Gabriel Valenço
            </span>
          </Link>

          <nav aria-label={t.nav.main} className="hidden items-center lg:flex">
            {links.map(l => (
              <Link
                key={l.hash}
                to={{ pathname: '/', hash: l.hash }}
                aria-current={active === l.hash ? 'location' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium no-underline transition-colors duration-150',
                  active === l.hash ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t.nav[l.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={`/valenco-resume-${lang === 'pt' ? 'pt' : 'en'}.pdf`} target="_blank" rel="noreferrer">
                <FileText />
                {t.nav.resume}
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
              className="inline-flex size-9 items-center justify-center rounded-full bg-foreground text-background lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={t.nav.main}
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-background px-6 pb-8 pt-28 lg:hidden"
        >
          <ul className="space-y-1">
            {links.map((l, i) => (
              <li key={l.hash} className="menu-link" style={{ '--i': i } as CSSProperties}>
                <Link
                  to={{ pathname: '/', hash: l.hash }}
                  onClick={() => setOpen(false)}
                  className="group/item flex items-baseline gap-4 border-b border-border py-4 font-display text-5xl font-extrabold tracking-tighter text-foreground no-underline"
                >
                  <span className="font-mono text-xs font-normal tracking-normal text-accent-ink">0{i + 1}</span>
                  <span className="transition-transform duration-200 group-hover/item:translate-x-2">{t.nav[l.key]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="menu-link mt-8 w-full" style={{ '--i': links.length } as CSSProperties}>
            <a href={`/valenco-resume-${lang === 'pt' ? 'pt' : 'en'}.pdf`} target="_blank" rel="noreferrer">
              <FileText />
              {t.nav.resume}
            </a>
          </Button>
        </nav>
      )}
    </>
  )
}
