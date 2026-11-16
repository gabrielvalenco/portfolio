import { startTransition, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { LocationContext, NAVIGATE, navigate, readLocation, toHref, type To } from '@/lib/location'

/** Guarda a rota atual e a atualiza em navegacoes internas e no voltar/avancar do navegador. */
export function Router({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    // Transicao: enquanto uma pagina lazy carrega, a atual continua na tela em vez de piscar.
    const update = () => startTransition(() => setLocation(readLocation()))
    window.addEventListener('popstate', update)
    window.addEventListener(NAVIGATE, update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener(NAVIGATE, update)
    }
  }, [])

  return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: To }

/** Link interno: e um <a> de verdade (abre em nova aba, copia o endereco), mas navega sem recarregar. */
export function Link({ to, onClick, target, ...props }: LinkProps) {
  const href = toHref(to)
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    // Cliques com tecla modificadora, botao do meio ou target ficam com o navegador.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (target && target !== '_self') return
    e.preventDefault()
    navigate(href)
  }
  return <a {...props} href={href} target={target} onClick={handle} />
}
