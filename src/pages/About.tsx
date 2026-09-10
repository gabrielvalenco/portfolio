import SubPageHeader from '@/components/SubPageHeader'
import useHomeAnimations from '@/hooks/useHomeAnimations'

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
        <article className="max-w-4xl space-y-10 font-mono text-sm leading-relaxed text-zinc-300">
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
                pude tocar do banco de dados ao deploy. Hoje atuo como Dev Sênior
                na <span className="text-zinc-100">OneMoving</span>, responsável
                pelo desenvolvimento do sistema e dos aplicativos ligados à
                plataforma.
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
      </main>
    </div>
  )
}
