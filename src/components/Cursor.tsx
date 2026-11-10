import { useEffect, useRef } from 'react'

/** Ponto que segue o mouse com atraso e cresce sobre links e botoes. So em telas com mouse; o cursor nativo continua. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false

    const tick = () => {
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      // Para de animar quando alcanca o mouse.
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (!on) {
        on = true
        x = tx
        y = ty
        el.dataset.on = '1'
      }
      const target = e.target instanceof Element ? e.target.closest('a, button, [data-cursor]') : null
      el.dataset.hover = target ? '1' : '0'
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      on = false
      el.dataset.on = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="cursor">
      <div className="cursor-dot" />
    </div>
  )
}
