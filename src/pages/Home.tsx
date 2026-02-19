import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Code, Cpu, Database, Library, Smartphone, Github, Mail, Linkedin, Coffee, Server, Cog, Cloud } from 'lucide-react'
import ProjectCarousel from '@/components/ProjectCarousel'
import Section from '@/components/Section'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { gsap } from '@/lib/gsap'

function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--mx', `${x}`)
      el.style.setProperty('--my', `${y}`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])
  return (
    <header id="home" className="relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6 py-28 animate-in fade-in-50">
        <p className="text-sm text-primary">Gabriel Valenço</p>
        <h1 className="mt-2 font-bold">
          Transformando ideias em <span className="text-primary">produtos digitais</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Desenvolvedor full-stack focado em experiências modernas e eficientes com React, Vue e Laravel.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="highlight" size="lg" aria-label="Ver projetos" className="transition-transform active:scale-95 hover:scale-[1.02] w-full sm:w-auto" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Ver projetos</Button>
          <Button variant="highlight" size="lg" aria-label="Ir para contato" className="transition-transform active:scale-95 hover:scale-[1.02] w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contato</Button>
        </div>
      </div>
      {/* Blobs removidos conforme pedido */}
    </header>
  )
}

function Technologies() {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const highlightRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const grid = gridRef.current
    const highlight = highlightRef.current
    if (!grid || !highlight) return
    const onLeave = () => {
      gsap.to(highlight, { opacity: 0, duration: 0.25, ease: 'power2.out' })
    }
    grid.addEventListener('mouseleave', onLeave)
    return () => grid.removeEventListener('mouseleave', onLeave)
  }, [])
  const moveTo = (el: HTMLElement) => {
    const grid = gridRef.current
    const highlight = highlightRef.current
    if (!grid || !highlight) return
    const r1 = grid.getBoundingClientRect()
    const r2 = el.getBoundingClientRect()
    gsap.to(highlight, {
      x: r2.left - r1.left,
      y: r2.top - r1.top,
      width: r2.width,
      height: r2.height,
      borderRadius: window.getComputedStyle(el).borderRadius,
      opacity: 1,
      duration: 0.35,
      ease: 'power3.out',
    })
  }
  const items = [
    { name: 'React', desc: 'Frontend', color: '#61DAFB', Icon: Code, category: 'Frontend' },
    { name: 'Vue', desc: 'Frontend', color: '#42B883', Icon: Library, category: 'Frontend' },
    { name: 'React Native', desc: 'Mobile', color: '#61DAFB', Icon: Smartphone, category: 'Mobile' },
    { name: 'Node.js', desc: 'Backend', color: '#68A063', Icon: Server, category: 'Backend' },
    { name: 'Laravel', desc: 'Backend', color: '#FF2D20', Icon: Database, category: 'Backend' },
    { name: 'Python', desc: 'Data & Backend', color: '#3776AB', Icon: Cpu, category: 'Backend' },
    { name: 'Java', desc: 'Backend', color: '#ED8B00', Icon: Coffee, category: 'Backend' },
    { name: 'Golang', desc: 'Backend', color: '#00ADD8', Icon: Cog, category: 'Backend' },
    { name: 'JavaScript', desc: 'Full-stack', color: '#F7DF1E', Icon: Code, category: 'Linguagem' },
    { name: 'PostgreSQL', desc: 'Banco de dados', color: '#336791', Icon: Database, category: 'Dados' },
    { name: 'Redis', desc: 'Cache', color: '#D82C20', Icon: Database, category: 'Dados' },
    { name: 'MySQL', desc: 'Banco de dados', color: '#4479A1', Icon: Database, category: 'Dados' },
    { name: 'PHP', desc: 'Backend', color: '#777BB4', Icon: Code, category: 'Backend' },
    { name: 'Docker', desc: 'Containers', color: '#2496ED', Icon: Server, category: 'DevOps' },
    { name: 'Cloudflare', desc: 'CDN', color: '#F38020', Icon: Cloud, category: 'DevOps' },
  ]
  return (
    <Section id="technologies">
      <h2 className="font-semibold">Tecnologias</h2>
      <p className="mt-2 text-sm text-muted-foreground">Stack que uso para entregar produtos de ponta a ponta.</p>
      <div ref={gridRef} className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          ref={highlightRef}
          aria-hidden
          className="pointer-events-none absolute z-10 border-2 border-primary/70 shadow-[0_0_28px_rgba(124,58,237,0.35)] rounded-2xl"
          style={{ opacity: 0 }}
        />
        {items.map(({ name, desc, color, Icon, category }, i) => (
          <div
            key={name}
            data-t-index={i}
            onMouseEnter={(e) => moveTo(e.currentTarget as HTMLElement)}
            className="group relative overflow-hidden rounded-xl border border-border/80 bg-card/80 p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_0_26px_rgba(124,58,237,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                {name === 'React' ? (
                  <img src="/src/assets/react.svg" alt="React" className="size-5" />
                ) : name === 'Vue' ? (
                  <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" className="size-5"><path fill="#41B883" d="M204.8 0H256L128 221L0 0h51.2L128 110.592L204.8 0z"/><path fill="#35495E" d="M0 0l128 221L256 0h-51.2L128 110.592L51.2 0H0z"/></svg>
                ) : (
                  <Icon className="h-5 w-5" style={{ color }} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{name}</span>
                <span className="text-xs text-muted-foreground">{category}</span>
              </div>
            </div>
            <p className="relative mt-3 text-xs text-muted-foreground">{descCopy(name, desc)}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function descCopy(name: string, desc: string) {
  if (name === 'React') return 'SPA modernas, componentes reutilizáveis e integrações com ecossistema JS.'
  if (name === 'Vue') return 'Interfaces reativas com foco em legibilidade e produtividade.'
  if (name === 'React Native') return 'Apps nativos para iOS e Android com o mesmo mindset de React.'
  if (name === 'Node.js') return 'APIs escaláveis, filas e serviços backend em produção.'
  if (name === 'Laravel') return 'Backends rápidos com boas práticas, autenticação e filas.'
  if (name === 'Docker') return 'Ambientes isolados e reproduzíveis para cada projeto.'
  if (name === 'Cloudflare') return 'CDN, DNS e edge functions para baixa latência.'
  return desc
}

function About() {
  return (
    <Section id="about">
      <h2 className="font-semibold">Sobre</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-10 animate-in fade-in-50">
        <div className="space-y-4">
          <p>
            Desenvolvedor full‑stack com foco na área de SaaS e automações, responsável por criar e otimizar fluxos de ponta a ponta.
          </p>
          <p>
            Curioso, cativado, crítico e empenhado — gosto de transformar requisitos em produtos funcionais, escaláveis e bem acabados.
          </p>
          <div className="mt-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-3 text-primary dark:text-white">
            <span className="font-semibold">Disponível para freelancer:</span> SaaS, automações (n8n), integrações e otimização de processos.
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card text-card-foreground p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold">Skills</p>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>Inglês avançado</li>
                <li>Oratória</li>
                <li>Criativo</li>
                <li>Cooperativo</li>
                <li>Sociável</li>
                <li>Adaptável</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold">Experiências</p>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>Grupo Prodemi • Full Stack</li>
                <li>Jem • Tráfego pago</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects">
      <h2 className="font-semibold">Projetos</h2>
      <div className="mt-6">
        <ProjectCarousel />
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact">
      <h2 className="font-semibold">Contato</h2>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button variant="highlight" onClick={() => (window.location.href = 'mailto:gabrielvalencoofc@gmail.com')}>
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>
        <Button variant="highlight" onClick={() => window.open('https://www.linkedin.com/in/gabriel-valenço-480b43276', '_blank')}>
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
        <Button variant="highlight" onClick={() => window.open('https://github.com/gabrielvalenco', '_blank')}>
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </div>
    </Section>
  )
}

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
