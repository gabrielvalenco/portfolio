import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import type { Project } from '@/data/projects'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { TermLink } from '@/components/TermButton'

const LIME = '#9eff00'

function ProjectSlide({ p, step }: { p: Project; step: number }) {
  const url = p.live ?? p.href
  return (
    <div className="relative h-full w-screen shrink-0 flex items-center justify-center px-6">
      <div className="terminal-panel corner-brackets relative w-full max-w-5xl overflow-hidden font-mono">
        <span className="cb-tl" />
        <span className="cb-tr" />
        <span className="cb-bl" />
        <span className="cb-br" />
        <div className="scan-sweep" />

        <div className="grid md:grid-cols-2">
          <div className="relative w-full overflow-hidden bg-zinc-900/50 aspect-[4/3] md:aspect-auto md:h-[26rem]">
            {p.image ? (
              <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-widest text-zinc-600">
                Imagem do projeto
              </div>
            )}
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-[#9eff00]/15 pb-3">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: LIME }}>
                Destaque
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                0{step} / 03
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold uppercase tracking-tight text-zinc-100 md:text-3xl">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
              {p.desc}
            </p>

            {p.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="border border-[#9eff00]/20 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-6">
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#9eff00]/40 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-zinc-200 no-underline transition-all hover:border-[#9eff00] hover:bg-[#9eff00]/10 hover:text-[#9eff00] hover:shadow-[0_0_28px_rgba(158,255,0,0.3)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Acessar projeto
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FinalSlide() {
  return (
    <div className="relative h-full w-screen shrink-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: LIME }}>
        04 / 04
      </p>
      <h3 className="font-mono text-3xl font-bold uppercase tracking-tight text-zinc-100 sm:text-5xl">
        Quer ver mais?
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400">
        Há outros projetos desenvolvidos com foco em landing pages, presença digital e conversão.
      </p>
      <div className="mt-8">
        <TermLink to="/more-projects" icon={ArrowUpRight}>
          Ver mais projetos
        </TermLink>
      </div>
    </div>
  )
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const steps = projects.length + 1

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const section = sectionRef.current
    const track = trackRef.current
    const progress = progressRef.current
    if (!section || !track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          snap: {
            snapTo: (value: number) => {
              const step = 1 / steps
              return Math.round(value / step) * step
            },
            duration: { min: 0.15, max: 0.3 },
            ease: 'power2.inOut',
            delay: 0,
          },
          onUpdate: (self) => {
            if (progress) progress.style.width = `${self.progress * 100}%`
          },
        },
      })

      for (let i = 0; i < steps - 1; i++) {
        tl.to(track, {
          xPercent: -(i + 1) * (100 / steps),
          duration: 1,
          ease: 'none',
        })
      }
      tl.to({}, { duration: 1 })
    }, section)

    return () => ctx.revert()
  }, [projects, steps])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 h-screen w-full overflow-hidden bg-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: LIME, opacity: 0.4, boxShadow: '0 0 16px #9eff00' }}
      />

      <div className="container mx-auto px-6 pt-16 md:pt-24">
        <header>
          <div
            className="flex items-center gap-4 font-mono text-[11px] tracking-[0.32em]"
            style={{ color: LIME }}
          >
            <span>03</span>
            <span className="h-px w-16 sm:w-24" style={{ background: `${LIME}66` }} />
          </div>
          <h2 className="mt-5 font-mono text-3xl font-bold uppercase tracking-tight leading-none text-zinc-100 sm:text-5xl md:text-6xl">
            Projetos
          </h2>
          <p className="mt-4 max-w-xl font-mono text-sm text-zinc-400">
            Uma seleção do que já construí. Role para conferir cada projeto.
          </p>
        </header>
      </div>

      <div className="absolute inset-x-0 top-48 bottom-12 overflow-hidden md:top-56">
        <div ref={trackRef} className="flex h-full w-fit">
          {projects.map((p, i) => (
            <ProjectSlide key={p.title} p={p} step={i + 1} />
          ))}
          <FinalSlide />
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
        <div className="w-48 overflow-hidden rounded bg-zinc-800">
          <div ref={progressRef} className="h-1 bg-[#9eff00]" style={{ width: '0%' }} />
        </div>
      </div>
    </section>
  )
}
