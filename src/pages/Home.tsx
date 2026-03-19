import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Github, Mail, Linkedin, ChevronDown, ArrowUpRight,
  Briefcase, ExternalLink,
} from 'lucide-react'
import Section from '@/components/Section'
import TechMarquee from '@/components/TechMarquee'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { gsap } from '@/lib/gsap'

// ─── Hero Photo ───────────────────────────────────────────────────────────────

const PHOTO_SRC = encodeURI('/ChatGPT Image 19 de mar. de 2026, 16_56_27.png')

function HeroPhoto() {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    gsap.to(el, {
      rotateY: x * 16,
      rotateX: -y * 16,
      scale: 1.04,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  return (
    <div className="flex justify-center md:justify-end">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative group cursor-pointer"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Gradient glow border */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-primary via-violet-400 to-pink-500 opacity-40 group-hover:opacity-80 blur-[3px] transition-opacity duration-300" />
        {/* Outer ring pulse on hover */}
        <div className="absolute -inset-[6px] rounded-[28px] bg-gradient-to-br from-primary/30 via-violet-500/20 to-pink-500/30 opacity-0 group-hover:opacity-60 blur-[12px] transition-opacity duration-500" />
        {/* Image container */}
        <div className="relative rounded-3xl overflow-hidden w-60 sm:w-72 md:w-80 ring-1 ring-white/10">
          <img
            src={PHOTO_SRC}
            alt="Gabriel Valenço"
            className="w-full h-full object-cover block"
            draggable={false}
          />
          {/* Subtle color tint on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora orbs */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 45%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'orb-1 20s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 60% 60%, rgba(236,72,153,0.3) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'orb-2 25s ease-in-out infinite',
        }}
      />

      <div className="container mx-auto px-6 pt-24 pb-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            {/* Available badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Disponível para freelancer
            </div>

            {/* Intro */}
            <p className="mb-3 text-sm font-medium tracking-widest text-primary uppercase">
              Gabriel Valenço
            </p>

            {/* Main headline */}
            <h1 className="font-bold">
              <span className="block">Transformando ideias</span>
              <span className="block gradient-text">em produtos digitais.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Desenvolvedor full-stack focado em SaaS, automações e experiências modernas com{' '}
              <span className="font-semibold text-foreground">React</span>,{' '}
              <span className="font-semibold text-foreground">Vue</span> e{' '}
              <span className="font-semibold text-foreground">Laravel</span>.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                variant="highlight"
                size="lg"
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Ver projetos
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Contato
              </Button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com/gabrielvalenco"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all no-underline"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-valenço-480b43276"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all no-underline"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:gabrielvalencoofc@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all no-underline"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <HeroPhoto />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce opacity-60">
        <span className="text-xs text-muted-foreground">scroll</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  )
}

// ─── Technologies ─────────────────────────────────────────────────────────────

function Technologies() {
  return (
    <section id="technologies" className="py-20 w-full overflow-hidden border-y border-border/40 bg-card/30">
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

// ─── About ────────────────────────────────────────────────────────────────────

const stats = [
  { number: '9+', label: 'Projetos' },
  { number: '15', label: 'Tecnologias' },
  { number: '4', label: 'Certificados' },
  { number: '2', label: 'Experiências' },
]

function About() {
  return (
    <Section id="about">
      <h2 className="font-semibold">Sobre mim</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-12">
        {/* Left: bio + experience */}
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            Desenvolvedor full-stack com foco em SaaS e automações, responsável por criar
            e otimizar fluxos de ponta a ponta — do banco de dados à interface.
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
                { company: 'Grupo Prodemi', role: 'Full Stack Developer' },
                { company: 'Jem', role: 'Tráfego Pago' },
              ].map(({ company, role }) => (
                <div key={company} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{company}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: stats + skills */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ number, label }) => (
              <div
                key={label}
                className="rounded-xl border border-border/50 bg-card/50 p-5 text-center"
              >
                <div className="text-3xl font-bold gradient-text">{number}</div>
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
                    className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

type Project = {
  title: string
  desc: string
  href: string
  live?: string
  repo?: string
  tags?: string[]
}

function tagToGradient(tags: string[] | undefined): string {
  const map: Record<string, string> = {
    Python:          'from-blue-600/30 to-cyan-500/20',
    FFmpeg:          'from-blue-600/30 to-cyan-500/20',
    React:           'from-cyan-500/30 to-sky-400/20',
    Vue:             'from-emerald-500/30 to-teal-400/20',
    Laravel:         'from-red-600/30 to-orange-500/20',
    Web:             'from-violet-500/30 to-purple-400/20',
    'Landing page':  'from-indigo-600/30 to-violet-500/20',
    n8n:             'from-amber-500/30 to-yellow-400/20',
    Automação:       'from-amber-500/30 to-yellow-400/20',
    GSAP:            'from-green-500/30 to-emerald-400/20',
  }
  return map[tags?.[0] ?? ''] ?? 'from-primary/30 to-violet-500/20'
}

function ProjectCard({ p }: { p: Project }) {
  const gradient = tagToGradient(p.tags)
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]">
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
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all hover:shadow-[0_8px_40px_rgba(124,58,237,0.25)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 pointer-events-none`} />
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

        {/* Decorative code symbol */}
        <div className="hidden md:flex items-center justify-center w-48 opacity-10 group-hover:opacity-20 transition-opacity select-none">
          <span className="text-[120px] leading-none font-bold text-primary">{'</>'}</span>
        </div>
      </div>
    </div>
  )
}

const projects: Project[] = [
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
  {
    title: 'UI Experiments',
    desc: 'Interações, micro animações e protótipos em React com GSAP.',
    href: '#',
    tags: ['React', 'GSAP'],
  },
  {
    title: 'Data Tools',
    desc: 'Pipelines e ETL para processamento e análise de dados.',
    href: '#',
    tags: ['Python', 'ETL'],
  },
]

function Projects() {
  const [featured, ...rest] = projects
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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <FeaturedProjectCard p={featured} />
        </div>
        {rest.map(p => (
          <div key={p.title}>
            <ProjectCard p={p} />
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-card/60 to-violet-500/10 p-10 md:p-16 text-center">
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25), transparent 60%)',
          }}
        />
        <div className="relative">
          <h2 className="font-semibold">Vamos trabalhar juntos?</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Estou disponível para projetos freelancer de SaaS, automações, integrações e
            desenvolvimento full-stack.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              variant="highlight"
              size="lg"
              onClick={() => (window.location.href = 'mailto:gabrielvalencoofc@gmail.com')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.open('https://www.linkedin.com/in/gabriel-valenço-480b43276', '_blank')
              }
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/gabrielvalenco', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

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
