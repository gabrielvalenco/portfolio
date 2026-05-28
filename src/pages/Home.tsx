import React, { useRef } from 'react'
import {
  Github, Mail, Linkedin, ArrowUpRight, ExternalLink,
} from 'lucide-react'
import TechMarquee from '@/components/TechMarquee'
import MatrixHero from '@/components/MatrixHero'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { gsap } from '@/lib/gsap'

const LIME = '#9eff00'

// ─── Section wrapper (terminal-styled header) ─────────────────────────────────

function TerminalSection({
  id, index, name, title, subtitle, children,
}: {
  id: string
  index: string
  name: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="relative border-t border-[#9eff00]/10">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <header className="mb-12" data-term-head>
          <div
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em]"
            data-term-meta
            style={{ color: LIME }}
          >
            <span className="opacity-70">// {index}</span>
            <span className="h-px w-10 sm:w-16" style={{ background: `${LIME}66` }} />
            <span>./{name}</span>
          </div>
          <h2
            className="mt-5 font-mono text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none term-glitch"
            data-term-title
          >
            <span style={{ color: LIME }}>&gt;_</span> <span data-term-text>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-xl font-mono text-sm text-zinc-400" data-term-sub>
              <span style={{ color: LIME }}>$</span> {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

// ─── Magnetic button wrapper ──────────────────────────────────────────────────

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.32
    const y = (e.clientY - rect.top - rect.height / 2) * 0.26
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

// ─── Technologies ─────────────────────────────────────────────────────────────

function Technologies() {
  return (
    <TerminalSection
      id="technologies"
      index="01"
      name="stack.sh"
      title="Tecnologias"
      subtitle="ls -la /tools — stack para entregas full-stack"
    >
      <div className="mt-2" data-animate-item>
        <TechMarquee />
      </div>
    </TerminalSection>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

const stats = [
  { count: 10, suffix: '+', label: 'projetos' },
  { count: 15, suffix: '',  label: 'tecnologias' },
  { count: 4,  suffix: '',  label: 'certificados' },
  { count: 3,  suffix: '',  label: 'experiências' },
]

const skills = ['inglês_avançado', 'oratória', 'criativo', 'cooperativo', 'sociável', 'adaptável']

const experiences = [
  { company: 'Degiual',       role: 'full stack dev & tech lead', current: true  },
  { company: 'Grupo Prodemi', role: 'full stack developer',       current: false },
  { company: 'Jem',           role: 'tráfego pago',               current: false },
]

function About() {
  return (
    <TerminalSection
      id="about"
      index="02"
      name="whoami"
      title="Sobre"
      subtitle="cat bio.txt"
    >
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Bio + experience */}
        <div className="space-y-6 font-mono text-sm leading-relaxed text-zinc-300">
          <p data-animate-item>
            <span style={{ color: LIME }}>{'>'}</span> dev full-stack com foco em
            {' '}<span className="text-zinc-100">SaaS</span> e{' '}
            <span className="text-zinc-100">automações</span> — do banco de dados à interface.
          </p>
          <p data-animate-item>
            <span style={{ color: LIME }}>{'>'}</span> atualmente como{' '}
            <span className="text-zinc-100">full stack & tech lead</span> na{' '}
            <span className="text-zinc-100">Degiual</span>, liderando soluções digitais para clientes
            de diferentes segmentos.
          </p>
          <p data-animate-item>
            <span style={{ color: LIME }}>{'>'}</span> curioso, crítico e empenhado —
            transformo requisitos em produtos funcionais, escaláveis e bem acabados.
          </p>

          <div
            data-animate-item
            className="relative border border-[#9eff00]/30 bg-[#9eff00]/[0.04] px-4 py-3"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#9eff00] shadow-[0_0_10px_#9eff00] animate-pulse" />
              <span style={{ color: LIME }}>STATUS: AVAILABLE</span>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              SaaS, automações (n8n), integrações e otimização de processos.
            </p>
          </div>

          <div className="pt-2" data-animate-item>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 mb-3">
              // experience
            </p>
            <ul className="space-y-1.5 font-mono text-xs">
              {experiences.map((exp, i) => (
                <li
                  key={exp.company}
                  data-animate-item
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed border-[#9eff00]/10 py-1.5"
                >
                  <span style={{ color: LIME }} className="opacity-70">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <span className="truncate">
                    <span className="text-zinc-100">{exp.company}</span>
                    <span className="text-zinc-500"> // {exp.role}</span>
                  </span>
                  {exp.current && (
                    <span
                      className="text-[10px] uppercase tracking-widest border px-1.5 py-0.5"
                      style={{ color: LIME, borderColor: `${LIME}66` }}
                    >
                      atual
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats + skills */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            {stats.map(({ suffix, label, count }) => (
              <div
                key={label}
                data-animate-item
                className="terminal-panel relative corner-brackets group p-5 font-mono"
              >
                <span className="cb-tl" />
                <span className="cb-tr" />
                <span className="cb-bl" />
                <span className="cb-br" />
                <div className="scan-sweep" />
                <div
                  className="text-4xl font-bold tabular-nums glow-lime"
                  data-count={count}
                  data-suffix={suffix}
                  style={{ color: LIME }}
                >
                  0{suffix}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  // {label}
                </div>
              </div>
            ))}
          </div>

          <div data-animate-item>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 mb-3">
              // skills
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="border border-[#9eff00]/25 px-2.5 py-1 text-zinc-300 transition-colors hover:bg-[#9eff00]/10 hover:text-[#9eff00] hover:border-[#9eff00]/70"
                >
                  [ {skill} ]
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TerminalSection>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

type Project = {
  title: string
  desc:  string
  href:  string
  live?: string
  repo?: string
  tags?: string[]
}

const projects: Project[] = [
  {
    title: 'EnfantIA',
    desc: 'Plataforma educacional com experiências interativas, conteúdo dinâmico e design pensado para engajamento infantil.',
    href: 'https://enfantia.com.br/',
    live: 'https://enfantia.com.br/',
    tags: ['Web', 'UI/UX', 'React'],
  },
  {
    title: 'Audio Downloader & Transcriber',
    desc: 'Baixe áudio com yt-dlp + FFmpeg e transcreva via IA (CLI + Web).',
    href: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    repo: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    tags: ['Python', 'FFmpeg', 'yt-dlp', 'Web UI'],
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
    title: 'Rose Valenço',
    desc: 'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
    href: 'https://rosevalenco.com.br/',
    live: 'https://rosevalenco.com.br/',
    tags: ['Landing page', 'Web'],
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

function slugFile(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') + '.tsx'
}

function ProjectWindow({ p, featured = false }: { p: Project; featured?: boolean }) {
  const file = slugFile(p.title)
  const url = p.live ?? p.repo
  return (
    <div
      data-animate-item
      className={`terminal-panel corner-brackets group relative flex flex-col font-mono ${featured ? 'md:p-0' : ''}`}
    >
      <span className="cb-tl" />
      <span className="cb-tr" />
      <span className="cb-bl" />
      <span className="cb-br" />
      <div className="scan-sweep" />

      {/* Window title bar */}
      <div className="flex items-center justify-between border-b border-[#9eff00]/15 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/70 shadow-[0_0_6px_#9eff0080]" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/35" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/15" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 truncate ml-2">
          {file}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`abrir ${p.title}`}
            className="ml-3 inline-flex h-5 w-5 items-center justify-center text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
          >
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-5 ${featured ? 'md:p-7' : ''}`}>
        {featured && (
          <span
            className="mb-3 inline-flex w-fit items-center gap-1.5 border px-2 py-0.5 text-[10px] uppercase tracking-[0.22em]"
            style={{ color: LIME, borderColor: `${LIME}66` }}
          >
            <span className="h-1 w-1 rounded-full bg-[#9eff00]" />
            featured
          </span>
        )}
        <h3 className={`font-bold uppercase tracking-tight text-zinc-100 ${featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
          {p.title}
        </h3>
        <p className={`mt-2 text-xs leading-relaxed text-zinc-400 ${featured ? 'sm:text-sm' : ''}`}>
          {p.desc}
        </p>

        {p.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span
                key={t}
                className="border border-[#9eff00]/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-dashed border-[#9eff00]/15 text-[11px]">
          <span style={{ color: LIME }} className="flex items-center gap-1.5">
            <span className="opacity-70">$</span>
            <span>{p.live ? 'open --live' : p.repo ? 'open --repo' : 'wip'}</span>
            <span className="term-blink" style={{ color: LIME }}>_</span>
          </span>
          <div className="flex items-center gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> live
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <Github className="h-3 w-3" /> repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [featured, ...rest] = projects
  return (
    <TerminalSection
      id="projects"
      index="03"
      name="projects.log"
      title="Projetos"
      subtitle="tail -n 50 /var/log/projects"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:col-span-2 lg:col-span-3">
          <ProjectWindow p={featured} featured />
        </div>
        {rest.map(p => (
          <ProjectWindow key={p.title} p={p} />
        ))}
      </div>

      <div className="mt-10 flex justify-center" data-animate-item>
        <a
          href="https://github.com/gabrielvalenco"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 border border-[#9eff00]/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-[#9eff00] no-underline transition-all hover:bg-[#9eff00]/10 hover:border-[#9eff00] hover:shadow-[0_0_24px_rgba(158,255,0,0.25)]"
        >
          <span>$ git log --all</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </TerminalSection>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const contactLinks = [
  { href: 'mailto:gabrielvalencoofc@gmail.com',                       label: './email',    Icon: Mail     },
  { href: 'https://www.linkedin.com/in/gabriel-valenço-480b43276',    label: './linkedin', Icon: Linkedin },
  { href: 'https://github.com/gabrielvalenco',                        label: './github',   Icon: Github   },
]

function Contact() {
  return (
    <TerminalSection
      id="contact"
      index="04"
      name="connect"
      title="Conectar"
      subtitle="./establish_connection.sh"
    >
      <div
        data-animate-item
        className="terminal-panel corner-brackets relative overflow-hidden p-8 md:p-14"
      >
        <span className="cb-tl" />
        <span className="cb-tr" />
        <span className="cb-bl" />
        <span className="cb-br" />
        <div aria-hidden className="pointer-events-none absolute inset-0 crt-lines opacity-50" />
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-32 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(158,255,0,0.18), transparent 60%)',
          }}
        />

        <div className="relative font-mono text-sm">
          <p style={{ color: LIME }}>$ ./establish_connection.sh --target=gabriel</p>
          <p className="mt-2 text-zinc-400">
            <span style={{ color: LIME }}>&gt;</span> handshake initialized...
          </p>
          <p className="text-zinc-400">
            <span style={{ color: LIME }}>&gt;</span> latency: <span className="text-zinc-100">12ms</span>
          </p>
          <p className="text-zinc-400">
            <span style={{ color: LIME }}>&gt;</span> status: <span style={{ color: LIME }} className="glow-lime">READY</span>
            <span className="ml-1 term-blink" style={{ color: LIME }}>_</span>
          </p>

          <h3 className="mt-8 font-mono text-xl sm:text-3xl font-bold uppercase tracking-tight text-zinc-100">
            vamos trabalhar juntos?
          </h3>
          <p className="mt-3 max-w-md text-xs sm:text-sm text-zinc-400">
            disponível para projetos freelancer de SaaS, automações,
            integrações e desenvolvimento full-stack.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {contactLinks.map(({ href, label, Icon }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#9eff00]/40 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-zinc-200 no-underline transition-all hover:border-[#9eff00] hover:bg-[#9eff00]/10 hover:text-[#9eff00] hover:shadow-[0_0_28px_rgba(158,255,0,0.3)]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </TerminalSection>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useHomeAnimations()
  return (
    <div className="relative">
      <MatrixHero />

      {/* Content slides up over the pinned matrix; the codes disappear beneath it */}
      <div className="relative z-10 bg-black">
        {/* Lime feed-glow at the contact line, intensifying with scroll */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div
            className="h-px w-full"
            style={{
              background: LIME,
              opacity: 'calc(0.35 + 0.65 * var(--matrix-glow, 0))',
              boxShadow: `0 0 18px 1px ${LIME}, 0 0 6px ${LIME}`,
            }}
          />
          <div
            className="h-36 w-full"
            style={{
              background: `linear-gradient(to bottom, ${LIME}2b, transparent)`,
              opacity: 'calc(0.45 + 0.55 * var(--matrix-glow, 0))',
            }}
          />
        </div>

        <Technologies />
        <About />
        <Projects />
        <Contact />
      </div>
    </div>
  )
}
