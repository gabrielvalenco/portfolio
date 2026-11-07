import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useLang } from '@/i18n/context'

export default function ThemeToggle() {
  const { t } = useLang()
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch { /* storage bloqueado */ }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.theme}
      aria-pressed={dark}
      className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors duration-150 hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
