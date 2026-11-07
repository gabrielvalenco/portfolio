import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  title?: string
  subtitle?: string
  /** Link discreto no canto direito do cabecalho. */
  action?: ReactNode
  className?: string
  children: ReactNode
}

export default function Section({ id, title, subtitle, action, className, children }: Props) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-6xl px-6 py-24 md:py-32', className)}>
      {title && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div>
            <KineticTitle text={title} className="text-3xl md:text-5xl" />
            {subtitle && (
              <Reveal as="p" index={1} className="mt-3 max-w-[65ch] text-muted-foreground">
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
