import SubPageHeader from '@/components/SubPageHeader'
import { TermLink, TermAnchor } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { User, Linkedin } from 'lucide-react'

const LIME = '#9eff00'

type Role = {
  company: string
  role: string
  period: string
  current?: boolean
  bullets: string[]
  stack: string[]
}

const roles: Role[] = [
  {
    company: 'Degiual',
    role: 'full stack developer & tech lead',
    period: '2024 — atual',
    current: true,
    bullets: [
      'lidero o desenvolvimento técnico de produtos digitais para clientes de diferentes segmentos.',
      'arquiteto soluções full-stack — frontend, api, banco e automações — alinhadas com objetivos de negócio.',
      'estabeleço padrões de qualidade, code review e processos de entrega contínua.',
      'mentoria técnica para devs juniores e ponte com áreas de design e tráfego pago.',
    ],
    stack: ['React', 'Vue', 'Laravel', 'Node.js', 'MySQL', 'n8n', 'GSAP'],
  },
  {
    company: 'Grupo Prodemi',
    role: 'full stack developer',
    period: '2023 — 2024',
    bullets: [
      'desenvolvimento de sistemas internos e integrações entre plataformas do grupo.',
      'manutenção e evolução de aplicações em produção, foco em estabilidade e performance.',
      'colaboração direta com áreas operacionais para entender requisitos e propor melhorias.',
    ],
    stack: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap'],
  },
  {
    company: 'Jem',
    role: 'tráfego pago',
    period: '2022 — 2023',
    bullets: [
      'planejamento e gestão de campanhas em Meta Ads e Google Ads para clientes B2C.',
      'análise de funil, otimização de criativos e relatórios orientados a métricas-chave.',
      'a leitura crítica de dados desse período virou base pra como eu meço produto até hoje.',
    ],
    stack: ['Meta Ads', 'Google Ads', 'GA4', 'Looker Studio'],
  },
]

export default function ExperiencePage() {
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="02b"
        name="career.log"
        title="Trajetória"
        subtitle="tail -f ~/career.log"
      />

      <main className="container mx-auto px-6 py-16">
        {/* Timeline */}
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(to bottom, ${LIME}99, ${LIME}22 80%, transparent)` }}
          />

          <ul className="space-y-12">
            {roles.map((r, i) => (
              <li key={r.company} className="relative pl-12" data-animate-item>
                {/* Node */}
                <span
                  className="absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center border bg-black font-mono text-[10px]"
                  style={{ borderColor: `${LIME}66`, color: LIME }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="terminal-panel corner-brackets relative p-6 font-mono">
                  <span className="cb-tl" />
                  <span className="cb-tr" />
                  <span className="cb-bl" />
                  <span className="cb-br" />
                  <div className="scan-sweep" />

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-100">
                      {r.company}
                    </h2>
                    {r.current && (
                      <span
                        className="text-[10px] uppercase tracking-widest border px-1.5 py-0.5"
                        style={{ color: LIME, borderColor: `${LIME}66` }}
                      >
                        atual
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                      {r.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    <span style={{ color: LIME }}>$</span> {r.role}
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                    {r.bullets.map(b => (
                      <li key={b} className="flex gap-2" data-animate-item>
                        <span style={{ color: LIME }} className="opacity-70">{'>'}</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {r.stack.map(s => (
                      <span
                        key={s}
                        className="border border-[#9eff00]/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3" data-animate-item>
          <TermLink to="/about" icon={User}>./about_me</TermLink>
          <TermAnchor
            href="https://www.linkedin.com/in/gabriel-valenço-480b43276"
            target="_blank"
            icon={Linkedin}
          >
            ./linkedin
          </TermAnchor>
        </div>
      </main>
    </div>
  )
}
