import { useLang } from '@/i18n/context'
import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'

const groups: { id: string; items: string[] }[] = [
  { id: 'frontend', items: ['React', 'Next.js', 'TypeScript', 'Vue', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query'] },
  { id: 'backend', items: ['Node.js', 'Laravel', 'PHP', 'Python', 'Java', 'Go', 'REST APIs', 'Stripe'] },
  { id: 'mobile', items: ['React Native', 'Expo'] },
  { id: 'data', items: ['PostgreSQL', 'MySQL', 'Redis'] },
  { id: 'infra', items: ['Docker', 'AWS', 'Vercel', 'Cloudflare', 'Git e GitHub', 'n8n'] },
]

export default function TechStack() {
  const { t } = useLang()
  return (
    <div className="divide-y divide-border border-y border-border">
      {groups.map((g, i) => (
        <Reveal key={g.id} index={i} className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <h3 className="text-sm font-medium">{t.tech.groups[g.id]}</h3>
          <div className="flex flex-wrap gap-2">
            {g.items.map(item => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  )
}
