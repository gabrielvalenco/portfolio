import { Check } from 'lucide-react'
import SubPageHeader from '@/components/SubPageHeader'
import Reveal from '@/components/Reveal'
import CourseList from '@/components/CourseList'
import { useLang } from '@/i18n/context'

// Nomes dos cursos ficam no original; descricao e topicos vem de `translations.certificates.items`, na mesma ordem.
const courseTitles = [
  'Banco de Dados SQL do Zero ao Avançado + Projetos Reais',
  'Node.js do Zero a Maestria com diversos Projetos',
  'Aprenda Golang do Zero! Desenvolva uma APLICAÇÃO COMPLETA!',
  'Java COMPLETO Programação Orientada a Objetos + Projetos',
  'Auditor Interno do SGI (ISO 9001 + ISO 14001 + ISO 45001)',
  'SAP Debug - Aprenda partindo do zero 2026',
  'SAP ABAP OO - Orientação a Objetos',
  'SAP ABAP - Aprenda partindo do zero 2026',
]

export default function Certificates() {
  const { t } = useLang()
  const c = t.certificates
  return (
    <>
      <SubPageHeader title={c.title} subtitle={c.subtitle} />

      {/* Todos os cursos, com os certificados em PDF; abaixo, o detalhe do que foi estudado. */}
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <CourseList />
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-2 md:pb-32">
        {c.items.map((cert, i) => (
          <Reveal
            as="article"
            key={courseTitles[i]}
            index={i % 2}
            className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong"
          >
            <h2 className="text-base font-semibold leading-snug md:text-base">{courseTitles[i]}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{cert.description}</p>
            <p className="mb-3 mt-5 text-xs font-medium text-foreground">{c.learned}</p>
            <ul className="space-y-2">
              {cert.topics.map(topic => (
                <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </>
  )
}
