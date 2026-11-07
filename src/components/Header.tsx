import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { useLang } from '@/i18n/context'
import { cn } from '@/lib/utils'

const links = [
  { hash: 'projects', key: 'projects' },
  { hash: 'about', key: 'about' },
  { hash: 'experience', key: 'experience' },
  { hash: 'contact', key: 'contact' },
] as const

const navLink =
  'rounded-md px-2 py-1 text-sm text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground'

export default function Header() {
  const { lang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled ? 'border-border bg-background/80 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link to="/" className="text-sm font-semibold text-foreground no-underline">
          Gabriel Valenço
        </Link>

        <nav aria-label={t.nav.main} className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <Link key={l.hash} to={{ pathname: '/', hash: l.hash }} className={navLink}>
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm">
            <a href={`/valenco-resume-${lang}.pdf`} target="_blank" rel="noreferrer">
              <FileText />
              {t.nav.resume}
            </a>
          </Button>
        </div>
      </div>

      <nav
        aria-label={t.nav.main}
        className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-5 pb-2 md:hidden"
      >
        {links.map(l => (
          <Link key={l.hash} to={{ pathname: '/', hash: l.hash }} className={navLink}>
            {t.nav[l.key]}
          </Link>
        ))}
      </nav>
    </header>
  )
}
