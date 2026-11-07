import { Link } from 'react-router-dom'
import { ExternalLink, Linkedin, User } from 'lucide-react'
import SubPageHeader from '@/components/SubPageHeader'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { companies } from '@/data/experience'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'

export default function ExperiencePage() {
  const { t } = useLang()
  const e = t.experience
  return (
    <>
      <SubPageHeader title={e.title} subtitle={e.subtitle} />

      <div className="mx-auto max-w-5xl px-6 pb-24 md:pb-32">
        {/* Timeline: linha vertical fina, um marcador por experiencia. */}
        <ol className="relative space-y-12 border-l border-border pl-8">
          {companies.map((c, i) => {
            const text = e.roles[i]
            return (
              <Reveal as="li" key={c.company} className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-[37px] top-2 size-2.5 rounded-full border ${
                    c.current ? 'border-accent bg-accent' : 'border-border-strong bg-background'
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2>
                    {c.company}
                    {c.current && (
                      <span className="ml-3 align-middle text-xs font-medium text-accent">{t.common.current}</span>
                    )}
                  </h2>
                  <span className="text-sm text-muted-foreground">{text.period}</span>
                </div>
                <p className="mt-1 text-muted-foreground">{text.role}</p>
                <ul className="mt-4 max-w-[65ch] list-disc space-y-2 pl-5 text-muted-foreground marker:text-border-strong">
                  {text.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.stack.map(s => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="mt-20 border-t border-border pt-10">
          <h2 className="mb-6">{e.educationTitle}</h2>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">Unisalesiano</h3>
            <span className="text-sm text-muted-foreground">2021 - 2025</span>
          </div>
          <p className="mt-1 text-muted-foreground">{e.degree}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-muted-foreground">{e.graduated}</span>
            <a
              href="https://unisalesiano.com.br/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-accent no-underline underline-offset-4 hover:underline"
            >
              <ExternalLink className="size-3.5" /> unisalesiano.com.br
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-14 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to="/about">
              <User />
              {e.ctaAbout}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin />
              LinkedIn
            </a>
          </Button>
        </Reveal>
      </div>
    </>
  )
}
