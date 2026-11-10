import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { CourseCard } from '@/components/CourseList'
import { courses } from '@/data/courses'
import { useLang } from '@/i18n/context'

// Quantos cursos passam na cena antes do cartao "ver mais".
const SHOWN = 4
// Fatia do scroll da secao em que os cards andam; antes e depois ha uma pequena pausa.
const FROM = 0.06
const TO = 0.88

/**
 * Cursos presos na tela: ao chegar na secao a pagina "para", o scroll vertical passa a mover
 * os cards na horizontal e, depois do quarto, aparece o cartao "ver mais". Continuando a rolar,
 * a secao solta e a pagina segue. Com "reduzir movimento" vira uma grade comum (ver index.css).
 */
export default function CoursesScene() {
  const { t } = useLang()
  const sceneRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!scene || !viewport || !track) return
    let raf = 0

    const update = () => {
      raf = 0
      const rect = scene.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
      const t01 = Math.min(1, Math.max(0, (p - FROM) / (TO - FROM)))
      // Distancia ate o ultimo card encostar na borda direita.
      const max = Math.max(0, track.scrollWidth - viewport.clientWidth)
      track.style.setProperty('--x', `${(-t01 * max).toFixed(1)}px`)
      barRef.current?.style.setProperty('--pos', t01.toFixed(4))
      barRef.current?.style.setProperty('--size', String(max > 0 ? viewport.clientWidth / track.scrollWidth : 1))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      window.removeEventListener('scroll', onScroll)
      if (entry?.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }
    })
    io.observe(scene)
    window.addEventListener('resize', onScroll, { passive: true })

    // Teclado: ao focar um link de um card fora da tela, rola a pagina ate o ponto em que ele aparece.
    const onFocus = (e: FocusEvent) => {
      const item = e.target instanceof Element ? e.target.closest('li') : null
      if (!item || getComputedStyle(scene).getPropertyValue('--pinned').trim() !== '1') return
      const items = Array.from(track.children)
      const t01 = items.indexOf(item) / Math.max(1, items.length - 1)
      const span = scene.offsetHeight - window.innerHeight
      const top = scene.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + span * (FROM + t01 * (TO - FROM)), behavior: 'auto' })
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

  const rest = courses.length - SHOWN

  return (
    <section id="courses" ref={sceneRef} className="courses-scene">
      <div className="courses-pin">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-6">
          <Reveal as="p" className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-ink">
            <span aria-hidden className="h-px w-10 bg-current" />
            04
          </Reveal>
          <KineticTitle text={t.courses.title} className="text-5xl md:text-7xl" />
          <Reveal as="p" index={1} className="mt-5 max-w-[60ch] text-lg text-muted-foreground">
            {t.courses.subtitle}
          </Reveal>

          <div ref={viewportRef} className="mt-8 md:mt-12">
            <ul ref={trackRef} className="courses-track">
              {courses.slice(0, SHOWN).map((c, i) => (
                <li key={c.title} className="courses-item">
                  <CourseCard course={c} index={i} />
                </li>
              ))}
              <li className="courses-item">
                <Link
                  to="/certificates"
                  className="card-pop group flex h-full min-h-56 flex-col justify-between rounded-[1.5rem] border-[1.5px] border-ink bg-lime p-5 text-ink no-underline"
                  style={{ ['--tone' as string]: 'var(--violet)' }}
                >
                  <span className="font-display text-6xl font-extrabold leading-none tracking-tighter">+{rest}</span>
                  <span className="flex items-center justify-between gap-3 font-display text-xl font-bold leading-tight">
                    {t.courses.more}
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="size-5" />
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div ref={barRef} aria-hidden className="rail-bar courses-bar" />
        </div>
      </div>
    </section>
  )
}
