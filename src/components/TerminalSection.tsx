import type { ReactNode } from 'react'

const LIME = '#9eff00'

export default function TerminalSection({
  id, index, title, subtitle, children,
}: {
  id: string
  index: string
  /** Optional — kept for backwards compatibility but no longer rendered. */
  name?: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative border-t border-[#9eff00]/10">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <header className="mb-12" data-term-head>
          <div
            className="flex items-center gap-4 font-mono text-[11px] tracking-[0.32em]"
            data-term-meta
            style={{ color: LIME }}
          >
            <span>{index}</span>
            <span className="h-px w-16 sm:w-24" style={{ background: `${LIME}66` }} />
          </div>
          <h2
            className="mt-5 font-mono text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none"
            data-term-title
          >
            <span data-term-text>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-xl font-mono text-sm text-zinc-400" data-term-sub>
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
