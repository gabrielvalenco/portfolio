import SubPageHeader from '@/components/SubPageHeader'
import { TermAnchor, TermLink } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { Briefcase, Mail } from 'lucide-react'

const LIME = '#9eff00'

const focus = [
  { tag: 'saas',         desc: 'produtos web ponta-a-ponta — autenticação, billing, dashboards e painéis administrativos.' },
  { tag: 'automação',    desc: 'fluxos com n8n, integrações API-a-API e otimização de processos repetitivos.' },
  { tag: 'frontend',     desc: 'interfaces modernas em react/vue com animações sob medida (gsap, lenis).' },
  { tag: 'backend',      desc: 'apis escaláveis em laravel/node, persistência em mysql/postgres + redis.' },
]

const principles = [
  'entregar valor em iterações curtas, não ferramentas em iterações longas.',
  'código que se lê em voz alta — clareza > esperteza.',
  'medir antes de otimizar; respeitar limites da máquina e do humano.',
  'design e ux são problemas de engenharia, não decoração.',
]

const facts = [
  { k: 'localização',  v: 'brasil (remoto-friendly)' },
  { k: 'idiomas',      v: 'pt-br · en (avançado)' },
  { k: 'disponível',   v: 'freelancer / contrato' },
  { k: 'hobbies',      v: 'leitura · escrita · cinema · gym' },
]

export default function AboutPage() {
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="02"
        name="about_me.md"
        title="Sobre mim"
        subtitle="cat ~/about_me.md"
      />

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {/* Left column: long-form bio */}
          <article className="space-y-8 font-mono text-sm leading-relaxed text-zinc-300">
            <section data-animate-item>
              <p
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500"
              >
                // intro
              </p>
              <p>
                <span style={{ color: LIME }}>{'>'}</span>{' '}
                me chamo <span className="text-zinc-100">Gabriel Valenço</span>, desenvolvedor
                full-stack focado em criar produtos digitais que entregam valor real —
                não só telas bonitas.
              </p>
              <p className="mt-3">
                <span style={{ color: LIME }}>{'>'}</span>{' '}
                meu trabalho passa por SaaS, automações, landing pages de alto desempenho e
                ferramentas internas. gosto de problemas onde o front-end e o back-end
                conversam: dashboards, integrações, pipelines de dados.
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                // background
              </p>
              <p>
                <span style={{ color: LIME }}>{'>'}</span>{' '}
                comecei programando por curiosidade de quebrar coisas e ver como
                funcionavam. fui parar em <span className="text-zinc-100">tráfego pago</span>,
                aprendi a medir tudo, e isso virou o filtro que uso pra escrever software hoje
                — se não dá pra observar, não dá pra melhorar.
              </p>
              <p className="mt-3">
                <span style={{ color: LIME }}>{'>'}</span>{' '}
                migrei pra desenvolvimento full-stack atuando em equipes pequenas onde dava
                pra tocar do banco ao deploy. hoje lidero entregas técnicas na{' '}
                <span className="text-zinc-100">Degiual</span>.
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                // focus_areas
              </p>
              <ul className="space-y-3">
                {focus.map(f => (
                  <li key={f.tag} className="border-l-2 border-[#9eff00]/40 pl-4" data-animate-item>
                    <span style={{ color: LIME }} className="block text-xs uppercase tracking-[0.22em]">
                      [{f.tag}]
                    </span>
                    <span className="text-zinc-300">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                // principles
              </p>
              <ul className="space-y-1.5 text-zinc-300">
                {principles.map(p => (
                  <li key={p} className="flex gap-2" data-animate-item>
                    <span style={{ color: LIME }} className="opacity-70">{'>'}</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Right column: facts + CTAs */}
          <aside className="space-y-8">
            <div
              data-animate-item
              className="terminal-panel corner-brackets relative p-6 font-mono"
            >
              <span className="cb-tl" />
              <span className="cb-tr" />
              <span className="cb-bl" />
              <span className="cb-br" />
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                // ./quick_facts
              </p>
              <dl className="space-y-2.5 text-xs">
                {facts.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-dashed border-[#9eff00]/10 pb-2 last:border-0 last:pb-0">
                    <dt style={{ color: LIME }} className="opacity-80">{k}</dt>
                    <dd className="text-zinc-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              data-animate-item
              className="terminal-panel corner-brackets relative p-6 font-mono"
            >
              <span className="cb-tl" />
              <span className="cb-tr" />
              <span className="cb-bl" />
              <span className="cb-br" />
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                // ./now_playing
              </p>
              <p className="text-xs text-zinc-300">
                <span style={{ color: LIME }}>{'>'}</span> liderando projetos full-stack na
                Degiual; aceitando freelas selecionados em SaaS e automações.
              </p>
              <p className="mt-3 text-xs text-zinc-300">
                <span style={{ color: LIME }}>{'>'}</span> estudando arquitetura de sistemas
                distribuídos e ux quantitativo.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-animate-item>
              <TermLink to="/experience" icon={Briefcase}>./career --log</TermLink>
              <TermAnchor href="mailto:gabrielvalencoofc@gmail.com" icon={Mail}>./reach_out</TermAnchor>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
