import type { ReactNode } from 'react'

const LIME = '#9eff00'

export default function TerminalSection({
  id, index, name, title, subtitle, children,
}: {
  id: string
  index: string
  name: string
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative border-t border-[#9eff00]/10">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <header className="mb-12" data-term-head>
          <div
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em]"
            data-term-meta
            style={{ color: LIME }}
          >
            <span className="opacity-70">// {index}</span>
            <span className="h-px w-10 sm:w-16" style={{ background: `${LIME}66` }} />
            <span>./{name}</span>
          </div>
          <h2
            className="mt-5 font-mono text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none term-glitch"
            data-term-title
          >
            <span style={{ color: LIME }}>&gt;_</span> <span data-term-text>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-xl font-mono text-sm text-zinc-400" data-term-sub>
              <span style={{ color: LIME }}>$</span> {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
