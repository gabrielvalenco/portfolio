import { useLang } from '@/i18n/context'
import Reveal from '@/components/Reveal'
import { stackGroups as groups } from '@/data/stack'

export default function TechStack() {
  const { t } = useLang()
  return (
    <div className="divide-y divide-border border-y border-border">
      {groups.map((g, i) => (
        <Reveal key={g.id} index={i} className="grid gap-4 py-5 sm:grid-cols-[10rem_1fr] sm:items-center sm:gap-8">
          <h3 className="text-lg font-semibold">{t.tech.groups[g.id]}</h3>
          <ul className="flex flex-wrap gap-2">
            {g.items.map(item => (
              <li key={item} className="rounded-md border border-border-strong px-3 py-1.5 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
