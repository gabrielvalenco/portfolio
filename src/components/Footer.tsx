import { ArrowUp } from 'lucide-react'
import { useLang } from '@/i18n/context'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Logo'
import { links } from '@/data/links'

export default function Footer() {
  const { t } = useLang()
  const link = 'text-muted-foreground no-underline underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline'
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="size-7 shrink-0" />
          <p>
            © {new Date().getFullYear()} Gabriel Valenço. {t.footer.rights}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
