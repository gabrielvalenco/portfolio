import { Link } from '@/lib/router'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/i18n/context'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="wrap grid min-h-[80dvh] items-end gap-x-12 gap-y-8 pb-24 pt-40 lg:grid-cols-12">
      <p aria-hidden className="hero-in text-[clamp(7rem,26vw,20rem)] font-semibold leading-[0.8] tracking-tighter lg:col-span-7">
        4<span className="text-accent">0</span>4
      </p>
      <div className="lg:col-span-5">
        <h1 className="hero-in text-4xl md:text-5xl">{t.notFound.title}</h1>
        <p className="hero-in mt-4 max-w-[50ch] text-lg text-muted-foreground">{t.notFound.text}</p>
        <Button asChild size="lg" className="hero-in mt-8">
          <Link to="/">
            <ArrowLeft />
            {t.notFound.back}
          </Link>
        </Button>
      </div>
    </div>
  )
}
