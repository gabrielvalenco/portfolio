type Group = { id: string; title: string; hint: string; items: string[]; main: string[] }

export const techGroups: Group[] = [
  {
    id: 'frontend',
    title: 'Front-end',
    hint: 'interfaces e mobile',
    main: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    items: [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Vue', 'Tailwind CSS', 'shadcn/ui',
      'TanStack Query', 'GSAP', 'Motion', 'Three.js', 'Vite', 'React Native', 'Expo',
    ],
  },
  {
    id: 'backend',
    title: 'Back-end',
    hint: 'APIs e regras de negócio',
    main: ['Node.js', 'Laravel', 'PHP', 'Python'],
    items: [
      'Node.js', 'Laravel', 'PHP', 'Python', 'Java', 'Go', 'REST APIs',
      'Auth.js', 'Drizzle ORM', 'Stripe', 'Webhooks', 'Filas e Horizon',
    ],
  },
  {
    id: 'data',
    title: 'Banco de dados',
    hint: 'persistência e cache',
    main: ['PostgreSQL', 'MySQL', 'Redis'],
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Upstash'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    hint: 'infra, deploy e automação',
    main: ['Docker', 'AWS', 'Vercel', 'Cloudflare'],
    items: ['Docker', 'AWS', 'Vercel', 'Cloudflare', 'Git e GitHub', 'n8n', 'EAS Build'],
  },
]

export const techCount = new Set(techGroups.flatMap(g => g.items)).size

export default function TechStack() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {techGroups.map((g, i) => (
        <div
          key={g.id}
          data-animate-item
          className="terminal-panel corner-brackets relative flex flex-col p-5 font-mono md:p-6"
        >
          <span className="cb-tl" />
          <span className="cb-tr" />
          <span className="cb-bl" />
          <span className="cb-br" />

          <div className="flex items-center justify-between border-b border-[#9eff00]/15 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-100">{g.title}</h3>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500">
              0{i + 1} / 0{techGroups.length}
            </span>
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500">{g.hint}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {g.items.map(t => {
              const main = g.main.includes(t)
              return (
                <span
                  key={t}
                  className={`border px-2.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors hover:border-[#9eff00] hover:text-[#9eff00] ${
                    main
                      ? 'border-[#9eff00]/50 bg-[#9eff00]/[0.07] text-zinc-100'
                      : 'border-[#9eff00]/15 text-zinc-400'
                  }`}
                >
                  {t}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
