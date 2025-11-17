import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Cpu, Database, Library, Smartphone, Github, Mail, Linkedin, Coffee, Server, Cog, Cloud } from 'lucide-react'
import { createApp } from 'vue'
import ProjectCarousel from '@/components/ProjectCarousel'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            el.style.transition = 'opacity 600ms ease, transform 600ms ease'
          }
        }
      },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} id={id} className="container mx-auto px-6 py-16 will-change-transform">
      {children}
    </section>
  )
}

import Particles from '@/components/Particles'

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
      <Particles density={80} />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-[28rem] bg-gradient-to-tr from-primary/40 to-accent/40 blur-3xl animate-[blobMorph_16s_ease-in-out_infinite]" style={{ transform: 'translate3d(calc(var(--mx,0)*12px), calc(var(--my,0)*12px), 0)' }} />
        <div className="absolute top-24 right-10 size-[22rem] bg-gradient-to-br from-secondary/40 to-primary/30 blur-3xl animate-[blobMorph_18s_ease-in-out_infinite]" style={{ transform: 'translate3d(calc(var(--mx,0)*-10px), calc(var(--my,0)*-10px), 0)' }} />
      </div>
    </header>
  )
}

function Technologies() {
  const items = [
    { name: 'React', desc: 'Frontend', color: '#61DAFB', Icon: Code },
    { name: 'Vue', desc: 'Frontend', color: '#42B883', Icon: Library },
    { name: 'React Native', desc: 'Mobile', color: '#61DAFB', Icon: Smartphone },
    { name: 'Node.js', desc: 'Backend', color: '#68A063', Icon: Server },
    { name: 'Laravel', desc: 'Backend', color: '#FF2D20', Icon: Database },
    { name: 'Python', desc: 'Data & Backend', color: '#3776AB', Icon: Cpu },
    { name: 'Java', desc: 'Backend', color: '#ED8B00', Icon: Coffee },
    { name: 'Golang', desc: 'Backend', color: '#00ADD8', Icon: Cog },
    { name: 'JavaScript', desc: 'Full-stack', color: '#F7DF1E', Icon: Code },
    { name: 'PostgreSQL', desc: 'Banco de dados', color: '#336791', Icon: Database },
    { name: 'Redis', desc: 'Cache', color: '#D82C20', Icon: Database },
    { name: 'MySQL', desc: 'Banco de dados', color: '#4479A1', Icon: Database },
    { name: 'PHP', desc: 'Backend', color: '#777BB4', Icon: Code },
    { name: 'Docker', desc: 'Containers', color: '#2496ED', Icon: Server },
    { name: 'Cloudflare', desc: 'CDN', color: '#F38020', Icon: Cloud },
  ]
  return (
    <Section id="technologies">
      <h2 className="font-semibold">Tecnologias</h2>
      <p className="mt-2 text-sm text-muted-foreground">Ferramentas que uso no dia a dia</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {items.map(({ name, color, Icon }) => (
          <Badge key={name} variant="outline" className="border-primary/50 bg-primary/10 hover:bg-primary/20 text-foreground">
            {name === 'React' ? (
              <img src="/src/assets/react.svg" alt="React" className="size-4" />
            ) : name === 'Vue' ? (
              <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" className="size-4"><path fill="#41B883" d="M204.8 0H256L128 221L0 0h51.2L128 110.592L204.8 0z"/><path fill="#35495E" d="M0 0l128 221L256 0h-51.2L128 110.592L51.2 0H0z"/></svg>
            ) : (
              <Icon className="h-4 w-4" style={{ color }} />
            )}
            <span className="ml-1 font-medium">{name}</span>
          </Badge>
        ))}
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about">
      <h2 className="font-semibold">Sobre</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-10 animate-in fade-in-50">
        <div className="space-y-4">
          <p>
            Desenvolvedor full-stack, 20 anos, com foco em front-end moderno.
          </p>
          <p>
            Iniciei em 2023, unindo formação em Sistemas para Internet e aprendizado contínuo em ferramentas modernas.
          </p>
          <p>
            Adaptável e curioso, gosto de construir soluções robustas e intuitivas.
          </p>
          <div className="mt-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-3 text-primary dark:text-white">
            <span className="font-semibold">Disponível para freelancer:</span> automações com n8n, landing pages e e-commerce.
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
  const mountRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (mountRef.current) {
      let app: ReturnType<typeof createApp> | null = null
      const io = new IntersectionObserver(entries => {
        for (const e of entries) {
          if (e.isIntersecting && !app) {
            import('@/vue/ProjectsWidget.vue').then(mod => {
              app = createApp(mod.default)
              app.mount(mountRef.current!)
            })
          }
        }
      }, { threshold: 0.2 })
      io.observe(mountRef.current)
      return () => {
        io.disconnect()
        if (app) app.unmount()
      }
    }
  }, [])
  return (
    <Section id="projects">
      <h2 className="font-semibold">Projetos</h2>
      <div className="mt-6">
        <ProjectCarousel />
      </div>
      <div ref={mountRef} className="mt-10"></div>
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

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-background">
      <a href="#home" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] px-3 py-2 rounded bg-primary text-primary-foreground">Ir para conteúdo</a>
      <Navbar />
      <Hero />
      <Technologies />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
