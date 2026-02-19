import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function useHomeAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const header = document.querySelector('header#home')
      if (header) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
        const intro = header.querySelector('p')
        const title = header.querySelector('h1')
        const desc = header.querySelector('p:nth-of-type(2)')
        const buttons = header.querySelectorAll('button')
        tl.from(intro, { y: 16, opacity: 0 })
          .from(title, { y: 22, opacity: 0 }, '-=0.5')
          .from(desc, { y: 18, opacity: 0 }, '-=0.4')
          .from(buttons, { y: 14, opacity: 0, stagger: 0.08 }, '-=0.4')
      }

      const sections = gsap.utils.toArray<HTMLElement>('section')
      sections.forEach((sec) => {
        const h2 = sec.querySelector('h2')
        const items = sec.querySelectorAll('[data-slot=badge], article, li, .card, [data-slot=card], .grid > div')
        if (h2) {
          gsap.from(h2, {
            opacity: 0,
            y: 12,
            duration: 0.7,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              once: true,
            },
          })
        }
        if (items.length) {
          gsap.from(items, {
            opacity: 0,
            y: 14,
            stagger: 0.06,
            duration: 0.6,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sec,
              start: 'top 78%',
              once: true,
            },
          })
        }
      })
    })
    return () => ctx.revert()
  }, [])
}
