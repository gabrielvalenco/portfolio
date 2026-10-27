import SubPageHeader from '@/components/SubPageHeader'
import ProjectWindow from '@/components/ProjectWindow'
import { TermLink, TermAnchor } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { moreProjects } from '@/data/projects'
import { ArrowLeft, Github } from 'lucide-react'
import { useLang } from '@/i18n/context'

export default function MoreProjects() {
  const { t } = useLang()
  useHomeAnimations()
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="03"
        title={t.moreProjects.title}
        subtitle={t.moreProjects.subtitle}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {moreProjects.map(p => (
            <ProjectWindow key={p.title} p={p} featured />
          ))}
        </div>

        <div className="mt-14 flex justify-center" data-animate-item>
          <TermAnchor
            href="https://github.com/gabrielvalenco"
            target="_blank"
            icon={Github}
          >
            {t.common.viewGithub}
          </TermAnchor>
        </div>

        <div className="mt-4 flex justify-center" data-animate-item>
          <TermLink to="/" icon={ArrowLeft}>{t.moreProjects.backHome}</TermLink>
        </div>
      </main>
    </div>
  )
}
