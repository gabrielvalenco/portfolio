import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from '@/lib/router'
import { ArrowRight, ArrowUpRight, BadgeCheck, Check } from 'lucide-react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { Button } from '@/components/ui/button'
import { courses, detailedCourses } from '@/data/courses'
import { useLang } from '@/i18n/context'

// Quantos cursos passam na cena antes do painel "ver mais".
const SHOWN = 4
// Um passo de scroll por curso + um para o "ver mais".
const STEPS = SHOWN + 1
// Fracao do caminho entre dois paineis em que o trilho fica parado de cada lado: o curso "encaixa" antes de o proximo entrar.
const HOLD = 0.25

const shown = courses.slice(0, SHOWN)
const rest = courses.slice(SHOWN)
const pad = (n: number) => String(n).padStart(2, '0')
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/**
 * Cursos presos na tela: ao chegar na secao a pagina "para" e o scroll vertical passa a mover um
 * trilho horizontal. Cada painel ocupa a cena inteira, entao aparece um curso por vez (descricao,
 * conteudo e certificado); depois do ultimo vem o painel "ver mais" e a secao solta. Com "reduzir
 * movimento" (ou tela baixa demais) vira uma lista comum com todos os paineis (ver index.css).
 */
export default function CoursesScene() {
  const { lang, t } = useLang()
  const locale = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[lang]
  const sceneRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(0)

  // Rola a pagina ate o meio da fatia de scroll do passo `i`.
  const goTo = (i: number, behavior: ScrollBehavior = 'smooth') => {
    const scene = sceneRef.current
    if (!scene) return
    const span = scene.offsetHeight - window.innerHeight
    const top = scene.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (span * (i + 0.5)) / STEPS, behavior })
  }

  useEffect(() => {
    const scene = sceneRef.current
    const track = trackRef.current
    if (!scene || !track) return
    let raf = 0

    const update = () => {
      raf = 0
      const rect = scene.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
      // `v` vale exatamente `i` no meio da fatia de scroll do passo `i`; entre dois meios o trilho desliza.
      const v = Math.min(STEPS - 1, Math.max(0, p * STEPS - 0.5))
      const i = Math.floor(v)
      const pos = i + smooth(HOLD, 1 - HOLD, v - i)
      track.style.setProperty('--pos', pos.toFixed(4))
      setActive(Math.round(pos))
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
    io.observe(scene)
    window.addEventListener('resize', onScroll, { passive: true })

    // Teclado: ao focar um link de um painel fora da tela, rola a pagina ate o passo dele.
    const onFocus = (e: FocusEvent) => {
      const panel = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-step]') : null
      if (!panel || panel.dataset.active === 'true') return
      if (getComputedStyle(scene).getPropertyValue('--pinned').trim() !== '1') return
      goTo(Number(panel.dataset.step), 'instant')
    }
    track.addEventListener('focusin', onFocus)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      track.removeEventListener('focusin', onFocus)
    }
  }, [])

  const step = (i: number) => ({ '--i': i }) as CSSProperties

  return (
    <section ref={sceneRef} className="courses-scene border-t border-border" style={{ '--steps': STEPS } as CSSProperties}>
      <div className="courses-pin">
        <div className="wrap grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <Reveal as="p" className="mb-4 hidden font-mono text-xs text-accent-ink sm:block">
              04
            </Reveal>
            <KineticTitle text={t.courses.title} className="text-3xl sm:text-4xl md:text-5xl" />
            <Reveal as="p" index={1} className="courses-subtitle mt-4 max-w-[44ch] text-muted-foreground">
              {t.courses.subtitle}
            </Reveal>

            {/* Indice (telas largas): mostra em que curso a cena esta e leva direto a qualquer um. */}
            <ol className="courses-index mt-8 border-t border-border">
              {shown.map((c, i) => (
                <li key={c.title} data-active={i === active} className="courses-step border-b border-border">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active ? 'step' : undefined}
                    className="flex w-full items-center gap-4 py-3 text-left"
                  >
                    <span className="font-mono text-xs">{pad(i + 1)}</span>
                    <span className="truncate font-semibold">{c.title}</span>
                    <span aria-hidden className="courses-step-dot ml-auto size-2 shrink-0 rounded-full" />
                  </button>
                </li>
              ))}
              <li data-active={active === SHOWN} className="courses-step border-b border-border">
                <button
                  type="button"
                  onClick={() => goTo(SHOWN)}
                  aria-current={active === SHOWN ? 'step' : undefined}
                  className="flex w-full items-center gap-4 py-3 text-left"
                >
                  <span className="font-mono text-xs">+{rest.length}</span>
                  <span className="truncate font-semibold">{t.courses.more}</span>
                  <span aria-hidden className="courses-step-dot ml-auto size-2 shrink-0 rounded-full" />
                </button>
              </li>
            </ol>

            {/* Progresso (telas estreitas): um traco por passo. */}
            <div aria-hidden className="courses-progress mt-3 items-center gap-3 sm:mt-5">
              <span className="font-mono text-xs text-muted-foreground">
                <span className="text-accent-ink">{pad(active + 1)}</span> / {pad(STEPS)}
              </span>
              <span className="flex flex-1 gap-1.5">
                {Array.from({ length: STEPS }, (_, i) => (
                  <span key={i} data-on={i <= active} className="courses-tick" />
                ))}
              </span>
            </div>
          </div>

          <div className="courses-viewport min-w-0 lg:col-span-8">
            <ol ref={trackRef} className="courses-track">
              {shown.map((c, i) => {
                const detail = t.certificates.items[detailedCourses.indexOf(c.title)]
                const facts = [
                  { k: t.courses.platform, v: c.provider },
                  c.date && {
                    k: t.courses.completedOn,
                    v: new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(`${c.date}-15T12:00:00`)),
                  },
                  c.hours && { k: t.courses.workload, v: `${c.hours.toLocaleString(locale)} h` },
                ].filter(f => !!f)
                return (
                  <li key={c.title} data-step={i} data-active={i === active} style={step(i)} className="courses-panel">
                    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-4 sm:p-5 md:p-8 xl:p-10">
                      <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span className="font-mono">
                          <span className="text-accent-ink">{pad(i + 1)}</span> / {pad(SHOWN)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <BadgeCheck className="size-4 text-accent-ink" />
                          {t.courses.done}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold leading-tight sm:text-2xl md:mt-6 md:text-3xl xl:text-4xl">{c.title}</h3>
                      {detail && (
                        <>
                          <p className="courses-desc mt-3 max-w-[62ch] text-sm text-muted-foreground md:text-base">{detail.description}</p>
                          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground md:mt-8">
                            {t.certificates.learned}
                          </p>
                          <ul className="mt-3 grid gap-x-8 gap-y-1.5 md:grid-cols-2 md:gap-y-2">
                            {detail.topics.map(topic => (
                              <li key={topic} className="flex items-start gap-2 text-sm leading-snug">
                                <Check className="size-4 shrink-0 text-accent-ink" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <div className="mt-auto pt-4 md:pt-10">
                        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-border pt-4 md:pt-5">
                          <dl className="flex gap-x-5 whitespace-nowrap md:gap-x-10">
                            {facts.map(f => (
                              <div key={f.k}>
                                <dt className="font-mono text-xs text-muted-foreground">{f.k}</dt>
                                <dd className="mt-1 text-sm font-medium md:text-base">{f.v}</dd>
                              </div>
                            ))}
                          </dl>
                          {c.certificate && (
                            <Button asChild variant="outline" className="h-9 w-full sm:w-auto md:h-10">
                              <a href={c.certificate} target="_blank" rel="noreferrer">
                                {t.courses.certificate}
                                <ArrowUpRight />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}

              <li data-step={SHOWN} data-active={active === SHOWN} style={step(SHOWN)} className="courses-panel">
                <Link
                  to="/certificates"
                  className="group flex h-full flex-col rounded-lg border border-primary bg-primary p-4 text-primary-foreground no-underline sm:p-5 md:p-8 xl:p-10"
                >
                  <span className="text-6xl font-semibold leading-none tracking-tighter md:text-8xl">+{rest.length}</span>
                  <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm opacity-70 md:mt-8 md:grid-cols-2">
                    {rest.map(c => (
                      <li key={c.title} className="truncate">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-8 text-lg font-medium leading-tight md:text-2xl">
                    {t.courses.more}
                    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="size-5" />
                    </span>
                  </span>
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
