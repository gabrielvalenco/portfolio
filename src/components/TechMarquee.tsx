import type { LucideIcon } from 'lucide-react'
import { Code, Cpu, Database, Smartphone, Server, Cog, Cloud, Coffee } from 'lucide-react'

type TechItem = {
  name: string
  color: string
  Icon?: LucideIcon
  svg?: React.ReactNode
}

function ReactSvg() {
  return <img src="/src/assets/react.svg" alt="" aria-hidden className="size-4" />
}

function VueSvg() {
  return (
    <svg viewBox="0 0 256 221" xmlns="http://www.w3.org/2000/svg" className="size-4" aria-hidden>
      <path fill="#41B883" d="M204.8 0H256L128 221L0 0h51.2L128 110.592L204.8 0z" />
      <path fill="#35495E" d="M0 0l128 221L256 0h-51.2L128 110.592L51.2 0H0z" />
    </svg>
  )
}

const row1: TechItem[] = [
  { name: 'React', color: '#61DAFB', svg: <ReactSvg /> },
  { name: 'Vue', color: '#42B883', svg: <VueSvg /> },
  { name: 'TypeScript', color: '#3178C6', Icon: Code },
  { name: 'Node.js', color: '#68A063', Icon: Server },
  { name: 'Laravel', color: '#FF2D20', Icon: Database },
  { name: 'Python', color: '#3776AB', Icon: Cpu },
  { name: 'Docker', color: '#2496ED', Icon: Server },
  { name: 'PostgreSQL', color: '#336791', Icon: Database },
]

const row2: TechItem[] = [
  { name: 'Java', color: '#ED8B00', Icon: Coffee },
  { name: 'Golang', color: '#00ADD8', Icon: Cog },
  { name: 'JavaScript', color: '#F7DF1E', Icon: Code },
  { name: 'MySQL', color: '#4479A1', Icon: Database },
  { name: 'Redis', color: '#D82C20', Icon: Database },
  { name: 'PHP', color: '#777BB4', Icon: Code },
  { name: 'Cloudflare', color: '#F38020', Icon: Cloud },
  { name: 'React Native', color: '#61DAFB', Icon: Smartphone },
]

function Pill({ name, color, Icon, svg }: TechItem) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-border/60 bg-card/80 px-4 py-2.5 text-sm font-medium shrink-0 backdrop-blur-sm select-none">
      <span className="flex h-5 w-5 items-center justify-center shrink-0">
        {svg ?? (Icon ? <Icon className="h-4 w-4" style={{ color }} /> : null)}
      </span>
      <span>{name}</span>
    </div>
  )
}

interface RowProps {
  items: TechItem[]
  direction: 'left' | 'right'
  duration?: number
}

function Row({ items, direction, duration = 32 }: RowProps) {
  const doubled = [...items, ...items]
  return (
    <div
      className="flex gap-3 py-1.5"
      style={{
        width: 'max-content',
        animation: `marquee-${direction} ${duration}s linear infinite`,
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')}
    >
      {doubled.map((item, i) => (
        <Pill key={`${direction}-${i}`} {...item} />
      ))}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
      }}
    >
      <Row items={row1} direction="left" duration={32} />
      <Row items={row2} direction="right" duration={38} />
    </div>
  )
}
