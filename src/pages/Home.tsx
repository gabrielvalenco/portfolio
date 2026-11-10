import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import TechStack from '@/components/TechStack'
import StackScene from '@/components/StackScene'
import KineticTitle from '@/components/KineticTitle'
import WordRotator from '@/components/WordRotator'
import HeroChips from '@/components/HeroChips'
import HeroMedia from '@/components/HeroMedia'
import BigMarquee from '@/components/BigMarquee'
import CodeCard from '@/components/CodeCard'
import CoursesScene from '@/components/CoursesScene'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/data/projects'
import { companies } from '@/data/experience'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties
const word = (i: number) => ({ '--i': i }) as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

const moreLink =
  'group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink no-underline underline-offset-4 hover:underline'
const moreArrow = 'size-4 transition-transform duration-150 group-hover/link:translate-x-1'

function Hero() {
  const { t } = useLang()
  return (
    <section className="p-2.5 md:p-4">
      {/* Palco: sempre escuro (classe `dark`), com o video/animacao ao fundo. */}
      <div className="dark stage relative isolate flex min-h-[calc(100svh-1.25rem)] flex-col overflow-hidden rounded-[2rem] border border-foreground/10 text-foreground md:min-h-[calc(100svh-2rem)] md:rounded-[2.75rem]">
        <HeroMedia />
        <div aria-hidden className="stage-scrim" />

        <div className="flex flex-1 flex-col justify-end px-5 pb-7 pt-28 md:px-10 md:pb-10 md:pt-32 lg:px-14">
          <div className="grid items-end gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="order-2 min-w-0 lg:order-1">
              <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-foreground/25 bg-background/45 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider backdrop-blur">
                <span aria-hidden className="pulse-dot size-2 rounded-full bg-lime" />
                {t.hero.available}
              </p>
              <h1
                aria-label="Gabriel Valenço"
                className="kinetic kinetic-now hero-title mt-5 md:mt-7"
                style={{ '--kd': '150ms' } as CSSProperties}
              >
                <span aria-hidden className="kw kw-block">
                  <span className="kw-in" style={word(0)}>Gabriel</span>
                </span>
                <span aria-hidden className="kw kw-block">
                  <span className="kw-in text-lime" style={word(1)}>Valenço</span>
                </span>
              </h1>
            </div>

            <div
              className="portrait-wrap hero-in relative order-1 w-36 justify-self-end sm:w-44 lg:order-2 lg:mb-8 lg:mr-10 lg:w-[clamp(14rem,19vw,18.5rem)]"
              style={delay(60)}
            >
              <div className="portrait">
                <img
                  src="/pfp-hero.webp"
                  alt="Gabriel Valenço"
                  width={640}
                  height={800}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <HeroChips />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-6 border-t border-foreground/20 pt-6 md:mt-9 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="hero-in max-w-[46ch]" style={delay(200)}>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">{t.hero.role}</p>
              <p className="text-lg md:text-xl">
                <span className="sr-only">
                  {t.hero.lead} {t.hero.words.join(', ')} {t.hero.tail}
                </span>
                <span aria-hidden>
                  {t.hero.lead} <WordRotator words={t.hero.words} /> {t.hero.tail}
                </span>
              </p>
            </div>
            <div className="hero-in flex shrink-0 flex-wrap gap-3" style={delay(260)}>
              <Button asChild size="lg">
                <Link to={{ pathname: '/', hash: 'projects' }}>
                  {t.hero.ctaProjects}
                  <ArrowDownRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={{ pathname: '/', hash: 'contact' }}>{t.hero.ctaContact}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { t } = useLang()
  return (
    <Section id="projects" index="01" title={t.home.projectsTitle} subtitle={t.home.projectsSubtitle} className="pt-12 md:pt-20">
      {/* Grade assimetrica: 7 + 5 colunas, e a cada terceiro projeto um card deitado ocupando a linha. */}
      <div className="grid gap-6 lg:grid-cols-12">
        {featuredProjects.map((p, i) => {
          const slot = i % 3
          return (
            <ProjectCard
              key={p.title}
              p={p}
              index={i}
              number={pad(i + 1)}
              layout={slot === 2 ? 'wide' : 'stack'}
              className={slot === 0 ? 'lg:col-span-7' : slot === 1 ? 'lg:col-span-5' : 'lg:col-span-12'}
              mediaClassName={slot === 2 ? undefined : 'aspect-[3/2] lg:aspect-auto lg:h-80'}
              sizes={slot === 1 ? '(min-width: 1024px) 460px, 100vw' : '(min-width: 1024px) 660px, 100vw'}
            />
          )
        })}
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
    <Section id="about" index="02" title={t.home.aboutTitle}>
      <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal as="p" className="font-display text-2xl font-medium leading-snug tracking-tight md:text-[2rem]">
            <Rich text={t.home.p1} />
          </Reveal>
          <Reveal as="p" index={1} className="mt-6 max-w-[60ch] text-lg text-muted-foreground">
            <Rich text={t.home.p2} />
          </Reveal>
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
    <Section id="experience" index="03" title={t.home.experienceTitle}>
      <ul className="border-t border-border">
        {companies.map((c, i) => {
          const role = t.experience.roles[i]
          return (
            <Reveal as="li" key={c.company} index={i} className="border-b border-border">
              <div className="row-fill grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[3rem_1fr_auto] md:py-8">
                <span className="row-muted hidden font-mono text-xs text-muted-foreground sm:block">{pad(i + 1)}</span>
                <div>
                  <span className="block font-display text-3xl font-bold leading-none tracking-tight md:text-5xl">{c.company}</span>
                  <span className="row-muted mt-2 block text-muted-foreground">{role.role}</span>
                </div>
                <span className="row-muted font-mono text-sm text-muted-foreground">{role.period}</span>
              </div>
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
    <div id="stack">
      {/* Cena guiada pelo scroll; com "reduzir movimento" o CSS mostra a lista estatica no lugar. */}
      <StackScene />
      <Section index="05" title={t.tech.title} subtitle={t.tech.subtitle} className="stack-static">
        <TechStack />
      </Section>
    </div>
  )
}

/** Selo com o texto em circulo, girando devagar. */
function SpinBadge({ text }: { text: string }) {
  return (
    <div aria-hidden className="relative size-32 md:size-40">
      <svg viewBox="0 0 100 100" className="spin-slow size-full overflow-visible">
        <defs>
          <path id="spin-badge-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-current font-mono text-[7.6px] font-medium uppercase">
          <textPath href="#spin-badge-path" textLength="246" lengthAdjust="spacing">
            {text} ✦ {text} ✦
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-ink text-lime md:size-16">
        <ArrowDownRight className="size-6" />
      </span>
    </div>
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
    <section id="contact" className="p-2.5 pt-10 md:p-4 md:pt-16">
      <div className="on-lime relative overflow-hidden rounded-[2rem] bg-lime px-6 py-14 md:rounded-[2.75rem] md:px-14 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal as="p" className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span aria-hidden className="h-px w-10 bg-current" />
            06 · {t.contact.title}
          </Reveal>
          <KineticTitle
            text={t.contact.heading}
            className="max-w-[11ch] text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em]"
          />
          <Reveal as="p" className="mt-8 max-w-[52ch] text-lg text-muted-foreground">
            {t.contact.text}
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap gap-3" index={1}>
            {items.map(({ href, label, Icon, external }, i) => (
              <Button key={label} asChild variant={i === 0 ? 'default' : 'outline'} size="lg">
                <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  <Icon />
                  {label}
                </a>
              </Button>
            ))}
          </Reveal>
        </div>
        <div className="absolute right-6 top-6 hidden sm:block md:right-12 md:top-12">
          <SpinBadge text={t.hero.available} />
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <BigMarquee />
      <Projects />
      <About />
      <Experience />
      <CoursesScene />
      <Stack />
      <Contact />
    </>
  )
}
