import { Github } from 'lucide-react'
import SubPageHeader from '@/components/SubPageHeader'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { projects, featuredProjects, otherProjects } from '@/data/projects'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'

const grid = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'

export default function ProjectsPage() {
  const { t } = useLang()
  return (
    <>
      <SubPageHeader title={t.projectsPage.title} subtitle={t.projectsPage.subtitle(projects.length)} />

      <div className="mx-auto max-w-6xl space-y-16 px-6 pb-24 md:pb-32">
        <section>
          <Reveal as="header" className="mb-6">
            <h2>{t.projectsPage.featured}</h2>
          </Reveal>
          <div className={grid}>
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} />
            ))}
          </div>
        </section>

        <section>
          <Reveal as="header" className="mb-6">
            <h2>{t.projectsPage.others}</h2>
          </Reveal>
          <div className={grid}>
            {otherProjects.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i % 3} />
            ))}
          </div>
        </section>

        <Reveal>
          <Button asChild variant="outline" size="lg">
            <a href={links.github} target="_blank" rel="noreferrer">
              <Github />
              {t.common.viewGithub}
            </a>
          </Button>
        </Reveal>
      </div>
    </>
  )
}
