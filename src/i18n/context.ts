import { createContext, useContext } from 'react'
import { translations, type Dict, type Lang } from './translations'

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

export const LangContext = createContext<LangContextValue>({
  lang: 'pt',
  setLang: () => {},
  t: translations.pt,
})

export const useLang = () => useContext(LangContext)
