import SubPageHeader from '@/components/SubPageHeader'
import ProjectWindow from '@/components/ProjectWindow'
import { TermAnchor } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { projects, featuredProjects, otherProjects } from '@/data/projects'
import { Github } from 'lucide-react'

export default function ProjectsPage() {
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="03"
        title="Projetos"
        subtitle={`Todos os ${projects.length} projetos que já construí — em destaque e arquivo.`}
      />

      <main className="container mx-auto px-6 py-16">
        {/* Featured row first */}
        <div className="mb-12">
          <p
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500"
            data-animate-item
          >
            Em destaque
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredProjects.map(p => (
              <ProjectWindow key={p.title} p={p} featured />
            ))}
          </div>
        </div>

        {/* The rest */}
        <div>
          <p
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500"
            data-animate-item
          >
            Outros projetos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map(p => (
              <ProjectWindow key={p.title} p={p} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center" data-animate-item>
          <TermAnchor
            href="https://github.com/gabrielvalenco"
            target="_blank"
            icon={Github}
          >
            Ver no GitHub
          </TermAnchor>
        </div>
      </main>
    </div>
  )
}
