import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import TechStack from '@/components/TechStack'
import KineticTitle from '@/components/KineticTitle'
import WordRotator from '@/components/WordRotator'
import HeroChips from '@/components/HeroChips'
import BigMarquee from '@/components/BigMarquee'
import SideDecor from '@/components/SideDecor'
import CodeCard from '@/components/CodeCard'
import CourseList from '@/components/CourseList'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/data/projects'
import { companies } from '@/data/experience'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

const moreLink =
  'group/link inline-flex items-center gap-1 text-sm font-medium text-accent-ink no-underline underline-offset-4 hover:underline'
const moreArrow = 'size-4 transition-transform duration-150 group-hover/link:translate-x-0.5'

function Hero() {
  const { t } = useLang()
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur">
            <span aria-hidden className="pulse-dot size-2 rounded-full bg-accent" />
            {t.hero.available}
          </p>
          <KineticTitle
            as="h1"
            text="Gabriel Valenço"
            immediate
            delayMs={150}
            wordClassName="gradient-text"
            className="mt-8 text-5xl md:text-7xl"
          />
          <p className="hero-in mt-4 text-xl text-muted-foreground md:text-2xl" style={delay(140)}>
            {t.hero.role}
          </p>
          <p className="hero-in mt-6 max-w-[55ch] text-lg md:text-xl" style={delay(200)}>
            <span className="sr-only">
              {t.hero.lead} {t.hero.words.join(', ')} {t.hero.tail}
            </span>
            <span aria-hidden>
              {t.hero.lead} <WordRotator words={t.hero.words} /> {t.hero.tail}
            </span>
          </p>
          <div className="hero-in mt-10 flex flex-wrap gap-3" style={delay(260)}>
            <Button asChild size="lg">
              <Link to={{ pathname: '/', hash: 'projects' }}>{t.hero.ctaProjects}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={{ pathname: '/', hash: 'contact' }}>{t.hero.ctaContact}</Link>
            </Button>
          </div>
        </div>

        <div className="hero-in mx-auto w-full max-w-[19rem] lg:max-w-sm lg:justify-self-end" style={delay(200)}>
          <div className="relative">
          <div className="portrait">
            <img
              src="/pfp.webp"
              alt="Gabriel Valenço"
              width={800}
              height={1200}
              fetchPriority="high"
              className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top"
            />
          </div>
            <HeroChips />
          </div>
        </div>
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
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
      <div>
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
      </div>
      <CodeCard />
      </div>
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

function Courses() {
  const { t } = useLang()
  return (
    <Section id="courses" title={t.courses.title} subtitle={t.courses.subtitle}>
      <CourseList />
      <Reveal className="mt-8">
        <Link to="/certificates" className={moreLink}>
          {t.courses.more}
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
    <div className="relative">
      <SideDecor />
      <div className="relative z-10">
        <Hero />
        <BigMarquee />
        <Projects />
        <About />
        <Experience />
        <Courses />
        <Stack />
        <Contact />
      </div>
    </div>
  )
}
