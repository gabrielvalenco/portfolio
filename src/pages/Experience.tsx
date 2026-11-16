import { Link } from '@/lib/router'
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

      <div className="wrap pb-24 md:pb-32">
        {/* Cada experiencia em duas colunas: quem/quando a esquerda, o que foi feito a direita. */}
        <ol>
          {companies.map((c, i) => {
            const text = e.roles[i]
            return (
              <Reveal as="li" key={c.company} className="grid gap-x-12 gap-y-4 border-t border-border py-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="flex items-center gap-3">
                    {c.company}
                    {c.current && <span aria-hidden className="pulse-dot size-2 rounded-full bg-accent" />}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{text.role}</p>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    {text.period}
                    {c.current && <span className="sr-only"> ({t.common.current})</span>}
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-border-strong">
                    {text.bullets.map(b => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.stack.map(s => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="border-t border-border pt-10">
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
              className="inline-flex items-center gap-1 text-accent-ink no-underline underline-offset-4 hover:underline"
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
