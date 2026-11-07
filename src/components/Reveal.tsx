import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  as?: 'div' | 'li' | 'article' | 'section' | 'header' | 'p'
  /** Posicao na fila, para o stagger (60 ms por item, no maximo 5). */
  index?: number
  className?: string
}

/** Fade + translateY de 10px quando entra na tela, uma unica vez. */
export default function Reveal({ children, as = 'div', index = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as as 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
