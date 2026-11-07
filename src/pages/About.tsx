import { Link } from 'react-router-dom'
import { Briefcase, Mail } from 'lucide-react'
import SubPageHeader from '@/components/SubPageHeader'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

const label = 'mb-4 text-sm font-medium text-foreground'

export default function AboutPage() {
  const { t } = useLang()
  const a = t.about
  return (
    <>
      <SubPageHeader title={a.title} subtitle={a.subtitle} />

      <div className="mx-auto grid max-w-5xl gap-14 px-6 pb-24 md:pb-32 lg:grid-cols-[1.5fr_1fr]">
        <article className="max-w-[65ch] space-y-12 text-muted-foreground">
          <Reveal>
            <h2 className={label}>{a.introTitle}</h2>
            <p>
              <Rich text={a.intro1} />
            </p>
            <p className="mt-4">{a.intro2}</p>
          </Reveal>

          <Reveal>
            <h2 className={label}>{a.pathTitle}</h2>
            <p>
              <Rich text={a.path1} />
            </p>
            <p className="mt-4">
              <Rich text={a.path2} />
            </p>
          </Reveal>

          <Reveal>
            <h2 className={label}>{a.focusTitle}</h2>
            <ul className="space-y-4">
              {a.focus.map(f => (
                <li key={f.tag}>
                  <span className="font-medium text-foreground">{f.tag}</span>
                  <span className="block">{f.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className={label}>{a.thinkTitle}</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-border-strong">
              {a.principles.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        </article>

        <aside className="space-y-8">
          <Reveal>
            <img
              src="/pfp.webp"
              alt="Gabriel Valenço"
              width={800}
              height={1200}
              decoding="async"
              className="aspect-[4/5] w-full rounded-xl border border-border object-cover object-top"
            />
          </Reveal>

          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <h2 className={label}>{a.quickTitle}</h2>
            <dl className="space-y-3 text-sm">
              {a.facts.map(({ k, v }) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="rounded-xl border border-border bg-surface p-6">
            <h2 className={label}>{a.nowTitle}</h2>
            <p className="text-sm text-muted-foreground">{a.now1}</p>
            <p className="mt-3 text-sm text-muted-foreground">{a.now2}</p>
          </Reveal>

          <Reveal className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/experience">
                <Briefcase />
                {a.ctaJourney}
              </Link>
            </Button>
            <Button asChild>
              <a href={links.email}>
                <Mail />
                {a.ctaContact}
              </a>
            </Button>
          </Reveal>
        </aside>
      </div>
    </>
  )
}
