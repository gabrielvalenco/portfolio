import { useEffect, useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { onceInView } from '@/lib/inView'

type Props = {
  text: string
  as?: 'h1' | 'h2'
  /** Anima ao montar (hero); sem isso, anima ao entrar na tela. */
  immediate?: boolean
  delayMs?: number
  className?: string
  /** Classe aplicada a cada palavra (ex.: gradient-text). */
  wordClassName?: string
}

/** Titulo cinetico: cada palavra sobe de dentro de uma mascara, em sequencia. */
export default function KineticTitle({
  text,
  as = 'h2',
  immediate = false,
  delayMs = 0,
  className,
  wordClassName,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null)
  const Tag = as as 'h2'

  useEffect(() => {
    const el = ref.current
    if (!el || immediate) return
    return onceInView(el, () => el.classList.add('is-visible'))
  }, [immediate])

  return (
    <Tag ref={ref} aria-label={text} className={cn('kinetic', immediate && 'kinetic-now', className)} style={{ '--kd': `${delayMs}ms` } as CSSProperties}>
      {text.split(' ').map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden>
          {i > 0 && ' '}
          <span className="kw">
            <span className={cn('kw-in', wordClassName)} style={{ '--i': i } as CSSProperties}>
              {word}
            </span>
          </span>
        </span>
      ))}
    </Tag>
  )
}
