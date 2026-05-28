import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

const LIME = '#9eff00'

function slugFile(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') + '.tsx'
}

export default function ProjectWindow({ p, featured = false }: { p: Project; featured?: boolean }) {
  const file = slugFile(p.title)
  const url = p.live ?? p.repo
  return (
    <div
      data-animate-item
      className="terminal-panel corner-brackets group relative flex h-full flex-col font-mono"
    >
      <span className="cb-tl" />
      <span className="cb-tr" />
      <span className="cb-bl" />
      <span className="cb-br" />
      <div className="scan-sweep" />

      {/* Window title bar */}
      <div className="flex items-center justify-between border-b border-[#9eff00]/15 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/70 shadow-[0_0_6px_#9eff0080]" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/35" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/15" />
        </div>
        <span className="ml-2 truncate text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {file}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`abrir ${p.title}`}
            className="ml-3 inline-flex h-5 w-5 items-center justify-center text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
          >
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col p-5 ${featured ? 'md:p-7' : ''}`}>
        {featured && (
          <span
            className="mb-3 inline-flex w-fit items-center gap-1.5 border px-2 py-0.5 text-[10px] uppercase tracking-[0.22em]"
            style={{ color: LIME, borderColor: `${LIME}66` }}
          >
            <span className="h-1 w-1 rounded-full bg-[#9eff00]" />
            featured
          </span>
        )}
        <h3
          className={`font-bold uppercase tracking-tight text-zinc-100 ${
            featured ? 'text-xl sm:text-2xl' : 'text-base'
          }`}
        >
          {p.title}
        </h3>
        <p className={`mt-2 text-xs leading-relaxed text-zinc-400 ${featured ? 'sm:text-sm' : ''}`}>
          {p.desc}
        </p>

        {p.tags && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map(t => (
              <span
                key={t}
                className="border border-[#9eff00]/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-zinc-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-[#9eff00]/15 pt-5 text-[11px]">
          <span style={{ color: LIME }} className="flex items-center gap-1.5">
            <span className="opacity-70">$</span>
            <span>{p.live ? 'open --live' : p.repo ? 'open --repo' : 'wip'}</span>
            <span className="term-blink" style={{ color: LIME }}>_</span>
          </span>
          <div className="flex items-center gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> live
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <Github className="h-3 w-3" /> repo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
