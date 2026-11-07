import { useLang } from '@/i18n/context'
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
        <div className="flex gap-5">
          <a href={links.github} target="_blank" rel="noreferrer" className={link}>GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className={link}>LinkedIn</a>
          <a href={links.email} className={link}>{t.contact.email}</a>
        </div>
      </div>
    </footer>
  )
}
