import { useLang } from '@/i18n/context'

function Ribbon({ words, className }: { words: string[]; className: string }) {
  // Duas metades identicas: o loop de -50% emenda sem salto, mesmo em tela larga.
  const half = [...words, ...words, ...words]
  return (
    <div className={`ribbon ${className}`}>
      <div className="ribbon-track">
        {[0, 1].map(copy =>
          half.map((w, i) => (
            <span key={`${copy}-${i}`} className="flex shrink-0 items-center">
              {w}
              <span className="mx-[0.7em] text-[0.7em]">✦</span>
            </span>
          )),
        )}
      </div>
    </div>
  )
}

/** Duas fitas cruzadas que correm em sentidos opostos, invadindo a base do hero. */
export default function BigMarquee() {
  const { t } = useLang()
  const words = t.hero.words
  return (
    <div aria-hidden className="ribbons select-none">
      <Ribbon words={[...words].reverse()} className="ribbon-b" />
      <Ribbon words={words} className="ribbon-a" />
    </div>
  )
}
