import { lazy, Suspense, type CSSProperties } from 'react'
import { Link } from '@/lib/router'
import { ArrowDownRight, ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Section from '@/components/Section'
import Reveal from '@/components/Reveal'
import ProjectCard from '@/components/ProjectCard'
import TechStack from '@/components/TechStack'
import KineticTitle from '@/components/KineticTitle'
import WordRotator from '@/components/WordRotator'
import CodeCard from '@/components/CodeCard'
import { Button } from '@/components/ui/button'
import { featuredProjects } from '@/data/projects'
import { companies } from '@/data/experience'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

// As duas cenas presas no scroll ficam bem abaixo da primeira dobra: o codigo delas so e baixado depois.
const CoursesScene = lazy(() => import('@/components/CoursesScene'))
const StackScene = lazy(() => import('@/components/StackScene'))

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties
const word = (i: number) => ({ '--i': i }) as CSSProperties
const pad = (n: number) => String(n).padStart(2, '0')

const moreLink =
  'group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink no-underline underline-offset-4 hover:underline'
const moreArrow = 'size-4 transition-transform duration-150 group-hover/link:translate-x-1'

function Hero() {
  const { t } = useLang()
  return (
    <section className="wrap pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="grid items-end gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="hero-in inline-flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground">
            <span aria-hidden className="pulse-dot size-2 rounded-full bg-accent" />
            {t.hero.available}
          </p>
          <h1
            aria-label="Gabriel Valenço"
            className="kinetic kinetic-now hero-title mt-6 md:mt-8"
            style={{ '--kd': '120ms' } as CSSProperties}
          >
            <span aria-hidden className="kw">
              <span className="kw-in" style={word(0)}>Gabriel</span>
            </span>{' '}
            <span aria-hidden className="kw">
              <span className="kw-in" style={word(1)}>
                Valenço<span className="text-accent">.</span>
              </span>
            </span>
          </h1>
          <p className="hero-in mt-6 font-mono text-sm text-muted-foreground" style={delay(180)}>
            {t.hero.role}
          </p>
          <p className="hero-in mt-3 max-w-[46ch] text-xl text-muted-foreground md:text-2xl" style={delay(220)}>
            <span className="sr-only">
              {t.hero.lead} {t.hero.words.join(', ')} {t.hero.tail}
            </span>
            <span aria-hidden>
              {t.hero.lead} <WordRotator words={t.hero.words} /> {t.hero.tail}
            </span>
          </p>
          <div className="hero-in mt-9 flex flex-wrap gap-3" style={delay(280)}>
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

        <div className="hero-in lg:col-span-4" style={delay(80)}>
          <img
            src="/pfp-hero.webp"
            alt="Gabriel Valenço"
            width={640}
            height={800}
            fetchPriority="high"
            className="aspect-[4/5] w-full max-w-sm rounded-lg border border-border object-cover object-top lg:ml-auto lg:max-w-none"
          />
        </div>
      </div>

      {/* Resumo em quatro colunas, de ponta a ponta da tela. */}
      <dl className="hero-in mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 md:mt-20 lg:grid-cols-4" style={delay(340)}>
        {t.about.facts.slice(0, 4).map(({ k, v }) => (
          <div key={k}>
            <dt className="font-mono text-xs text-muted-foreground">{k}</dt>
            <dd className="mt-2 text-sm font-medium leading-snug md:text-base">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Projects() {
  const { t } = useLang()
  const [first, ...rest] = featuredProjects
  return (
    <Section
      id="projects"
      index="01"
      title={t.home.projectsTitle}
      subtitle={t.home.projectsSubtitle}
      action={
        <Link to="/projects" className={moreLink}>
          {t.home.allProjects}
          <ArrowRight className={moreArrow} />
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {first && (
          <ProjectCard p={first} index={0} number="01" layout="wide" className="md:col-span-2" sizes="(min-width: 1024px) 560px, 100vw" />
        )}
        {rest.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i + 1} number={pad(i + 2)} sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 100vw" />
        ))}
      </div>
    </Section>
  )
}

function About() {
  const { t } = useLang()
  return (
    <Section
      id="about"
      index="02"
      title={t.home.aboutTitle}
      action={
        <Link to="/about" className={moreLink}>
          {t.home.learnMore}
          <ArrowRight className={moreArrow} />
        </Link>
      }
    >
      <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal as="p" className="text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            <Rich text={t.home.p1} />
          </Reveal>
          <Reveal as="p" index={1} className="mt-6 max-w-[58ch] text-lg text-muted-foreground">
            <Rich text={t.home.p2} />
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
    <Section
      id="experience"
      index="03"
      title={t.home.experienceTitle}
      action={
        <Link to="/experience" className={moreLink}>
          {t.home.allExperience}
          <ArrowRight className={moreArrow} />
        </Link>
      }
    >
      <ul className="border-t border-border">
        {companies.map((c, i) => {
          const role = t.experience.roles[i]
          return (
            <Reveal as="li" key={c.company} index={i} className="border-b border-border">
              <div className="row-fill grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[3rem_1fr_auto]">
                <span className="row-index hidden font-mono text-xs text-muted-foreground sm:block">{pad(i + 1)}</span>
                <div>
                  <span className="block text-2xl font-semibold leading-none tracking-tight md:text-3xl">{c.company}</span>
                  <span className="mt-2 block text-muted-foreground">{role.role}</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">{role.period}</span>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}

function Stack() {
  const { t } = useLang()
  return (
    <div id="stack">
      {/* Cena guiada pelo scroll; com "reduzir movimento" o CSS mostra a lista estatica no lugar. */}
      <Suspense fallback={<div className="stack-scene" />}>
        <StackScene />
      </Suspense>
      <Section index="05" title={t.tech.title} subtitle={t.tech.subtitle} className="stack-static">
        <TechStack />
      </Section>
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
    <section id="contact" className="wrap border-t border-border py-16 md:py-24">
      {/* Painel sempre escuro (classe `dark`), ocupando a largura util inteira. */}
      <div className="dark rounded-xl bg-background px-6 py-12 text-foreground md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="mb-5 font-mono text-xs text-accent-ink">
              06 · {t.contact.title}
            </Reveal>
            <KineticTitle text={t.contact.heading} className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.04em]" />
          </div>
          <div className="lg:col-span-5">
            <Reveal as="p" className="max-w-[48ch] text-lg text-muted-foreground">
              {t.contact.text}
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      {/* O id fica num invólucro fixo: o menu e as âncoras funcionam antes mesmo de a cena carregar. */}
      <div id="courses">
        <Suspense fallback={<div className="courses-scene" />}>
          <CoursesScene />
        </Suspense>
      </div>
      <Stack />
      <Contact />
    </>
  )
}
