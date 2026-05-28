import SubPageHeader from '@/components/SubPageHeader'
import { TermAnchor, TermLink } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { Briefcase, Mail } from 'lucide-react'

const LIME = '#9eff00'

const focus = [
  { tag: 'SaaS',         desc: 'Produtos web completos: autenticação, pagamentos, painéis e área administrativa.' },
  { tag: 'Automação',    desc: 'Fluxos automatizados, integrações entre sistemas e otimização de processos repetitivos.' },
  { tag: 'Front-end',    desc: 'Interfaces modernas em React e Vue, com animações sob medida e foco em usabilidade.' },
  { tag: 'Back-end',     desc: 'APIs escaláveis em Laravel e Node, com banco de dados e cache para alta performance.' },
]

const principles = [
  'Entregar valor em iterações curtas, não ferramentas em iterações longas.',
  'Código que se lê em voz alta, clareza acima de esperteza.',
  'Medir antes de otimizar; respeitar limites da máquina e do humano.',
  'Design e experiência do usuário são problemas de engenharia, não decoração.',
]

const facts = [
  { k: 'Localização',  v: 'Brasil (trabalho remoto)' },
  { k: 'Idiomas',      v: 'Português · Inglês avançado' },
  { k: 'Disponível',   v: 'Freelancer / contrato' },
  { k: 'Hobbies',      v: 'Leitura · escrita · cinema · academia' },
]

export default function AboutPage() {
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="02"
        title="Sobre mim"
        subtitle="Quem eu sou, o que entrego e como cheguei até aqui."
      />

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {/* Left column: long-form bio */}
          <article className="space-y-10 font-mono text-sm leading-relaxed text-zinc-300">
            <section data-animate-item>
              <p
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500"
              >
                Apresentação
              </p>
              <p>
                Me chamo <span className="text-zinc-100">Gabriel Valenço</span>, sou
                desenvolvedor full-stack focado em criar produtos digitais que
                entregam valor real, não só telas bonitas.
              </p>
              <p className="mt-3">
                Meu trabalho passa por SaaS, automações, landing pages de alto
                desempenho e ferramentas internas. Gosto de problemas onde
                front-end e back-end conversam: painéis, integrações e
                pipelines de dados.
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                Trajetória
              </p>
              <p>
                Comecei a programar por curiosidade, querendo entender como as
                coisas funcionavam por dentro. Antes do desenvolvimento, passei
                por <span className="text-zinc-100">tráfego pago</span>, onde
                aprendi a medir tudo. Esse hábito virou o filtro que uso para
                escrever software hoje: se não dá para observar, não dá para
                melhorar.
              </p>
              <p className="mt-3">
                Migrei para desenvolvimento full-stack em equipes pequenas, onde
                pude tocar do banco de dados ao deploy. Hoje lidero entregas
                técnicas na <span className="text-zinc-100">Degiual</span>.
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                Áreas de foco
              </p>
              <ul className="space-y-3">
                {focus.map(f => (
                  <li key={f.tag} className="border-l-2 border-[#9eff00]/40 pl-4" data-animate-item>
                    <span style={{ color: LIME }} className="block text-xs uppercase tracking-[0.22em]">
                      {f.tag}
                    </span>
                    <span className="text-zinc-300">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                Como penso
              </p>
              <ul className="space-y-2 text-zinc-300">
                {principles.map(p => (
                  <li key={p} className="flex gap-3" data-animate-item>
                    <span
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                      style={{ background: LIME, boxShadow: `0 0 6px ${LIME}` }}
                    />
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
                Resumo rápido
              </p>
              <dl className="space-y-2.5 text-xs">
                {facts.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-dashed border-[#9eff00]/10 pb-2 last:border-0 last:pb-0">
                    <dt style={{ color: LIME }} className="opacity-80 uppercase tracking-wider">{k}</dt>
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
                No momento
              </p>
              <p className="text-xs text-zinc-300">
                Liderando projetos full-stack na Degiual e aceitando freelas
                selecionados em SaaS e automações.
              </p>
              <p className="mt-3 text-xs text-zinc-300">
                Estudando arquitetura de sistemas distribuídos e métricas de
                experiência do usuário.
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-animate-item>
              <TermLink to="/experience" icon={Briefcase}>Minha trajetória</TermLink>
              <TermAnchor href="mailto:gabrielvalencoofc@gmail.com" icon={Mail}>Fale comigo</TermAnchor>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
