import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { courses } from '@/data/courses'
import { useLang } from '@/i18n/context'

export default function CourseList() {
  const { lang, t } = useLang()
  const locale = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[lang]
  const fmt = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' })

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {courses.map((c, i) => {
        const meta = [
          c.date ? fmt.format(new Date(`${c.date}-15T12:00:00`)) : null,
          c.hours ? `${c.hours.toLocaleString(locale)} h` : null,
        ].filter(Boolean)
        return (
          <Reveal as="li" key={c.title} index={i % 2}>
            <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors duration-200 hover:border-border-strong">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium leading-snug">{c.title}</h3>
                <Badge>{c.provider}</Badge>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-accent-ink" />
                  {t.courses.done}
                  {meta.length > 0 && <span> · {meta.join(' · ')}</span>}
                </span>
                {c.certificate && (
                  <a
                    href={c.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-1 font-medium text-accent-ink no-underline underline-offset-4 hover:underline"
                  >
                    {t.courses.certificate}
                    <ArrowUpRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}
