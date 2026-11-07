import Reveal from '@/components/Reveal'

const k = 'text-accent-ink'
const s = 'text-foreground'

/** Cartao decorativo em forma de objeto JS: reforca a identidade dev sem texto traduzido. */
export default function CodeCard() {
  return (
    <Reveal index={1} className="hidden lg:block">
      <div aria-hidden className="tilt rounded-xl border border-border bg-surface shadow-xl shadow-black/10">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-accent" />
          <span className="size-2.5 rounded-full bg-accent/50" />
          <span className="size-2.5 rounded-full bg-accent/20" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">gabriel.ts</span>
        </div>
        <pre className="overflow-hidden p-5 font-mono text-[13px] leading-7 text-muted-foreground">
          <code>
            <span className={k}>const</span> <span className={s}>gabriel</span> = {'{'}
            {'\n  '}role: <span className={s}>"Full Stack Developer"</span>,
            {'\n  '}web: <span className={k}>true</span>,
            {'\n  '}mobile: <span className={k}>true</span>,
            {'\n  '}ai: <span className={k}>true</span>,
            {'\n  '}stack: [<span className={s}>"React"</span>, <span className={s}>"Laravel"</span>, <span className={s}>"Expo"</span>],
            {'\n  '}available: <span className={k}>true</span>,
            {'\n'}
            {'}'}
          </code>
        </pre>
      </div>
    </Reveal>
  )
}
