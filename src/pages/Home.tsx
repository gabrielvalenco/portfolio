import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Github, Mail, Linkedin, ArrowUpRight,
  Briefcase, ExternalLink, ChevronDown,
} from 'lucide-react'
import Section from '@/components/Section'
import TechMarquee from '@/components/TechMarquee'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { gsap } from '@/lib/gsap'
import { lazy, Suspense } from 'react'

// Lazy-load Remotion to prevent build breakage if env has issues
const RemotionHero = lazy(() =>
  import('@/components/RemotionHero').catch(
    () => ({ default: (() => null) as unknown as () => React.ReactElement })
  )
)

// ─── Magnetic button wrapper ───────────────────────────────────────────────────

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.35
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.28
    gsap.to(el, { x, y, duration: 0.35, ease: 'power2.out', overwrite: true })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.1, 0.5)', overwrite: true })
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}

// ─── Hero Photo ────────────────────────────────────────────────────────────────

const PHOTO_SRC = encodeURI('/ChatGPT Image 19 de mar. de 2026, 16_56_27.png')

function HeroPhoto() {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    gsap.to(el, {
      rotateY: x * 18,
      rotateX: -y * 18,
      scale: 1.045,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.9, ease: 'power3.out',
    })
  }

  return (
    <div className="flex justify-center" data-hero-photo>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative group cursor-pointer"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Outer glow pulse */}
        <div className="absolute -inset-[8px] rounded-[30px] bg-gradient-to-br from-primary/40 via-violet-400/20 to-pink-500/40 opacity-0 group-hover:opacity-70 blur-[18px] transition-opacity duration-500" />
        {/* Tight glow border */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-primary via-violet-400 to-pink-500 opacity-45 group-hover:opacity-90 blur-[3px] transition-opacity duration-300" />
        {/* Image container */}
        <div className="relative rounded-3xl overflow-hidden w-60 sm:w-72 md:w-80 ring-1 ring-white/10">
          <img
            src={PHOTO_SRC}
            alt="Gabriel Valenço"
            className="w-full h-full object-cover block"
            draggable={false}
          />
          {/* Hover color tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Shine streak */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Floating badge */}
        <div className="absolute -bottom-3 -left-4 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-background/90 px-3 py-1.5 text-xs font-medium text-emerald-500 backdrop-blur-md shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </div>
      </div>
    </div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Remotion animated background (floating code tokens) */}
      <Suspense fallback={null}>
        <RemotionHero />
      </Suspense>

      {/* Aurora orbs — subtle, black-dominant palette */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[700px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.22) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
          filter: 'blur(110px)',
          animation: 'orb-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-36 -left-24 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(109,40,217,0.16) 0%, rgba(124,58,237,0.07) 55%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'orb-2 25s ease-in-out infinite',
        }}
      />

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-6 pt-24 pb-36 relative z-10">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">

          {/* Left: text */}
          <div>
            {/* Available badge */}
            <div data-hero-badge className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Disponível para freelancer
            </div>

            {/* Intro label */}
            <div className="hero-line-wrap mb-3">
              <p data-hero-intro className="text-sm font-medium tracking-widest text-primary uppercase">
                Gabriel Valenço
              </p>
            </div>

            {/* Main headline — each line wrapped for clip reveal */}
            <h1 className="font-bold">
              <span className="hero-line-wrap">
                <span data-hero-line className="block">Transformando ideias</span>
              </span>
              <span className="hero-line-wrap">
                <span data-hero-line className="gradient-text block">em produtos digitais.</span>
              </span>
            </h1>

            {/* Description */}
            <p data-hero-desc className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Desenvolvedor full-stack focado em SaaS, automações e experiências modernas com{' '}
              <span className="font-semibold text-foreground">React</span>,{' '}
              <span className="font-semibold text-foreground">Vue</span> e{' '}
              <span className="font-semibold text-foreground">Laravel</span>.
            </p>

            {/* CTA buttons — magnetic */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <button
                  data-hero-cta
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Button variant="highlight" size="lg" asChild>
                    <span>
                      Ver projetos
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  data-hero-cta
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Button variant="outline" size="lg" asChild>
                    <span>Contato</span>
                  </Button>
                </button>
              </Magnetic>
            </div>

            {/* Social links */}
            <div data-hero-socials className="mt-8 flex items-center gap-3">
              {[
                { href: 'https://github.com/gabrielvalenco',                          label: 'GitHub',   Icon: Github   },
                { href: 'https://www.linkedin.com/in/gabriel-valenço-480b43276',      label: 'LinkedIn', Icon: Linkedin },
                { href: 'mailto:gabrielvalencoofc@gmail.com',                          label: 'Email',    Icon: Mail     },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all no-underline"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <HeroPhoto />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 flex flex-col items-center gap-1 opacity-60">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">scroll</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  )
}

// ─── Technologies ──────────────────────────────────────────────────────────────

function Technologies() {
  return (
    <section id="technologies" className="py-20 w-full overflow-hidden border-y border-border/60 bg-card">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="font-semibold">Stack & Ferramentas</h2>
        <p className="mt-2 text-muted-foreground">
          Tecnologias que uso para entregar produtos de ponta a ponta.
        </p>
      </div>
      <TechMarquee />
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────────

const stats = [
  { number: '10', suffix: '+', label: 'Projetos',      count: 10 },
  { number: '15',  suffix: '',  label: 'Tecnologias',   count: 15 },
  { number: '4',   suffix: '',  label: 'Certificados',  count: 4  },
  { number: '3',   suffix: '',  label: 'Experiências',  count: 3  },
]

function About() {
  return (
    <Section id="about">
      <h2 className="font-semibold">Sobre mim</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {/* Left: bio + experience */}
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            Desenvolvedor full-stack com foco em SaaS e automações — responsável por criar
            e otimizar fluxos de ponta a ponta, do banco de dados à interface.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Atualmente atuo como <span className="font-semibold text-foreground">Full Stack Developer & Tech Lead</span> na agência de publicidade{' '}
            <span className="font-semibold text-foreground">Degiual</span>, liderando o desenvolvimento de soluções digitais para clientes de diferentes segmentos.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Curioso, crítico e empenhado — transformo requisitos em produtos funcionais,
            escaláveis e bem acabados.
          </p>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Disponível para freelancer
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              SaaS, automações (n8n), integrações e otimização de processos.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Experiência
            </p>
            <div className="space-y-2">
              {[
                { company: 'Degiual',      role: 'Full Stack Developer & Tech Lead', current: true  },
                { company: 'Grupo Prodemi', role: 'Full Stack Developer',            current: false },
                { company: 'Jem',           role: 'Tráfego Pago',                   current: false },
              ].map(({ company, role, current }) => (
                <div key={company} className="flex items-center gap-3" data-animate-item>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${current ? 'bg-primary/20 border-primary/40' : 'bg-primary/10 border-primary/20'}`}>
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{company}</p>
                      {current && (
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-medium text-emerald-500">
                          atual
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: animated stats + skills */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ suffix, label, count }) => (
              <div
                key={label}
                className="rounded-xl border border-border/50 bg-card/50 p-5 text-center card-shine"
                data-animate-item
              >
                <div
                  className="text-3xl font-bold gradient-text"
                  data-count={count}
                  data-suffix={suffix}
                >
                  {count}{suffix}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Habilidades
            </p>
            <div className="flex flex-wrap gap-2">
              {['Inglês avançado', 'Oratória', 'Criativo', 'Cooperativo', 'Sociável', 'Adaptável'].map(
                skill => (
                  <span
                    key={skill}
                    className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Projects ──────────────────────────────────────────────────────────────────

type Project = {
  title: string
  desc:  string
  href:  string
  live?: string
  repo?: string
  tags?: string[]
}

function tagToGradient(tags: string[] | undefined): string {
  const map: Record<string, string> = {
    Python:         'from-blue-600/30 to-cyan-500/20',
    FFmpeg:         'from-blue-600/30 to-cyan-500/20',
    React:          'from-cyan-500/30 to-sky-400/20',
    Vue:            'from-emerald-500/30 to-teal-400/20',
    Laravel:        'from-red-600/30 to-orange-500/20',
    Web:            'from-violet-500/30 to-purple-400/20',
    'Landing page': 'from-indigo-600/30 to-violet-500/20',
    n8n:            'from-amber-500/30 to-yellow-400/20',
    Automação:      'from-amber-500/30 to-yellow-400/20',
    GSAP:           'from-green-500/30 to-emerald-400/20',
  }
  return map[tags?.[0] ?? ''] ?? 'from-primary/30 to-violet-500/20'
}

function ProjectCard({ p }: { p: Project }) {
  const gradient = tagToGradient(p.tags)
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] card-shine h-full">
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight">{p.title}</h3>
          {(p.live ?? p.repo) && (
            <a
              href={p.live ?? p.repo}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors no-underline"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>

        {p.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span
                key={t}
                className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {(p.live ?? p.repo) && (
          <div className="mt-4 flex gap-4 pt-3 border-t border-border/40">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 no-underline transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Ver site
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground no-underline transition-colors"
              >
                <Github className="h-3 w-3" />
                Repositório
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function FeaturedProjectCard({ p }: { p: Project }) {
  const gradient = tagToGradient(p.tags)
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)] card-shine">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-15 pointer-events-none`} />
      <div className="relative flex flex-col md:flex-row gap-6 p-7">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-xs font-medium text-primary mb-4">
            <span className="h-1 w-1 rounded-full bg-primary" />
            Projeto em destaque
          </div>
          <h3 className="text-2xl font-bold">{p.title}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-lg">{p.desc}</p>

          {p.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span
                  key={t}
                  className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {p.live && (
              <Button asChild size="sm" variant="highlight">
                <a href={p.live} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Ver site
                </a>
              </Button>
            )}
            {p.repo && (
              <Button asChild size="sm" variant="outline">
                <a href={p.repo} target="_blank" rel="noreferrer">
                  <Github className="mr-1.5 h-3.5 w-3.5" />
                  Repositório
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Decorative */}
        <div className="hidden md:flex items-center justify-center w-48 opacity-10 group-hover:opacity-25 transition-opacity duration-500 select-none">
          <span className="text-[120px] leading-none font-bold text-primary">{'</>'}</span>
        </div>
      </div>
    </div>
  )
}

const projects: Project[] = [
  {
    title: 'EnfantIA',
    desc:  'Plataforma educacional com experiências interativas, conteúdo dinâmico e design pensado para engajamento infantil.',
    href:  'https://enfantia.com.br/',
    live:  'https://enfantia.com.br/',
    tags:  ['Web', 'UI/UX', 'React'],
  },
  {
    title: 'Audio Downloader & Transcriber',
    desc:  'Baixe áudio com yt-dlp + FFmpeg e transcreva via IA (CLI + Web).',
    href:  'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    repo:  'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    tags:  ['Python', 'FFmpeg', 'yt-dlp', 'Web UI'],
  },
  {
    title: 'WebhookControl',
    desc:  'Entrega resiliente de webhooks com retries exponenciais, logs e Horizon.',
    href:  'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
    repo:  'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
    tags:  ['Laravel', 'Redis', 'Horizon'],
  },
  {
    title: 'Intelligent Inventory',
    desc:  'Gestão de estoque com IA integrada a n8n e rotinas de automação.',
    href:  'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
    repo:  'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
    tags:  ['n8n', 'Automação', 'IA'],
  },
  {
    title: 'Módulo One',
    desc:  'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
    href:  'https://moduloone.com.br/',
    live:  'https://moduloone.com.br/',
    tags:  ['Landing page', 'SaaS', 'Admin panel'],
  },
  {
    title: 'Rose Valenço',
    desc:  'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
    href:  'https://rosevalenco.com.br/',
    live:  'https://rosevalenco.com.br/',
    tags:  ['Landing page', 'Web'],
  },
  {
    title: 'Terras de Santa Bárbara',
    desc:  'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
    href:  'https://terrassantabarbara.com/',
    live:  'https://terrassantabarbara.com/',
    tags:  ['Landing page', 'Imobiliário'],
  },
  {
    title: 'Colégio Dinâmico',
    desc:  'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
    href:  'https://www.dinamicoetop.com.br/',
    live:  'https://www.dinamicoetop.com.br/',
    tags:  ['Landing page', 'Educação'],
  },
  {
    title: 'UI Experiments',
    desc:  'Interações, micro animações e protótipos em React com GSAP.',
    href:  '#',
    tags:  ['React', 'GSAP'],
  },
  {
    title: 'Data Tools',
    desc:  'Pipelines e ETL para processamento e análise de dados.',
    href:  '#',
    tags:  ['Python', 'ETL'],
  },
]

function Projects() {
  const [featured, ...rest] = projects
  const gridRef = useRef<HTMLDivElement>(null)
  const hlRef   = useRef<HTMLDivElement>(null)

  const onCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const hl   = hlRef.current
    const grid = gridRef.current
    if (!hl || !grid) return
    const cr = e.currentTarget.getBoundingClientRect()
    const gr = grid.getBoundingClientRect()
    gsap.to(hl, {
      x:        cr.left - gr.left - 2,
      y:        cr.top  - gr.top  - 2,
      width:    cr.width  + 4,
      height:   cr.height + 4,
      opacity:  1,
      duration: 0.38,
      ease:     'power3.out',
    })
  }

  const onGridLeave = () => {
    gsap.to(hlRef.current, { opacity: 0, duration: 0.22, ease: 'power2.out' })
  }

  return (
    <Section id="projects">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-semibold">Projetos</h2>
          <p className="mt-2 text-muted-foreground">Produtos e experimentos que construí.</p>
        </div>
        <a
          href="https://github.com/gabrielvalenco"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary no-underline hover:underline"
        >
          Ver todos no GitHub
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div
        ref={gridRef}
        className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        onMouseLeave={onGridLeave}
      >
        {/* Floating highlight border that follows the hovered card */}
        <div
          ref={hlRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 rounded-2xl border-2 border-primary/70 shadow-[0_0_24px_rgba(124,58,237,0.35)]"
          style={{ opacity: 0, zIndex: 20, willChange: 'transform, width, height' }}
        />

        <div className="col-span-1 sm:col-span-2 lg:col-span-3" onMouseEnter={onCardEnter}>
          <FeaturedProjectCard p={featured} />
        </div>
        {rest.map(p => (
          <div key={p.title} onMouseEnter={onCardEnter}>
            <ProjectCard p={p} />
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card/60 to-violet-500/10 p-10 md:p-16 text-center">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.3), transparent 65%)' }}
        />
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Disponível agora
          </div>
          <h2 className="font-semibold">Vamos trabalhar juntos?</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Estou disponível para projetos freelancer de SaaS, automações, integrações e
            desenvolvimento full-stack.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button
                variant="highlight"
                size="lg"
                onClick={() => (window.location.href = 'mailto:gabrielvalencoofc@gmail.com')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://www.linkedin.com/in/gabriel-valenço-480b43276', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://github.com/gabrielvalenco', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Home ──────────────────────────────────────────────────────────────────────

export default function Home() {
  useHomeAnimations()
  return (
    <>
      <Hero />
      <Technologies />
      <About />
      <Projects />
      <Contact />
    </>
  )
}
