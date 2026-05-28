import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// Split a text node into per-character spans (mutates the element).
function splitChars(el: HTMLElement): HTMLSpanElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  const spans: HTMLSpanElement[] = []
  for (const ch of text) {
    const span = document.createElement('span')
    span.textContent = ch
    span.style.display = 'inline-block'
    span.style.whiteSpace = 'pre'
    el.appendChild(span)
    spans.push(span)
  }
  return spans
}

export default function useHomeAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {

      // ── Per-section terminal header animations ─────────────────────────────
      const heads = gsap.utils.toArray<HTMLElement>('[data-term-head]')
      heads.forEach(head => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: head, start: 'top 80%', once: true },
          defaults: { ease: 'power3.out' },
        })

        const meta = head.querySelector<HTMLElement>('[data-term-meta]')
        if (meta) {
          tl.from(meta, { opacity: 0, y: -8, duration: 0.5 })
        }

        const titleText = head.querySelector<HTMLElement>('[data-term-text]')
        if (titleText) {
          const chars = splitChars(titleText)
          tl.from(
            chars,
            {
              opacity: 0,
              y: 14,
              filter: 'blur(6px)',
              duration: 0.55,
              stagger: { each: 0.025, from: 'start' },
              ease: 'power2.out',
            },
            '-=0.25',
          )
        }

        const sub = head.querySelector<HTMLElement>('[data-term-sub]')
        if (sub) {
          tl.from(sub, { opacity: 0, y: 8, duration: 0.5 }, '-=0.3')
        }
      })

      // ── Generic per-item reveal (cards, list items, paragraphs) ───────────
      const sections = gsap.utils.toArray<HTMLElement>('section[id]')
      sections.forEach(sec => {
        const items = sec.querySelectorAll<HTMLElement>('[data-animate-item]')
        if (!items.length) return
        gsap.from(items, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: { trigger: sec, start: 'top 72%', once: true },
        })
      })

      // ── Animated counters (tick-up) ────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count') || '0')
        const suffix = el.getAttribute('data-suffix') || ''
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.0,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate() {
            el.textContent = String(Math.round(obj.val)).padStart(2, '0') + suffix
          },
        })
      })

      // ── Section dividers: subtle parallax of the lime border line ─────────
      gsap.utils.toArray<HTMLElement>('section[id]').forEach(sec => {
        gsap.fromTo(
          sec,
          { backgroundPositionY: '0px' },
          {
            backgroundPositionY: '40px',
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      // Refresh once after layout settles (fonts, marquee).
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => ctx.revert()
  }, [])
}
