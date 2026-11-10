import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { courses, type Course } from '@/data/courses'
import { useLang } from '@/i18n/context'

const TONES = ['lime', 'violet', 'pink'] as const

const arrowButton =
  'inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-foreground/60 text-foreground transition-colors duration-150 hover:border-foreground hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-30'


/** Card de um curso: numero, plataforma, titulo e certificado (quando ha PDF). */
export function CourseCard({ course: c, index: i }: { course: Course; index: number }) {
  const { lang, t } = useLang()
  const locale = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[lang]
  const meta = [
    c.date ? new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(`${c.date}-15T12:00:00`)) : null,
    c.hours ? `${c.hours.toLocaleString(locale)} h` : null,
  ].filter(Boolean)
  return (
    <div
      className="card-pop flex h-full flex-col rounded-[1.5rem] border-[1.5px] border-border-strong bg-surface p-5"
      style={{ '--tone': `var(--${TONES[i % TONES.length]})` } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
        <Badge>{c.provider}</Badge>
      </div>
      <h3 className="mt-6 line-clamp-3 font-display text-xl font-bold leading-tight">{c.title}</h3>
      <div className="mt-auto pt-8 text-xs text-muted-foreground">
        <p className="inline-flex items-center gap-1.5">
          <BadgeCheck className="size-4 text-accent-ink" />
          {t.courses.done}
          {meta.length > 0 && <span> · {meta.join(' · ')}</span>}
        </p>
        <div className="mt-3 h-5">
          {c.certificate && (
            <a
              href={c.certificate}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 font-semibold text-accent-ink no-underline underline-offset-4 hover:underline"
            >
              {t.courses.certificate}
              <ArrowUpRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/** Trilho horizontal de cursos: uma linha so, com encaixe por card, setas e barra de progresso. */
export default function CourseList() {
  const { lang, t } = useLang()
  const locale = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[lang]
  const totalHours = courses.reduce((sum, c) => sum + (c.hours ?? 0), 0)

  const railRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth
      const x = rail.scrollLeft
      // Parte visivel e posicao, de 0 a 1: alimentam o "polegar" da barra de progresso.
      barRef.current?.style.setProperty('--size', String(max > 0 ? rail.clientWidth / rail.scrollWidth : 1))
      barRef.current?.style.setProperty('--pos', String(max > 0 ? x / max : 0))
      setEdge(prev => {
        const next = { start: x <= 2, end: x >= max - 2 }
        return prev.start === next.start && prev.end === next.end ? prev : next
      })
    }
    update()
    rail.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(rail)
    return () => {
      rail.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <Reveal>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {courses.length} {t.courses.title.toLowerCase()} · {totalHours.toLocaleString(locale)} h
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label={t.courses.prev} className={arrowButton}>
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label={t.courses.next} className={arrowButton}>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* tabIndex: da para rolar o trilho com as setas do teclado. */}
      <ul ref={railRef} tabIndex={0} aria-label={t.courses.title} className="rail">
        {courses.map((c, i) => (
            <li key={c.title} className="rail-item">
              <CourseCard course={c} index={i} />
            </li>
        ))}
      </ul>

      <div ref={barRef} aria-hidden className="rail-bar" />
    </Reveal>
  )
}
