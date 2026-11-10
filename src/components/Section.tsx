import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  /** Numero da secao, exibido como etiqueta acima do titulo (ex.: "01"). */
  index?: string
  title?: string
  subtitle?: string
  /** Link discreto no canto direito do cabecalho. */
  action?: ReactNode
  className?: string
  children: ReactNode
}

export default function Section({ id, index, title, subtitle, action, className, children }: Props) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-6xl px-5 py-20 md:px-6 md:py-28', className)}>
      {title && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            {index && (
              <Reveal as="p" className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-ink">
                <span aria-hidden className="h-px w-10 bg-current" />
                {index}
              </Reveal>
            )}
            <KineticTitle text={title} className="text-5xl md:text-7xl" />
            {subtitle && (
              <Reveal as="p" index={1} className="mt-5 max-w-[60ch] text-lg text-muted-foreground">
                {subtitle}
              </Reveal>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
