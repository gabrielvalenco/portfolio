import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { onceInView } from '@/lib/inView'

type Props = {
  children: ReactNode
  as?: 'div' | 'li' | 'article' | 'section' | 'header' | 'p'
  /** Posicao na fila, para o stagger (40 ms por item, no maximo 3). */
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
    return onceInView(el, () => el.classList.add('is-visible'))
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${Math.min(index, 3) * 40}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
