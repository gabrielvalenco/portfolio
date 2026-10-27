import { useLang } from '@/i18n/context'
import type { Lang } from '@/i18n/translations'

const OPTIONS: Lang[] = ['pt', 'en']

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t.common.langLabel}
      className="fixed right-4 top-4 z-[60] flex items-center border border-[#9eff00]/40 bg-black/70 font-mono text-[11px] uppercase tracking-[0.22em] backdrop-blur-sm"
    >
      {OPTIONS.map(code => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
          className={`px-2.5 py-1.5 transition-colors ${
            lang === code ? 'bg-[#9eff00]/15 text-[#9eff00]' : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
