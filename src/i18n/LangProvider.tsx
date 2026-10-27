import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext } from './context'
import { translations, type Lang } from './translations'

const STORAGE_KEY = 'lang'

function savedLang(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch { /* storage bloqueado */ }
  return null
}

// Portugues so para navegador em pt-BR (ou "pt" sem regiao); qualquer outro idioma cai em ingles.
function browserLang(): Lang {
  const tag = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase()
  return tag === 'pt' || tag === 'pt-br' ? 'pt' : 'en'
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => savedLang() ?? browserLang())

  // Sem escolha manual salva, quem esta fora do Brasil ve o site em ingles. A deteccao do pais
  // e assincrona (/api/geo), entao a pagina abre pelo idioma do navegador e ajusta se precisar.
  useEffect(() => {
    if (savedLang()) return
    const ctrl = new AbortController()
    fetch('/api/geo', { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.country && data.country !== 'BR' && !savedLang()) setLangState('en')
      })
      .catch(() => { /* dev local ou sem rede: fica o idioma do navegador */ })
    return () => ctrl.abort()
  }, [])

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
