import type { CSSProperties } from 'react'
import { Building2, Code2, Cpu, Database, Smartphone, Terminal, type LucideIcon } from 'lucide-react'

// Poucos elementos, nas laterais, em vermelho de baixa opacidade: dev, mobile, IA, empresa, dados, terminal.
const tiles: { Icon: LucideIcon; top: string; side: 'left' | 'right'; offset: string; rot: number; dur: number; delay: number }[] = [
  { Icon: Code2, top: '9%', side: 'left', offset: '2.5%', rot: -8, dur: 7, delay: 0 },
  { Icon: Smartphone, top: '24%', side: 'right', offset: '2.5%', rot: 7, dur: 8, delay: -2 },
  { Icon: Cpu, top: '41%', side: 'left', offset: '3%', rot: 6, dur: 9, delay: -4 },
  { Icon: Building2, top: '55%', side: 'right', offset: '3%', rot: -6, dur: 7.5, delay: -1 },
  { Icon: Database, top: '70%', side: 'left', offset: '2.5%', rot: -5, dur: 8.5, delay: -3 },
  { Icon: Terminal, top: '84%', side: 'right', offset: '2.5%', rot: 8, dur: 9, delay: -5 },
]

const rings = [
  { top: '17%', side: 'left', offset: '7%', size: 'size-24' },
  { top: '62%', side: 'right', offset: '8%', size: 'size-32' },
] as const

const crosses = [
  { top: '14%', side: 'right', offset: '6%' },
  { top: '33%', side: 'left', offset: '8%' },
  { top: '48%', side: 'right', offset: '7%' },
  { top: '77%', side: 'left', offset: '7%' },
] as const

/** Elementos decorativos do fundo da Home. Escondidos abaixo de xl, onde nao ha espaco lateral. */
export default function SideDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block">
      {rings.map((r, i) => (
        <div
          key={`ring-${i}`}
          className={`decor-ring absolute rounded-full border border-dashed border-accent/30 ${r.size}`}
          style={{ top: r.top, [r.side]: r.offset } as CSSProperties}
        />
      ))}
      {crosses.map((c, i) => (
        <span
          key={`cross-${i}`}
          className="absolute font-mono text-lg leading-none text-accent/50"
          style={{ top: c.top, [c.side]: c.offset } as CSSProperties}
        >
          +
        </span>
      ))}
      {tiles.map(({ Icon, top, side, offset, rot, dur, delay }, i) => (
        <div key={i} className="absolute" style={{ top, [side]: offset } as CSSProperties}>
          <div
            className="decor-float grid size-14 place-items-center rounded-2xl border border-accent/40 bg-accent/[0.06] text-accent/80 backdrop-blur-[2px]"
            style={{ '--rot': `${rot}deg`, animationDuration: `${dur}s`, animationDelay: `${delay}s` } as CSSProperties}
          >
            <Icon className="size-6" strokeWidth={1.5} />
          </div>
        </div>
      ))}
    </div>
  )
}
