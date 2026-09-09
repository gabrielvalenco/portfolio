import SubPageHeader from '@/components/SubPageHeader'
import ProjectWindow from '@/components/ProjectWindow'
import { TermLink } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { moreProjects } from '@/data/projects'
import { ArrowLeft } from 'lucide-react'

export default function MoreProjects() {
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="03"
        title="Mais projetos"
        subtitle="Outros projetos desenvolvidos com foco em landing pages, presença digital e conversão."
      />

      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreProjects.map(p => (
            <ProjectWindow key={p.title} p={p} featured />
          ))}
        </div>

        <div className="mt-14 flex justify-center" data-animate-item>
          <TermLink to="/" icon={ArrowLeft}>Voltar para o início</TermLink>
        </div>
      </main>
    </div>
  )
}
