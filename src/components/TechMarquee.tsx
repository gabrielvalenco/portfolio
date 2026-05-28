type TechItem = { name: string; tag: string }

const row1: TechItem[] = [
  { name: 'React',       tag: 'lib' },
  { name: 'Vue',         tag: 'lib' },
  { name: 'TypeScript',  tag: 'lang' },
  { name: 'Node.js',     tag: 'runtime' },
  { name: 'Laravel',     tag: 'framework' },
  { name: 'Python',      tag: 'lang' },
  { name: 'Docker',      tag: 'ops' },
  { name: 'PostgreSQL',  tag: 'db' },
]

const row2: TechItem[] = [
  { name: 'Java',         tag: 'lang' },
  { name: 'Golang',       tag: 'lang' },
  { name: 'JavaScript',   tag: 'lang' },
  { name: 'MySQL',        tag: 'db' },
  { name: 'Redis',        tag: 'db' },
  { name: 'PHP',          tag: 'lang' },
  { name: 'Cloudflare',   tag: 'ops' },
  { name: 'React Native', tag: 'mobile' },
]

function Chip({ name }: TechItem) {
  return (
    <div className="group relative shrink-0 select-none border border-[#9eff00]/25 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-[#9eff00] hover:text-[#9eff00] hover:bg-[#9eff00]/[0.06]">
      <span
        className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
        style={{ background: '#9eff00', boxShadow: '0 0 6px #9eff00' }}
      />
      <span className="align-middle">{name}</span>
    </div>
  )
}

function Row({
  items, direction, duration = 36,
}: { items: TechItem[]; direction: 'left' | 'right'; duration?: number }) {
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
      {doubled.map((item, i) => <Chip key={`${direction}-${i}`} {...item} />)}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <Row items={row1} direction="left" duration={36} />
      <Row items={row2} direction="right" duration={42} />
    </div>
  )
}
