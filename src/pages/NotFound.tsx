import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/i18n/context'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="mx-auto flex min-h-[80dvh] max-w-6xl flex-col items-start justify-center px-5 pb-24 pt-40 md:px-6">
      <p aria-hidden className="hero-in font-display text-[clamp(7rem,30vw,20rem)] font-extrabold leading-[0.8] tracking-tighter text-accent-ink">
        404
      </p>
      <h1 className="hero-in mt-6 text-4xl md:text-6xl">{t.notFound.title}</h1>
      <p className="hero-in mt-4 max-w-[50ch] text-lg text-muted-foreground">{t.notFound.text}</p>
      <Button asChild size="lg" className="hero-in mt-8">
        <Link to="/">
          <ArrowLeft />
          {t.notFound.back}
        </Link>
      </Button>
    </div>
  )
}
