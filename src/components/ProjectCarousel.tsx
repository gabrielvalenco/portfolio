import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'

type Project = {
  title: string
  desc: string
  href: string
  live?: string
  repo?: string
  tags?: string[]
}

export default function ProjectCarousel() {
  const projects: Project[] = useMemo(
    () => [
      {
        title: 'Audio Downloader & Transcriber',
        desc: 'Baixe áudio com yt-dlp + FFmpeg e transcreva via IA (CLI + Web).',
        href: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
        repo: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
        tags: ['Python', 'FFmpeg', 'yt-dlp', 'Web UI'],
      },
      {
        title: 'EnfantIA',
        desc: 'Plataforma educacional com experiências interativas e conteúdo dinâmico.',
        href: 'https://enfantia.com.br/',
        live: 'https://enfantia.com.br/',
        tags: ['Web', 'UI/UX'],
      },
      {
        title: 'WebhookControl',
        desc: 'Entrega resiliente de webhooks com retries exponenciais, logs e Horizon.',
        href: 'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
        repo: 'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
        tags: ['Laravel', 'Redis', 'Horizon'],
      },
      {
        title: 'Intelligent Inventory',
        desc: 'Gestão de estoque com IA integrada a n8n e rotinas de automação.',
        href: 'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
        repo: 'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
        tags: ['n8n', 'Automação', 'IA'],
      },
      {
        title: 'Módulo One',
        desc: 'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
        href: 'https://moduloone.com.br/',
        live: 'https://moduloone.com.br/',
        tags: ['Landing page', 'SaaS', 'Admin panel'],
      },
      {
        title: 'Terras de Santa Bárbara',
        desc: 'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
        href: 'https://terrassantabarbara.com/',
        live: 'https://terrassantabarbara.com/',
        tags: ['Landing page', 'Imobiliário'],
      },
      {
        title: 'Colégio Dinâmico',
        desc: 'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
        href: 'https://www.dinamicoetop.com.br/',
        live: 'https://www.dinamicoetop.com.br/',
        tags: ['Landing page', 'Educação'],
      },
      { title: 'UI Experiments', desc: 'Interações, micro animações e protótipos.', href: '#', tags: ['React', 'GSAP'] },
      { title: 'Data Tools', desc: 'Pipelines e ETL para dados.', href: '#', tags: ['Python', 'ETL'] },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const [depth, setDepth] = useState(() => (window.innerWidth < 640 ? 360 : 520))
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const size = projects.length
  const next = useCallback(() => setIndex(i => (i + 1) % size), [size])
  const prev = useCallback(() => setIndex(i => (i - 1 + size) % size), [size])
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const hoveringRef = useRef(false)
  const dragRef = useRef<{startX: number; moved: boolean}>({ startX: 0, moved: false })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    const onResize = () => {
      const w = window.innerWidth
      setDepth(w < 640 ? 360 : 520)
      setIsMobile(w < 768)
    }
    window.addEventListener('resize', onResize)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let id: number | null = null
    const tick = () => {
      if (!hoveringRef.current) next()
      id = window.setTimeout(tick, 4500)
    }
    if (!prefersReduced) id = window.setTimeout(tick, 4500)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      if (id) window.clearTimeout(id)
    }
  }, [next, prev])

  // spotlight follow
  const onMoveSpot = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    ;(e.currentTarget as HTMLDivElement).style.setProperty('--mx', `${x}px`)
    ;(e.currentTarget as HTMLDivElement).style.setProperty('--my', `${y}px`)
  }

  // drag/swipe - React handlers for melhor compatibilidade
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    dragRef.current = { startX: e.clientX, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.startX === 0) return
    const dx = e.clientX - dragRef.current.startX
    if (Math.abs(dx) > 12) dragRef.current.moved = true
  }
  const finishDrag = (clientX: number, pointerId?: number) => {
    const el = wrapRef.current
    const dx = clientX - dragRef.current.startX
    if (dragRef.current.moved) {
      if (dx > 24) next()
      else if (dx < -24) prev()
    }
    dragRef.current = { startX: 0, moved: false }
    if (pointerId && el && el.hasPointerCapture(pointerId)) el.releasePointerCapture(pointerId)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => finishDrag(e.clientX, e.pointerId)
  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => finishDrag(e.clientX, e.pointerId)
  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.startX !== 0) finishDrag(e.clientX, e.pointerId)
  }

  const renderCard = (p: Project) => (
    <div
      onMouseMove={onMoveSpot}
      className="rounded-2xl border bg-card/80 backdrop-blur shadow-md px-6 py-5 transition-transform hover:scale-[1.02] relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(124,58,237,0.12), transparent 60%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-foreground/5" />
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.08), transparent 35%)' }}
      />
      <div className="text-xs uppercase tracking-wider text-foreground/60">Destaque</div>
      <p className="mt-1 text-xl font-semibold">{p.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
      {!!p.tags?.length && (
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map(t => (
            <span key={t} className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border/70">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        {p.live && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-primary hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
          >
            <a href={p.live} target="_blank" rel="noreferrer">
              Visitar
            </a>
          </Button>
        )}
        {p.repo && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-primary hover:bg-primary/20 hover:text-primary dark:hover:text-primary"
          >
            <a href={p.repo} target="_blank" rel="noreferrer">
              Repositório
            </a>
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="relative" onMouseEnter={() => (hoveringRef.current = true)} onMouseLeave={() => (hoveringRef.current = false)}>
      <div
        ref={wrapRef}
        className="mx-auto h-[18rem] md:h-[24rem] touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        aria-roledescription="carrossel"
        style={{ perspective: `${depth * 3}px` }}
      >
        {isMobile ? (
          <ul
            className="relative h-full w-full flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map(p => (
              <li
                key={p.title}
                className="flex h-full w-full shrink-0 items-center justify-center px-2"
              >
                <div className="w-full max-w-sm">
                  {renderCard(p)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out"
            style={{ transform: `translateZ(-${depth}px) rotateY(${(360 / size) * index}deg)` }}
          >
            {projects.map((p, i) => (
              <li
                key={p.title}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[60%] max-w-[22rem]"
                style={{ transform: `rotateY(${(360 / size) * i}deg) translateZ(${depth}px)` }}
              >
                {renderCard(p)}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Setas removidas conforme solicitado */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`size-2 rounded-full transition-all ${i === index ? 'bg-primary size-3 shadow-[0_0_16px_rgba(124,58,237,0.6)]' : 'bg-foreground/30 hover:bg-foreground/50'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">Arraste para navegar • Clique nos pontos para pular</p>
    </div>
  )
}
