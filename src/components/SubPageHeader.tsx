import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const LIME = '#9eff00'

export default function SubPageHeader({
  index, name, title, subtitle,
}: { index: string; name: string; title: string; subtitle?: string }) {
  return (
    <header
      className="relative border-b border-[#9eff00]/15 bg-black"
      data-term-head
    >
      {/* Top lime glow line (matches matrix feed glow style) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: LIME, opacity: 0.6, boxShadow: '0 0 16px 1px #9eff00' }}
      />
      <div className="container mx-auto px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400 no-underline transition-colors hover:text-[#9eff00]"
        >
          <ArrowLeft className="h-3 w-3" />
          $ cd ..
        </Link>
      </div>
      <div className="container mx-auto px-6 pb-12 pt-2">
        <div
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em]"
          data-term-meta
          style={{ color: LIME }}
        >
          <span className="opacity-70">// {index}</span>
          <span className="h-px w-10 sm:w-16" style={{ background: `${LIME}66` }} />
          <span>./{name}</span>
        </div>
        <h1
          className="mt-5 font-mono text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none term-glitch"
          data-term-title
        >
          <span style={{ color: LIME }}>&gt;_</span> <span data-term-text>{title}</span>
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl font-mono text-sm text-zinc-400" data-term-sub>
            <span style={{ color: LIME }}>$</span> {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
