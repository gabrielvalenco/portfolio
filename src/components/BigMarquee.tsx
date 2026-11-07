import { useLang } from '@/i18n/context'

function Row({ words, reverse }: { words: string[]; reverse?: boolean }) {
  // Duas metades identicas: o loop de -50% emenda sem salto.
  const half = [...words, ...words]
  return (
    <div className="big-row-clip overflow-hidden">
      <div className={`big-row ${reverse ? 'big-row-rev' : ''}`}>
      <div className={`big-track ${reverse ? 'big-track-rev' : ''}`}>
        {[0, 1].map(copy =>
          half.map((w, i) => (
            <span key={`${copy}-${i}`} className="flex shrink-0 items-center">
              <span className={`big-text ${i % 2 ? 'big-text-ghost' : ''}`}>{w}</span>
              <span className="mx-6 text-3xl text-accent md:mx-10 md:text-5xl">✦</span>
            </span>
          )),
        )}
      </div>
      </div>
    </div>
  )
}

/** Faixas gigantes de texto que correm em sentidos opostos (e acompanham o scroll onde o navegador suporta). */
export default function BigMarquee() {
  const { t } = useLang()
  const words = t.hero.words.map(w => w.toUpperCase())
  return (
    <div aria-hidden className="select-none space-y-2 py-10 md:py-16">
      <Row words={words} />
      <Row words={[...words].reverse()} reverse />
    </div>
  )
}
