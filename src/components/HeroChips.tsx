import type { CSSProperties } from 'react'

// Adesivos colados em volta do retrato.
const chips = [
  { name: 'React', tone: 'bg-lime text-ink', pos: '-left-10 top-[10%]', rot: -8 },
  { name: 'Laravel', tone: 'bg-paper text-ink', pos: '-right-6 top-[36%]', rot: 6 },
  { name: 'React Native', tone: 'bg-pink text-ink', pos: '-left-16 top-[62%]', rot: 5 },
  { name: 'PostgreSQL', tone: 'bg-violet text-paper', pos: '-right-4 -bottom-4', rot: -5 },
] as const

export default function HeroChips() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {chips.map((c, i) => (
        <div
          key={c.name}
          className={`chip absolute ${c.pos}`}
          style={{ '--rot': `${c.rot}deg`, '--d': `${700 + i * 160}ms` } as CSSProperties}
        >
          <div
            className={`chip-float rounded-full border-2 border-ink px-3.5 py-1.5 font-display text-sm font-bold shadow-[3px_3px_0_0_var(--ink)] ${c.tone}`}
            style={{ animationDuration: `${5 + i}s`, animationDelay: `${i * -1.3}s` }}
          >
            {c.name}
          </div>
        </div>
      ))}
    </div>
  )
}
