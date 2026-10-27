import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext } from './context'
import { translations, type Lang } from './translations'

const STORAGE_KEY = 'lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* storage bloqueado */ }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* storage bloqueado */ }
  }, [])

  useEffect(() => {
    const { meta } = translations[lang]
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    // Textos de tamanhos diferentes mudam a altura da pagina: o ScrollTrigger recalcula no resize.
    window.dispatchEvent(new Event('resize'))
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
