import type { CSSProperties } from 'react'
import { useLang } from '@/i18n/context'

// Cartoes no estilo de paleta de cores: nome grande, legenda pequena.
const chips = [
  { name: 'React', group: 'frontend', tone: 'bg-[#111217] text-white', pos: 'right-[-1.5rem] top-[8%] lg:right-[-3rem]', rot: -5 },
  { name: 'Laravel', group: 'backend', tone: 'bg-[#dfe5eb] text-[#111217]', pos: 'left-[-1.5rem] top-[38%] lg:left-[-3.5rem]', rot: 4 },
  { name: 'Expo', group: 'mobile', tone: 'bg-accent text-accent-foreground', pos: 'right-[-1rem] top-[58%] lg:right-[-2.5rem]', rot: 5 },
  { name: 'PostgreSQL', group: 'data', tone: 'bg-[#2563eb] text-white', pos: 'left-[-0.5rem] bottom-[-1.5rem] lg:left-[-2rem]', rot: -4 },
] as const

export default function HeroChips() {
  const { t } = useLang()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {chips.map((c, i) => (
        <div
          key={c.name}
          className={`chip absolute ${c.pos}`}
          style={{ '--rot': `${c.rot}deg`, '--d': `${700 + i * 160}ms` } as CSSProperties}
        >
          <div
            className={`chip-float w-28 rounded-xl p-3 shadow-xl shadow-black/15 ${c.tone}`}
            style={{ animationDuration: `${5 + i}s`, animationDelay: `${i * -1.3}s` }}
          >
            <p className="text-sm font-semibold leading-tight">{c.name}</p>
            <div className="my-1.5 h-px w-6 bg-current opacity-40" />
            <p className="font-mono text-[10px] opacity-70">{t.tech.groups[c.group]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
