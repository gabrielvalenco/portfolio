import { useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { useLang } from '@/i18n/context'

// Mesmas cores de fundo de index.css; pintam a barra do navegador no celular.
const THEME_COLOR = { dark: '#0a0a11', light: '#f2efe6' }

export default function ThemeToggle() {
  const { t } = useLang()
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    const next = !dark
    const apply = () => {
      setDark(next)
      document.documentElement.classList.toggle('dark', next)
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[next ? 'dark' : 'light'])
      try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* storage bloqueado */ }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof document.startViewTransition !== 'function') {
      apply()
      return
    }

    // O tema novo abre em circulo a partir do botao (View Transitions API).
    const r = e.currentTarget.getBoundingClientRect()
    const x = r.left + r.width / 2
    const y = r.top + r.height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(apply))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => { /* transicao pulada: o tema ja foi aplicado */ })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.theme}
      aria-pressed={dark}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-150 hover:border-foreground hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
