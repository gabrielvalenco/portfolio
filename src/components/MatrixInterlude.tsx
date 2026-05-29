import { useEffect, useRef, useState } from 'react'
import MatrixRain from '@/components/MatrixRain'

const LIME = '#9eff00'

/**
 * Visual break between sections (used between About and Projects).
 * Renders the matrix rain background with a thematic phrase. The matrix is
 * only mounted while the section is in (or near) the viewport — saves CPU
 * when the user is scrolled away.
 */
export default function MatrixInterlude() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => setActive(entries[0]?.isIntersecting ?? false),
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] w-full overflow-hidden bg-black"
    >
      {active && <MatrixRain />}

      {/* Vignette + soft top/bottom fades into adjacent sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, transparent 75%), linear-gradient(to bottom, rgba(0,0,0,0.95), transparent 18%, transparent 82%, rgba(0,0,0,0.95))',
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center font-mono">
        <p
          className="mb-3 text-[11px] uppercase tracking-[0.32em]"
          style={{ color: LIME, textShadow: `0 0 12px ${LIME}66` }}
        >
          O que isso vira
        </p>
        <h2
          className="text-3xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: LIME, textShadow: `0 0 24px ${LIME}55, 0 0 4px ${LIME}aa` }}
        >
          Onde o código vira produto.
        </h2>
      </div>
    </section>
  )
}
