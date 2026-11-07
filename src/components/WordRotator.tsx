import type { CSSProperties } from 'react'

const STEP = 2.6 // segundos por palavra

/** Troca de palavra em loop, so com CSS: todas ficam empilhadas na mesma celula e cada uma entra na sua vez. */
export default function WordRotator({ words }: { words: string[] }) {
  const total = words.length * STEP
  return (
    <span aria-hidden className="word-rotator">
      {words.map((w, i) => (
        <span
          key={w}
          className="word-rotator-item"
          style={{ animationDuration: `${total}s`, animationDelay: `${i * STEP}s`, '--first': i === 0 ? 1 : 0 } as CSSProperties}
        >
          {w}
        </span>
      ))}
    </span>
  )
}
