import { useLang } from '@/i18n/context'
import type { Lang } from '@/i18n/translations'

const OPTIONS: Lang[] = ['pt', 'en', 'es']

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t.common.langLabel}
      className="flex items-center rounded-full border border-border p-0.5 text-xs font-semibold uppercase"
    >
      {OPTIONS.map(code => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
          className={`rounded-full px-2 py-1.5 transition-colors duration-150 ${
            lang === code ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
