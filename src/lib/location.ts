import { createContext, useContext } from 'react'

/*
  Estado de rota do site (ver lib/router.tsx para os componentes Router e Link).
  O portfolio so precisa de: trocar de pagina sem recarregar, saber a rota atual e reagir
  ao voltar/avancar do navegador. Uma biblioteca de rotas completa pesava dezenas de KB
  de JavaScript que nunca eram usados.
*/

export type Location = { pathname: string; hash: string; key: string }
export type To = string | { pathname: string; hash?: string }

export const NAVIGATE = 'app:navigate'
let counter = 0

// `key` muda a cada navegacao, mesmo para a mesma URL (clicar de novo em /#contato rola de novo).
export const readLocation = (): Location => ({
  pathname: window.location.pathname,
  hash: window.location.hash,
  key: String(counter++),
})

export const LocationContext = createContext<Location>({ pathname: '/', hash: '', key: 'initial' })

export function toHref(to: To) {
  if (typeof to === 'string') return to
  const hash = to.hash ? (to.hash.startsWith('#') ? to.hash : `#${to.hash}`) : ''
  return `${to.pathname}${hash}`
}

export function navigate(to: To) {
  window.history.pushState(null, '', toHref(to))
  window.dispatchEvent(new Event(NAVIGATE))
}

export const useLocation = () => useContext(LocationContext)
