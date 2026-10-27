import SubPageHeader from '@/components/SubPageHeader'
import { TermLink, TermAnchor } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { useLang } from '@/i18n/context'
import { User, Linkedin, GraduationCap, ExternalLink } from 'lucide-react'

const LIME = '#9eff00'

// Texto (cargo, periodo, bullets) vem de `translations.experience.roles`, na mesma ordem.
const roles = [
  { company: 'OneMoving',     current: true,  stack: ['React Native', 'React', 'Node', 'API', 'MySQL', 'AWS'] },
  { company: 'Desigual',      current: false, stack: ['React', 'Vue', 'Laravel', 'Node.js', 'MySQL', 'n8n', 'GSAP'] },
  { company: 'Grupo Prodemi', current: false, stack: ['Laravel', 'JavaScript', 'MySQL', 'Bootstrap'] },
  { company: 'Jem',           current: false, stack: ['Meta Ads', 'Google Ads', 'GA4', 'Looker Studio'] },
]

export default function ExperiencePage() {
  useHomeAnimations()
  const { t } = useLang()
  const e = t.experience
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="02"
        title={e.title}
        subtitle={e.subtitle}
      />

      <main className="container mx-auto px-6 py-16">
        {/* Timeline */}
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute left-3 top-2 bottom-2 w-px"
            style={{ background: `linear-gradient(to bottom, ${LIME}99, ${LIME}22 80%, transparent)` }}
          />

          <ul className="space-y-12">
            {roles.map((r, i) => {
              const text = e.roles[i]
              return (
                <li key={r.company} className="relative pl-12" data-animate-item>
                  {/* Node */}
                  <span
                    className="absolute left-0 top-1.5 inline-flex h-7 w-7 items-center justify-center border bg-black font-mono text-[10px]"
                    style={{ borderColor: `${LIME}66`, color: LIME }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="terminal-panel corner-brackets relative p-6 font-mono">
                    <span className="cb-tl" />
                    <span className="cb-tr" />
                    <span className="cb-bl" />
                    <span className="cb-br" />
                    <div className="scan-sweep" />

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-100">
                        {r.company}
                      </h2>
                      {r.current && (
                        <span
                          className="text-[10px] uppercase tracking-widest border px-1.5 py-0.5"
                          style={{ color: LIME, borderColor: `${LIME}66` }}
                        >
                          {t.common.current}
                        </span>
                      )}
                      <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                        {text.period}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-zinc-400">{text.role}</p>

                    <ul className="mt-5 space-y-2 text-xs text-zinc-300">
                      {text.bullets.map(b => (
                        <li key={b} className="flex gap-3" data-animate-item>
                          <span
                            className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                            style={{ background: LIME, boxShadow: `0 0 6px ${LIME}` }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {r.stack.map(s => (
                        <span
                          key={s}
                          className="border border-[#9eff00]/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Education */}
        <section id="education" className="mt-16">
          <p
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400"
            data-animate-item
          >
            {e.educationTitle}
          </p>
          <div
            data-animate-item
            className="terminal-panel corner-brackets relative p-6 font-mono"
          >
            <span className="cb-tl" />
            <span className="cb-tr" />
            <span className="cb-bl" />
            <span className="cb-br" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <GraduationCap className="h-5 w-5" style={{ color: LIME }} />
              <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-100">
                Unisalesiano
              </h2>
              <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                2021 - 2025
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-zinc-400">{e.degree}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className="border px-1.5 py-0.5 text-[10px] uppercase tracking-widest"
                style={{ color: LIME, borderColor: `${LIME}66` }}
              >
                {e.graduated}
              </span>
              <a
                href="https://unisalesiano.com.br/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-zinc-400 no-underline transition-colors hover:text-[#9eff00]"
              >
                <ExternalLink className="h-3 w-3" /> unisalesiano.com.br
              </a>
            </div>
          </div>
        </section>

        <div className="mt-14 flex flex-wrap justify-center gap-3" data-animate-item>
          <TermLink to="/about" icon={User}>{e.ctaAbout}</TermLink>
          <TermAnchor
            href="https://www.linkedin.com/in/gabriel-valenço-480b43276"
            target="_blank"
            icon={Linkedin}
          >
            LinkedIn
          </TermAnchor>
        </div>
      </main>
    </div>
  )
}
