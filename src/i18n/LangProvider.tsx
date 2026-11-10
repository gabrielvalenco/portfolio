import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext } from './context'
import { translations, type Lang } from './translations'

const STORAGE_KEY = 'lang'

function savedLang(): Lang | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved
  } catch { /* storage bloqueado */ }
  return null
}

// Portugues para navegador em pt-BR (ou "pt" sem regiao), espanhol para "es"; qualquer outro idioma cai em ingles.
function browserLang(): Lang {
  const tag = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase()
  if (tag === 'pt' || tag === 'pt-br') return 'pt'
  if (tag === 'es' || tag.startsWith('es-')) return 'es'
  return 'en'
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
        if (data?.country && data.country !== 'BR' && !savedLang()) setLangState(prev => (prev === 'es' ? 'es' : 'en'))
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
    document.documentElement.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[lang]
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
