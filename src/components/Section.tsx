import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import KineticTitle from '@/components/KineticTitle'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  /** Numero da secao, exibido acima do titulo (ex.: "01"). */
  index?: string
  title?: string
  subtitle?: string
  /** Link ou botao exibido abaixo do titulo, na coluna da esquerda. */
  action?: ReactNode
  className?: string
  children: ReactNode
}

/**
 * Secao em duas colunas: titulo fixo a esquerda (acompanha o scroll) e conteudo a direita.
 * Assim a largura da tela e usada de ponta a ponta, sem um bloco estreito no centro.
 */
export default function Section({ id, index, title, subtitle, action, className, children }: Props) {
  return (
    <section id={id} className={cn('wrap border-t border-border py-16 md:py-24', className)}>
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        {title && (
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {index && (
                <Reveal as="p" className="mb-4 font-mono text-xs text-accent-ink">
                  {index}
                </Reveal>
              )}
              <KineticTitle text={title} className="text-4xl md:text-5xl" />
              {subtitle && (
                <Reveal as="p" index={1} className="mt-4 max-w-[38ch] text-muted-foreground">
                  {subtitle}
                </Reveal>
              )}
              {action && (
                <Reveal index={2} className="mt-6">
                  {action}
                </Reveal>
              )}
            </div>
          </header>
        )}
        <div className={title ? 'lg:col-span-8' : 'lg:col-span-12'}>{children}</div>
      </div>
    </section>
  )
}
