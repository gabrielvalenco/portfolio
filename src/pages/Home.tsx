import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import TechStack from '@/components/TechStack'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/data/projects'
import { companies } from '@/data/experience'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

const moreLink =
  'group/link inline-flex items-center gap-1 text-sm font-medium text-accent no-underline underline-offset-4 hover:underline'
const moreArrow = 'size-4 transition-transform duration-150 group-hover/link:translate-x-0.5'

function Hero() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="hero-in flex items-center gap-4">
        <img
          src="/pfp-sm.webp"
          alt="Gabriel Valenço"
          width={128}
          height={128}
          fetchPriority="high"
          className="size-16 rounded-full object-cover object-top"
        />
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          {t.hero.available}
        </p>
      </div>
      <h1 className="hero-in mt-8" style={delay(80)}>
        Gabriel Valenço
      </h1>
      <p className="hero-in mt-3 text-xl text-muted-foreground md:text-2xl" style={delay(140)}>
        {t.hero.role}
      </p>
      <p className="hero-in mt-6 max-w-[55ch] text-lg" style={delay(200)}>
        {t.hero.tagline}
      </p>
      <div className="hero-in mt-10 flex flex-wrap gap-3" style={delay(260)}>
        <Button asChild size="lg">
          <Link to={{ pathname: '/', hash: 'projects' }}>{t.hero.ctaProjects}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to={{ pathname: '/', hash: 'contact' }}>{t.hero.ctaContact}</Link>
        </Button>
      </div>
    </section>
  )
}

function Projects() {
  const { t } = useLang()
  return (
    <Section
      id="projects"
      title={t.home.projectsTitle}
      subtitle={t.home.projectsSubtitle}
      className="pt-0 md:pt-0"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} />
        ))}
      </div>
      <Reveal className="mt-10">
        <Link to="/projects" className={moreLink}>
          {t.home.allProjects}
          <ArrowRight className={moreArrow} />
        </Link>
      </Reveal>
    </Section>
  )
}

function About() {
  const { t } = useLang()
  return (
    <Section id="about" title={t.home.aboutTitle}>
      <div className="max-w-[65ch] space-y-5 text-lg text-muted-foreground">
        <Reveal as="p">
          <Rich text={t.home.p1} />
        </Reveal>
        <Reveal as="p" index={1}>
          <Rich text={t.home.p2} />
        </Reveal>
      </div>
      <Reveal className="mt-8" index={2}>
        <Link to="/about" className={moreLink}>
          {t.home.learnMore}
          <ArrowRight className={moreArrow} />
        </Link>
      </Reveal>
    </Section>
  )
}

function Experience() {
  const { t } = useLang()
  return (
    <Section id="experience" title={t.home.experienceTitle}>
      <ul className="divide-y divide-border border-y border-border">
        {companies.map((c, i) => {
          const role = t.experience.roles[i]
          return (
            <Reveal as="li" key={c.company} index={i} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
              <div>
                <span className="font-medium">{c.company}</span>
                <span className="text-muted-foreground"> · {role.role}</span>
              </div>
              <span className="text-sm text-muted-foreground">{role.period}</span>
            </Reveal>
          )
        })}
      </ul>
      <Reveal className="mt-8">
        <Link to="/experience" className={moreLink}>
          {t.home.allExperience}
          <ArrowRight className={moreArrow} />
        </Link>
      </Reveal>
    </Section>
  )
}

function Stack() {
  const { t } = useLang()
  return (
    <Section id="stack" title={t.tech.title} subtitle={t.tech.subtitle}>
      <TechStack />
    </Section>
  )
}

function Contact() {
  const { t } = useLang()
  const items = [
    { href: links.email, label: 'Email', Icon: Mail, external: false },
    { href: links.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
    { href: links.github, label: 'GitHub', Icon: Github, external: true },
  ]
  return (
    <Section id="contact" title={t.contact.title}>
      <Reveal>
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{t.contact.heading}</h3>
        <p className="mt-3 max-w-[65ch] text-muted-foreground">{t.contact.text}</p>
      </Reveal>
      <Reveal className="mt-8 flex flex-wrap gap-3" index={1}>
        {items.map(({ href, label, Icon, external }, i) => (
          <Button key={label} asChild variant={i === 0 ? 'default' : 'outline'} size="lg">
            <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <Icon />
              {label}
            </a>
          </Button>
        ))}
      </Reveal>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Stack />
      <Contact />
    </>
  )
}
