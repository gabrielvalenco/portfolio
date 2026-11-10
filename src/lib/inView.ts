type Callback = () => void

// Um unico IntersectionObserver para o site inteiro, em vez de um por elemento animado.
const callbacks = new WeakMap<Element, Callback>()
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        callbacks.get(entry.target)?.()
        callbacks.delete(entry.target)
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px 8% 0px', threshold: 0 },
  )
  return observer
}

/** Chama `cb` uma unica vez, quando `el` entrar na tela. Devolve a funcao de limpeza. */
export function onceInView(el: Element, cb: Callback): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    const id = requestAnimationFrame(cb)
    return () => cancelAnimationFrame(id)
  }
  callbacks.set(el, cb)
  getObserver().observe(el)
  return () => {
    callbacks.delete(el)
    observer?.unobserve(el)
  }
}
