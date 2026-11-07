import { Link } from 'react-router-dom'
import { ArrowLeft, Github } from 'lucide-react'
import SubPageHeader from '@/components/SubPageHeader'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { moreProjects } from '@/data/projects'
import { links } from '@/data/links'
import { useLang } from '@/i18n/context'

export default function MoreProjects() {
  const { t } = useLang()
  return (
    <>
      <SubPageHeader title={t.moreProjects.title} subtitle={t.moreProjects.subtitle} />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i % 3} />
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="lg">
            <a href={links.github} target="_blank" rel="noreferrer">
              <Github />
              {t.common.viewGithub}
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/">
              <ArrowLeft />
              {t.moreProjects.backHome}
            </Link>
          </Button>
        </Reveal>
      </div>
    </>
  )
}
