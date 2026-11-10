import { ArrowUp } from 'lucide-react'
import { useLang } from '@/i18n/context'
import { Button } from '@/components/ui/button'
import { links } from '@/data/links'

export default function Footer() {
  const { t } = useLang()
  const link = 'text-muted-foreground no-underline underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline'
  return (
    <footer className="overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 pb-8 pt-14 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p>
          © {new Date().getFullYear()} Gabriel Valenço. {t.footer.rights}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a href={links.github} target="_blank" rel="noreferrer" className={link}>GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className={link}>LinkedIn</a>
          <a href={links.email} className={link}>{t.contact.email}</a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
            }}
          >
            <ArrowUp />
            {t.footer.top}
          </Button>
        </div>
      </div>
      {/* Assinatura decorativa: o nome ja aparece no texto acima. */}
      <p aria-hidden className="wordmark select-none px-3 pb-[0.16em] text-center">
        Gabriel Valenço
      </p>
    </footer>
  )
}
