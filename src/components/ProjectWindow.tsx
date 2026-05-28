import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

const LIME = '#9eff00'

export default function ProjectWindow({ p, featured = false }: { p: Project; featured?: boolean }) {
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

      {/* Window title bar (decorative) */}
      <div className="flex items-center justify-between border-b border-[#9eff00]/15 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/70 shadow-[0_0_6px_#9eff0080]" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/35" />
          <span className="h-2 w-2 rounded-full bg-[#9eff00]/15" />
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`abrir ${p.title}`}
            className="inline-flex h-5 w-5 items-center justify-center text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
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
            Destaque
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

        {(p.live || p.repo) && (
          <div className="mt-auto flex items-center justify-end gap-4 border-t border-dashed border-[#9eff00]/15 pt-5 text-[11px]">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 uppercase tracking-wider text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <ExternalLink className="h-3 w-3" /> Ver site
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 uppercase tracking-wider text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
              >
                <Github className="h-3 w-3" /> Código
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
