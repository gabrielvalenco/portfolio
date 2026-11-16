import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data/projects'
import { useLang } from '@/i18n/context'
import { cn } from '@/lib/utils'

const link =
  'group/link inline-flex items-center gap-1 text-sm font-medium text-accent-ink no-underline underline-offset-4 hover:underline'
const arrow =
  'size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'

type Props = {
  p: Project
  index?: number
  /** `wide`: imagem ao lado do texto a partir de md (card que ocupa a linha toda). */
  layout?: 'stack' | 'wide'
  /** Numero exibido acima do titulo (ex.: "01"). */
  number?: string
  /** Atributo `sizes` da imagem, quando o card foge da grade de 3 colunas. */
  sizes?: string
  className?: string
}

export default function ProjectCard({ p, index = 0, layout = 'stack', number, sizes, className }: Props) {
  const { lang, t } = useLang()
  const wide = layout === 'wide'

  const media = p.image && (
    <img
      src={p.image}
      srcSet={`${p.image.replace('.webp', '-640.webp')} 640w, ${p.image.replace('.webp', '-800.webp')} 800w, ${p.image} 1200w`}
      sizes={sizes ?? '(min-width: 1024px) 420px, (min-width: 768px) 45vw, 100vw'}
      alt={p.title}
      width={1200}
      height={800}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
    />
  )
  const mediaClass = cn(
    'relative block shrink-0 overflow-hidden border-border',
    wide ? 'aspect-[3/2] border-b md:aspect-auto md:w-[58%] md:border-b-0 md:border-r' : 'aspect-[3/2] border-b',
  )

  return (
    <Reveal as="article" index={index} className={cn('h-full', className)}>
      <div
        onMouseMove={e => {
          const el = e.currentTarget
          const r = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${e.clientX - r.left}px`)
          el.style.setProperty('--my', `${e.clientY - r.top}px`)
        }}
        className={cn(
          'spotlight lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface',
          wide && 'md:flex-row',
        )}
      >
        {/* A imagem leva ao site, mas fica fora da ordem de tab: o link "Ver site" abaixo ja cobre o teclado. */}
        {p.image &&
          (p.live ? (
            <a href={p.live} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className={mediaClass}>
              {media}
            </a>
          ) : (
            <div className={mediaClass}>{media}</div>
          ))}
        <div className={cn('flex flex-1 flex-col p-6', wide && 'md:justify-center md:p-10')}>
          {number && <span className="mb-3 font-mono text-xs text-muted-foreground">{number}</span>}
          <h3 className={cn('font-semibold leading-tight tracking-tight', wide ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl')}>
            {p.title}
          </h3>
          <p className={cn('mt-3 text-muted-foreground', wide ? 'text-base' : 'line-clamp-3 text-sm')}>{p.desc[lang]}</p>
          {p.tags && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map(tag => (
                <Badge key={tag}>{t.common.tags[tag] ?? tag}</Badge>
              ))}
            </div>
          )}
          {(p.live || p.repo) && (
            <div className={cn('flex items-center gap-5 pt-6', !wide && 'mt-auto')}>
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
