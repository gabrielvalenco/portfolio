import React, { useRef } from 'react'
import { Github, Mail, Linkedin, ArrowUpRight, User, Briefcase } from 'lucide-react'
import TechMarquee from '@/components/TechMarquee'
import MatrixHero from '@/components/MatrixHero'
import TerminalSection from '@/components/TerminalSection'
import ProjectWindow from '@/components/ProjectWindow'
import { TermLink, TermAnchor } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { gsap } from '@/lib/gsap'
import { featuredProjects } from '@/data/projects'

const LIME = '#9eff00'

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
      title="Tecnologias"
      subtitle="Ferramentas que uso no dia a dia para entregar produtos completos, do banco de dados à interface."
    >
      <div className="mt-2" data-animate-item>
        <TechMarquee />
      </div>
    </TerminalSection>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

const stats = [
  { count: 10, suffix: '+', label: 'Projetos' },
  { count: 15, suffix: '',  label: 'Tecnologias' },
  { count: 4,  suffix: '',  label: 'Certificados' },
  { count: 3,  suffix: '',  label: 'Experiências' },
]

const skills = ['Inglês avançado', 'Oratória', 'Criativo', 'Cooperativo', 'Sociável', 'Adaptável']

const experiences = [
  { company: 'Degiual',       role: 'Full Stack & Tech Lead',   current: true  },
  { company: 'Grupo Prodemi', role: 'Full Stack Developer',      current: false },
  { company: 'Jem',           role: 'Tráfego Pago',              current: false },
]

function About() {
  return (
    <TerminalSection
      id="about"
      index="02"
      title="Sobre"
      subtitle="Um pouco da minha trajetória, do que entrego e do que estou disponível para fazer."
    >
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Bio + experience */}
        <div className="space-y-6 font-mono text-sm leading-relaxed text-zinc-300">
          <p data-animate-item>
            Sou desenvolvedor full-stack focado em{' '}
            <span className="text-zinc-100">SaaS</span> e{' '}
            <span className="text-zinc-100">automações</span>, cuido de toda a
            jornada do produto, do banco de dados à interface final.
          </p>
          <p data-animate-item>
            Atualmente atuo como{' '}
            <span className="text-zinc-100">Full Stack &amp; Tech Lead</span> na{' '}
            <span className="text-zinc-100">Degiual</span>, liderando soluções
            digitais para clientes de diferentes segmentos.
          </p>
          <p data-animate-item>
            Curioso, crítico e empenhado, transformo requisitos em produtos
            funcionais, escaláveis e bem acabados.
          </p>

          <div
            data-animate-item
            className="relative border border-[#9eff00]/30 bg-[#9eff00]/[0.04] px-4 py-3"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-[#9eff00] shadow-[0_0_10px_#9eff00] animate-pulse" />
              <span style={{ color: LIME }}>Disponível para projetos</span>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              SaaS, automações, integrações e otimização de processos.
            </p>
          </div>

          <div className="pt-2" data-animate-item>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 mb-3">
              Experiência
            </p>
            <ul className="space-y-1.5 font-mono text-xs">
              {experiences.map(exp => (
                <li
                  key={exp.company}
                  data-animate-item
                  className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-dashed border-[#9eff00]/10 py-2"
                >
                  <span className="truncate">
                    <span className="text-zinc-100">{exp.company}</span>
                    <span className="text-zinc-500"> · {exp.role}</span>
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

          {/* CTAs to deeper pages */}
          <div className="flex flex-wrap gap-3 pt-2" data-animate-item>
            <Magnetic>
              <TermLink to="/about" icon={User}>Saiba mais sobre mim</TermLink>
            </Magnetic>
            <Magnetic>
              <TermLink to="/experience" icon={Briefcase}>Minha trajetória</TermLink>
            </Magnetic>
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
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div data-animate-item>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 mb-3">
              Habilidades
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="border border-[#9eff00]/25 px-3 py-1 text-zinc-300 transition-colors hover:bg-[#9eff00]/10 hover:text-[#9eff00] hover:border-[#9eff00]/70"
                >
                  {skill}
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

function Projects() {
  return (
    <TerminalSection
      id="projects"
      index="03"
      title="Projetos"
      subtitle="Uma seleção de produtos e experimentos que construí. Há muito mais na página completa."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredProjects.map(p => (
          <ProjectWindow key={p.title} p={p} featured />
        ))}
      </div>

      <div className="mt-10 flex justify-center" data-animate-item>
        <Magnetic>
          <TermLink to="/projects" icon={ArrowUpRight}>Ver todos os projetos</TermLink>
        </Magnetic>
      </div>
    </TerminalSection>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const contactLinks = [
  { href: 'mailto:gabrielvalencoofc@gmail.com',                    label: 'Email',    Icon: Mail     },
  { href: 'https://www.linkedin.com/in/gabriel-valenço-480b43276', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/gabrielvalenco',                     label: 'GitHub',   Icon: Github   },
]

function Contact() {
  return (
    <TerminalSection
      id="contact"
      index="04"
      title="Contato"
      subtitle="Tem um projeto em mente? Vamos conversar."
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

        <div className="relative font-mono">
          <div className="inline-flex items-center gap-2 border border-[#9eff00]/40 bg-[#9eff00]/[0.05] px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9eff00] shadow-[0_0_8px_#9eff00] animate-pulse" />
            <span style={{ color: LIME }}>Disponível agora</span>
          </div>

          <h3 className="mt-6 font-mono text-2xl sm:text-4xl font-bold uppercase tracking-tight text-zinc-100">
            Vamos trabalhar juntos?
          </h3>
          <p className="mt-4 max-w-md text-sm text-zinc-400">
            Disponível para projetos freelancer de SaaS, automações,
            integrações e desenvolvimento full-stack.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {contactLinks.map(({ href, label, Icon }) => (
              <Magnetic key={label}>
                <TermAnchor href={href} target={href.startsWith('mailto') ? undefined : '_blank'} icon={Icon}>
                  {label}
                </TermAnchor>
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
