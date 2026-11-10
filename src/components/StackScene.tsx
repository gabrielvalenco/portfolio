import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { stackGroups } from '@/data/stack'
import { useLang } from '@/i18n/context'

// De cima para baixo, como numa aplicacao de verdade: o que o usuario ve ate onde tudo roda.
const ORDER = ['frontend', 'mobile', 'backend', 'data', 'infra']
const TONES = ['lime', 'pink', 'violet', 'lime', 'pink']

const layers = ORDER.map(id => stackGroups.find(g => g.id === id)).filter(g => g !== undefined)

// Desenho de cada placa (viewBox 100x100, traco na cor do texto).
const GLYPHS: Record<string, ReactNode> = {
  frontend: (
    <>
      <rect x="14" y="26" width="72" height="52" rx="6" />
      <path d="M14 38h72M22 46h26v24H22zM56 48h22M56 57h22M56 66h14" />
      <path d="M21 32h.5M27 32h.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="35" y="20" width="30" height="60" rx="7" />
      <path d="M46 27h8M49.5 73h1" />
    </>
  ),
  backend: <path d="M32 36 18 50l14 14M68 36l14 14-14 14M57 30 43 70" />,
  data: (
    <>
      <ellipse cx="50" cy="30" rx="24" ry="9" />
      <path d="M26 30v40a24 9 0 0 0 48 0V30M26 50a24 9 0 0 0 48 0" />
    </>
  ),
  infra: (
    <>
      <rect x="18" y="24" width="64" height="20" rx="5" />
      <rect x="18" y="56" width="64" height="20" rx="5" />
      <path d="M27 34h.5M27 66h.5M60 34h13M60 66h13" />
    </>
  ),
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

// Ate aqui o bloco ainda esta montado; depois, cada camada ganha uma fatia igual do scroll.
const START = 0.12

/**
 * Cena presa na tela (sticky) guiada pelo scroll: a stack aparece como um bloco montado,
 * se separa em camadas e destaca uma por vez, com as tecnologias de cada uma ao lado.
 * So aparece sem "reduzir movimento" (ver `.stack-scene` em index.css); o fallback e o TechStack.
 */
export default function StackScene() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
      el.style.setProperty('--spread', smooth(0.01, 0.2, p).toFixed(4))
      el.style.setProperty('--turn', p.toFixed(4))
      const next = p < START ? -1 : Math.min(layers.length - 1, Math.floor(((p - START) / (1 - START)) * layers.length))
      setActive(next)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    // So escuta o scroll enquanto a cena esta perto da tela.
    const io = new IntersectionObserver(([entry]) => {
      window.removeEventListener('scroll', onScroll)
      if (entry?.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }
    })
    io.observe(el)
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={ref} className="stack-scene" data-exploded={active >= 0}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-x-10 gap-y-4 px-5 pt-20 md:px-6 lg:grid-cols-[1fr_1.1fr] lg:pt-16">
          <div className="order-2 lg:order-1">
            <Reveal as="p" className="mb-3 hidden items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-ink sm:flex lg:mb-4">
              <span aria-hidden className="h-px w-10 bg-current" />
              05
            </Reveal>
            <KineticTitle text={t.tech.title} className="text-4xl md:text-6xl lg:text-7xl" />
            <Reveal as="p" index={1} className="mt-4 hidden max-w-[44ch] text-lg text-muted-foreground lg:block">
              {t.tech.subtitle}
            </Reveal>

            <ol className="mt-4 border-t border-border lg:mt-8">
              {layers.map((g, i) => (
                <li
                  key={g.id}
                  data-active={i === active}
                  className="stack-row border-b border-border"
                  style={{ '--tone': `var(--${TONES[i]})` } as CSSProperties}
                >
                  <div className="flex items-center gap-4 py-2 lg:py-3">
                    <span className="font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-xl font-bold leading-none lg:text-2xl">{t.tech.groups[g.id]}</h3>
                    <span aria-hidden className="stack-row-dot ml-auto size-2.5 rounded-full" />
                  </div>
                  <div className="stack-row-body">
                    <ul className="flex flex-wrap gap-1.5 lg:gap-2">
                      {g.items.map(item => (
                        <li
                          key={item}
                          className="rounded-full border-[1.5px] border-border-strong px-3 py-1 text-xs font-medium text-foreground last:mb-3 lg:px-3.5 lg:py-1.5 lg:text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* O bloco em si e decorativo: o conteudo esta na lista ao lado. */}
          <div aria-hidden className="stack-stage order-1 lg:order-2">
            <div className="stack-3d">
              {layers.map((g, i) => (
                <div
                  key={g.id}
                  data-active={i === active}
                  data-above={i < active}
                  className="stack-plate"
                  style={
                    {
                      // Niveis simetricos em torno do meio: o bloco abre para cima e para baixo sem sair do centro.
                      '--level': (layers.length - 1) / 2 - i,
                      '--tone': `var(--${TONES[i]})`,
                      zIndex: layers.length - i,
                    } as CSSProperties
                  }
                >
                  <span className="stack-plate-label">{t.tech.groups[g.id]}</span>
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    {GLYPHS[g.id]}
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
