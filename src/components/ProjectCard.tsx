import type { CSSProperties } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data/projects'
import { useLang } from '@/i18n/context'
import { cn } from '@/lib/utils'

const TONES = ['lime', 'violet', 'pink'] as const

const link =
  'group/link inline-flex items-center gap-1 text-sm font-semibold text-accent-ink no-underline underline-offset-4 hover:underline'
const arrow =
  'size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'

type Props = {
  p: Project
  index?: number
  /** `wide`: imagem ao lado do texto a partir de md (card que ocupa a linha toda). */
  layout?: 'stack' | 'wide'
  /** Numero exibido sobre a imagem (ex.: "01"). */
  number?: string
  /** Atributo `sizes` da imagem, quando o card foge da grade de 3 colunas. */
  sizes?: string
  /** Troca a proporcao padrao (3:2) da area da imagem. */
  mediaClassName?: string
  className?: string
}

export default function ProjectCard({ p, index = 0, layout = 'stack', number, sizes, mediaClassName, className }: Props) {
  const { lang, t } = useLang()
  const tone = TONES[index % TONES.length]
  const wide = layout === 'wide'

  const media = p.image && (
    <>
      <img
        src={p.image}
        srcSet={`${p.image.replace('.webp', '-640.webp')} 640w, ${p.image.replace('.webp', '-800.webp')} 800w, ${p.image} 1200w`}
        sizes={sizes ?? '(min-width: 1024px) 370px, (min-width: 768px) 45vw, 100vw'}
        alt={p.title}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span
        aria-hidden
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border-2 border-ink bg-[var(--tone)] text-ink transition-transform duration-300 group-hover:rotate-45"
      >
        <ArrowUpRight className="size-5" />
      </span>
    </>
  )
  const mediaClass = cn(
    'relative block shrink-0 overflow-hidden border-border',
    wide ? 'aspect-[3/2] border-b md:aspect-auto md:w-[58%] md:border-b-0 md:border-r' : 'aspect-[3/2] border-b',
    mediaClassName,
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
        style={{ '--tone': `var(--${tone})` } as CSSProperties}
        className={cn(
          'spotlight card-pop group flex h-full flex-col overflow-hidden rounded-[1.75rem] border-[1.5px] border-border-strong bg-surface',
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
          <h3 className={cn('font-display font-bold leading-none tracking-tight', wide ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl')}>
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
