import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'
import { Switch } from './ui/switch'

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
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  const toggleTheme = (checked: boolean) => {
    setDark(checked)
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }
  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <Progress />
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <div className="font-semibold">Gabriel<span className="text-primary">.</span></div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => go('home')}>Início</Button>
          <Button variant="outline" onClick={() => go('about')}>Sobre</Button>
          <Button variant="outline" onClick={() => go('technologies')}>Tecnologias</Button>
          <Button variant="outline" onClick={() => go('projects')}>Projetos</Button>
          <Button onClick={() => go('contact')}>Contato</Button>
          <div className="flex items-center gap-2">
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <Switch checked={dark} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  )
}