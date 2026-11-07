import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLang } from '@/i18n/context'

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

export default function SubPageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { t } = useLang()
  return (
    <header className="mx-auto max-w-5xl px-6 pb-12 pt-32 md:pt-36">
      <Link
        to="/"
        className="hero-in inline-flex items-center gap-2 text-sm text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t.common.back}
      </Link>
      <h1 className="hero-in mt-6" style={delay(80)}>
        {title}
      </h1>
      {subtitle && (
        <p className="hero-in mt-4 max-w-[65ch] text-lg text-muted-foreground" style={delay(160)}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
