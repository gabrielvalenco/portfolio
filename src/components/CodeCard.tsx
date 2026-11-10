import Reveal from '@/components/Reveal'

const k = 'text-pink'
const s = 'text-lime'

/** Cartao decorativo em forma de objeto JS: reforca a identidade dev sem texto traduzido. Sempre escuro. */
export default function CodeCard() {
  return (
    <Reveal index={1} className="hidden lg:block">
      <div
        aria-hidden
        className="dark -rotate-2 rounded-3xl border-2 border-foreground/80 bg-background text-foreground shadow-[10px_10px_0_0_var(--violet)] transition-transform duration-300 hover:rotate-0"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-5 py-3.5">
          <span className="size-3 rounded-full bg-pink" />
          <span className="size-3 rounded-full bg-lime" />
          <span className="size-3 rounded-full bg-violet" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">gabriel.ts</span>
        </div>
        <pre className="overflow-hidden p-6 font-mono text-[13px] leading-7 text-muted-foreground">
          <code>
            <span className={k}>const</span> <span className="text-foreground">gabriel</span> = {'{'}
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
