import Section from '@/components/Section'
import { CheckCircle2, Award, GraduationCap } from 'lucide-react'
import { useLang } from '@/i18n/context'

// Nomes dos cursos ficam no original; descricao e topicos vem de `translations.certificates.items`, na mesma ordem.
const courseTitles = [
  'Banco de Dados SQL do Zero ao Avançado + Projetos Reais',
  'Node.js do Zero a Maestria com diversos Projetos',
  'Aprenda Golang do Zero! Desenvolva uma APLICAÇÃO COMPLETA!',
  'Java COMPLETO Programação Orientada a Objetos + Projetos',
]

const gradients = [
  'from-blue-600/30 to-cyan-500/20',
  'from-emerald-600/30 to-teal-500/20',
  'from-sky-600/30 to-blue-500/20',
  'from-amber-500/30 to-orange-400/20',
]

export default function Certificates() {
  const { t } = useLang()
  const c = t.certificates
  return (
    <div className="pt-20 min-h-screen">
      <Section id="certificates">
        {/* Header */}
        <div className="mb-12 text-center relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.15), transparent 60%)',
            }}
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary mb-4">
            <GraduationCap className="h-3.5 w-3.5" />
            {c.badge}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            {c.subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {c.items.map((cert, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${gradients[i % gradients.length]}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{courseTitles[i]}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    {c.learned}
                  </p>
                  <ul className="space-y-2">
                    {cert.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
