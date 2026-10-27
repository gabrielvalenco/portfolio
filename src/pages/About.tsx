import SubPageHeader from '@/components/SubPageHeader'
import { TermAnchor, TermLink } from '@/components/TermButton'
import useHomeAnimations from '@/hooks/useHomeAnimations'
import { Briefcase, Mail } from 'lucide-react'
import { useLang } from '@/i18n/context'
import Rich from '@/i18n/Rich'

const LIME = '#9eff00'

export default function AboutPage() {
  useHomeAnimations()
  const { t } = useLang()
  const a = t.about
  return (
    <div className="relative z-10 min-h-dvh bg-black">
      <SubPageHeader
        index="02"
        title={a.title}
        subtitle={a.subtitle}
      />

      <main className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
          {/* Left column: long-form bio */}
          <article className="space-y-10 font-mono text-sm leading-relaxed text-zinc-300">
            <section data-animate-item>
              <p
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400"
              >
                {a.introTitle}
              </p>
              <p>
                <Rich text={a.intro1} />
              </p>
              <p className="mt-3">
                {a.intro2}
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                {a.pathTitle}
              </p>
              <p>
                <Rich text={a.path1} />
              </p>
              <p className="mt-3">
                <Rich text={a.path2} />
              </p>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                {a.focusTitle}
              </p>
              <ul className="space-y-3">
                {a.focus.map(f => (
                  <li key={f.tag} className="border-l-2 border-[#9eff00]/40 pl-4" data-animate-item>
                    <span style={{ color: LIME }} className="block text-xs uppercase tracking-[0.22em]">
                      {f.tag}
                    </span>
                    <span className="text-zinc-300">{f.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section data-animate-item>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                {a.thinkTitle}
              </p>
              <ul className="space-y-2 text-zinc-300">
                {a.principles.map(p => (
                  <li key={p} className="flex gap-3" data-animate-item>
                    <span
                      className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                      style={{ background: LIME, boxShadow: `0 0 6px ${LIME}` }}
                    />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          {/* Right column: photo + facts + CTAs */}
          <aside className="space-y-8">
            <div
              data-animate-item
              className="terminal-panel corner-brackets relative overflow-hidden p-0"
            >
              <span className="cb-tl" />
              <span className="cb-tr" />
              <span className="cb-bl" />
              <span className="cb-br" />
              <img
                src="/pfp.webp"
                alt="Gabriel Valenço"
                width={800}
                height={1200}
                decoding="async"
                className="h-auto w-full object-cover"
              />
            </div>

            <div
              data-animate-item
              className="terminal-panel corner-brackets relative p-6 font-mono"
            >
              <span className="cb-tl" />
              <span className="cb-tr" />
              <span className="cb-bl" />
              <span className="cb-br" />
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                {a.quickTitle}
              </p>
              <dl className="space-y-2.5 text-xs">
                {a.facts.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-dashed border-[#9eff00]/10 pb-2 last:border-0 last:pb-0">
                    <dt style={{ color: LIME }} className="opacity-80 uppercase tracking-wider">{k}</dt>
                    <dd className="text-zinc-300">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div
              data-animate-item
              className="terminal-panel corner-brackets relative p-6 font-mono"
            >
              <span className="cb-tl" />
              <span className="cb-tr" />
              <span className="cb-bl" />
              <span className="cb-br" />
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
                {a.nowTitle}
              </p>
              <p className="text-xs text-zinc-300">
                {a.now1}
              </p>
              <p className="mt-3 text-xs text-zinc-300">
                {a.now2}
              </p>
            </div>

            <div className="flex flex-wrap gap-3" data-animate-item>
              <TermLink to="/experience" icon={Briefcase}>{a.ctaJourney}</TermLink>
              <TermAnchor href="mailto:gabrielvalencoofc@gmail.com" icon={Mail}>{a.ctaContact}</TermAnchor>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
