import { useEffect, useRef } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Code, Cpu, Database, Library, Smartphone, Github, Mail, Linkedin } from 'lucide-react'
import { createApp } from 'vue'
import ProjectsWidget from './vue/ProjectsWidget.vue'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="container mx-auto px-6 py-16">
      {children}
    </section>
  )
}

function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-24 animate-in fade-in-50">
        <p className="text-sm text-neutral-400">Gabriel Valenço</p>
        <h1 className="mt-2 text-4xl md:text-6xl font-semibold tracking-tight">
          Transformando ideias em produtos digitais
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-400">
          Desenvolvedor full-stack focado em experiências modernas e eficientes com React, Vue e Laravel.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Ver projetos</Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contato</Button>
        </div>
      </div>
    </header>
  )
}

function Technologies() {
  const items = [
    { name: 'React', desc: 'Frontend', Icon: Code },
    { name: 'Vue', desc: 'Frontend', Icon: Library },
    { name: 'Laravel', desc: 'Backend', Icon: Database },
    { name: 'Python', desc: 'Data & Backend', Icon: Cpu },
    { name: 'Flutter', desc: 'Mobile', Icon: Smartphone },
    { name: 'JavaScript', desc: 'Full-stack', Icon: Code },
  ]
  return (
    <Section id="technologies">
      <h2 className="text-2xl md:text-3xl font-semibold">Tecnologias</h2>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map(({ name, desc, Icon }) => (
          <Card key={name} className="animate-in fade-in-50">
            <CardContent className="flex items-center gap-3 p-4">
              <Icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-neutral-400">{desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about">
      <h2 className="text-2xl md:text-3xl font-semibold">Sobre</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-8 animate-in fade-in-50">
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
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold">Skills</p>
              <ul className="mt-2 text-sm text-neutral-400 space-y-1">
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
              <ul className="mt-2 text-sm text-neutral-400 space-y-1">
                <li>SpeedPark • Recepção</li>
                <li>Mundial Editora • Administrativo</li>
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
      const app = createApp(ProjectsWidget)
      app.mount(mountRef.current)
      return () => app.unmount()
    }
  }, [])
  return (
    <Section id="projects">
      <h2 className="text-2xl md:text-3xl font-semibold">Projetos</h2>
      <div ref={mountRef} className="mt-6"></div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact">
      <h2 className="text-2xl md:text-3xl font-semibold">Contato</h2>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button onClick={() => (window.location.href = 'mailto:gabrielvalencoofc@gmail.com')}>
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>
        <Button variant="outline" onClick={() => window.open('https://www.linkedin.com/in/gabriel-valenço-480b43276', '_blank')}>
          <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
        <Button variant="outline" onClick={() => window.open('https://github.com/gabrielvalenco', '_blank')}>
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900">
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
