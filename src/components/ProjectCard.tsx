import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data/projects'
import { useLang } from '@/i18n/context'

const link =
  'group/link inline-flex items-center gap-1 text-sm font-medium text-accent-ink no-underline underline-offset-4 hover:underline'
const arrow =
  'size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'

export default function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  const { lang, t } = useLang()
  return (
    <Reveal as="article" index={index} className="h-full">
      <div
        onMouseMove={e => {
          const el = e.currentTarget
          const r = el.getBoundingClientRect()
          const x = e.clientX - r.left
          const y = e.clientY - r.top
          el.style.setProperty('--mx', `${x}px`)
          el.style.setProperty('--my', `${y}px`)
          el.style.setProperty('--ry', `${(x / r.width - 0.5) * 8}deg`)
          el.style.setProperty('--rx', `${(0.5 - y / r.height) * 8}deg`)
        }}
        onMouseLeave={e => {
          e.currentTarget.style.setProperty('--rx', '0deg')
          e.currentTarget.style.setProperty('--ry', '0deg')
        }}
        className="spotlight tilt group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface hover:border-border-strong hover:shadow-2xl hover:shadow-black/15"
      >
        {p.image && (
          <div className="aspect-[3/2] overflow-hidden border-b border-border">
            <img
              src={p.image}
              alt={p.title}
              width={1500}
              height={1000}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.desc[lang]}</p>
          {p.tags && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map(tag => (
                <Badge key={tag}>{t.common.tags[tag] ?? tag}</Badge>
              ))}
            </div>
          )}
          {(p.live || p.repo) && (
            <div className="mt-auto flex items-center gap-5 pt-5">
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className={link}>
                  {t.common.visitSite}
                  <ArrowUpRight className={arrow} />
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className={link}>
                  <Github className="size-3.5" />
                  {t.common.code}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
