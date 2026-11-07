import { ArrowUp } from 'lucide-react'
import { useLang } from '@/i18n/context'
import { Button } from '@/components/ui/button'
import { links } from '@/data/links'

export default function Footer() {
  const { t } = useLang()
  const link = 'text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground'
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
    </footer>
  )
}
