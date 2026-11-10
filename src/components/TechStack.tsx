import { useLang } from '@/i18n/context'
import Reveal from '@/components/Reveal'
import { stackGroups as groups } from '@/data/stack'

const tones = ['bg-lime', 'bg-violet', 'bg-pink'] as const

export default function TechStack() {
  const { t } = useLang()
  return (
    <div className="divide-y divide-border border-y border-border">
      {groups.map((g, i) => (
        <Reveal key={g.id} index={i} className="grid gap-4 py-6 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-8">
          <h3 className="flex items-center gap-3 font-display text-2xl font-bold">
            <span aria-hidden className={`size-2.5 rounded-full ${tones[i % tones.length]}`} />
            {t.tech.groups[g.id]}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map(item => (
              <li
                key={item}
                className="rounded-full border-[1.5px] border-border-strong px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
