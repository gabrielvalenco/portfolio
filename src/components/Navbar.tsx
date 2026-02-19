import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sun, Moon, Menu, X } from 'lucide-react'
import LogoGV from './LogoGV'
import { useNavigate, useLocation } from 'react-router-dom'

function Progress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setProgress(h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800">
      <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
    </div>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const go = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goToCertificates = () => {
    navigate('/certificates')
    setOpen(false)
  }

  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  const toggleTheme = (checked: boolean) => {
    setDark(checked)
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }
  return (
    <nav role="navigation" aria-label="Navegação principal" className="sticky top-0 z-50 bg-background/60 backdrop-blur-lg supports-[backdrop-filter]:bg-background/40 border-b border-border/60">
      <Progress />
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => go('home')}>
          <div className="flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-2 py-1 backdrop-blur-sm">
            <LogoGV className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Portfolio</span>
            <span className="font-semibold tracking-tight">Gabriel Valenço</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-sm rounded-full border border-border/70 bg-background/80 px-1.5 py-0.5 backdrop-blur-sm">
            <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10" onClick={() => go('home')}>Início</Button>
            <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10" onClick={() => go('about')}>Sobre</Button>
            <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10" onClick={() => go('technologies')}>Tecnologias</Button>
            <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10" onClick={() => go('projects')}>Projetos</Button>
            <Button size="sm" variant="ghost" className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10" onClick={goToCertificates}>Certificados</Button>
            <Button size="sm" variant="default" className="rounded-full px-4 py-1 text-xs font-semibold shadow-[0_0_18px_rgba(124,58,237,0.35)] hover:shadow-[0_0_26px_rgba(124,58,237,0.55)]" onClick={() => go('contact')}>Contato</Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2 py-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => toggleTheme(false)}
                aria-label="Tema claro"
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-all ${!dark ? 'bg-primary text-primary-foreground shadow-[0_0_12px_rgba(124,58,237,0.55)] scale-[1.02]' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleTheme(true)}
                aria-label="Tema escuro"
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs transition-all ${dark ? 'bg-primary text-primary-foreground shadow-[0_0_12px_rgba(124,58,237,0.55)] scale-[1.02]' : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'}`}
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button
              size="icon-sm"
              variant="outline"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden border-border/70 bg-background/80 backdrop-blur-sm"
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="md:hidden animate-in fade-in-50 slide-in-from-top-2">
          <div className="container mx-auto px-6 pb-4">
            <div className="rounded-2xl border border-border/70 bg-background/95 p-4 shadow-lg backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8" onClick={() => { setOpen(false); go('home') }}>Início</Button>
                <Button variant="ghost" className="justify-start rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8" onClick={() => { setOpen(false); go('about') }}>Sobre</Button>
                <Button variant="ghost" className="justify-start rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8" onClick={() => { setOpen(false); go('technologies') }}>Tecnologias</Button>
                <Button variant="ghost" className="justify-start rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8" onClick={() => { setOpen(false); go('projects') }}>Projetos</Button>
                <Button variant="ghost" className="justify-start rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/8" onClick={() => { setOpen(false); goToCertificates() }}>Certificados</Button>
                <Button variant="default" className="mt-2 justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-[0_0_18px_rgba(124,58,237,0.35)] hover:shadow-[0_0_26px_rgba(124,58,237,0.55)]" onClick={() => { setOpen(false); go('contact') }}>Contato</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
