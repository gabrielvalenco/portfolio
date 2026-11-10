import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/i18n/context'
import KineticTitle from '@/components/KineticTitle'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

export default function SubPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { t } = useLang()
  return (
    <header className="mx-auto max-w-6xl px-5 pb-14 pt-36 md:px-6 md:pt-44">
      <Link
        to="/"
        className="hero-in group/back inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform duration-150 group-hover/back:-translate-x-1" />
        {t.common.back}
      </Link>
      <KineticTitle as="h1" text={title} immediate delayMs={80} className="mt-6 text-6xl md:text-8xl" />
      {subtitle && (
        <p className="hero-in mt-6 max-w-[60ch] text-lg text-muted-foreground md:text-xl" style={delay(160)}>
          {subtitle}
        </p>
      )}
      <div aria-hidden className="hero-in mt-10 flex h-1.5 overflow-hidden rounded-full" style={delay(220)}>
        <span className="w-24 bg-lime" />
        <span className="w-12 bg-violet" />
        <span className="w-6 bg-pink" />
      </div>
    </header>
  )
}
