import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { Switch } from './ui/switch'
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
    <nav role="navigation" aria-label="Navegação principal" className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <Progress />
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => go('home')}>
          <LogoGV className="h-6 w-6 text-primary" />
          <div className="font-semibold tracking-tight">Gabriel</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Button size="sm" variant="outline" onClick={() => go('home')}>Início</Button>
            <Button size="sm" variant="outline" onClick={() => go('about')}>Sobre</Button>
            <Button size="sm" variant="outline" onClick={() => go('technologies')}>Tecnologias</Button>
            <Button size="sm" variant="outline" onClick={() => go('projects')}>Projetos</Button>
            <Button size="sm" variant="outline" onClick={goToCertificates}>Certificados</Button>
            <Button size="sm" variant="highlight" onClick={() => go('contact')}>Contato</Button>
          </div>
          <div className="flex items-center gap-2">
            {dark ? (
              <Moon className="h-4 w-4 text-primary transition-transform duration-300 rotate-0" />
            ) : (
              <Sun className="h-4 w-4 text-primary transition-transform duration-300 rotate-180" />
            )}
            <Switch
              checked={dark}
              onCheckedChange={toggleTheme}
              aria-label="Alternar tema"
              className="transition-all duration-300 data-[state=checked]:shadow-md data-[state=unchecked]:shadow-inner"
            />
            <Button
              size="icon-sm"
              variant="outline"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden border-primary"
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
            <div className="rounded-lg border border-primary/50 bg-primary/10 p-3 shadow-sm">
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => { setOpen(false); go('home') }}>Início</Button>
                <Button variant="outline" onClick={() => { setOpen(false); go('about') }}>Sobre</Button>
                <Button variant="outline" onClick={() => { setOpen(false); go('technologies') }}>Tecnologias</Button>
                <Button variant="outline" onClick={() => { setOpen(false); go('projects') }}>Projetos</Button>
                <Button variant="outline" onClick={goToCertificates}>Certificados</Button>
                <Button variant="highlight" onClick={() => { setOpen(false); go('contact') }}>Contato</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
