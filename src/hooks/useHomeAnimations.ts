import { useEffect } from 'react'
import { gsap } from '@/lib/gsap'

export default function useHomeAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {

      // ── Hero: line-by-line reveal + staggered elements ───────────────────────
      const header = document.querySelector('header#home')
      if (header) {
        const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'expo.out' } })

        // Badge slides down from above
        const badge = header.querySelector('[data-hero-badge]')
        if (badge) {
          tl.from(badge, { y: -24, opacity: 0, duration: 0.6, ease: 'power3.out' })
        }

        // Intro label (name line)
        const intro = header.querySelector('[data-hero-intro]')
        if (intro) {
          tl.from(intro, { y: '110%', opacity: 0, duration: 0.7 }, '-=0.3')
        }

        // H1 lines — clip reveal from below
        const lines = header.querySelectorAll('[data-hero-line]')
        if (lines.length) {
          tl.from(lines, { y: '115%', opacity: 0, duration: 0.95, stagger: 0.12 }, '-=0.4')
        }

        // Description paragraph
        const desc = header.querySelector('[data-hero-desc]')
        if (desc) {
          tl.from(desc, { y: 22, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.45')
        }

        // CTA buttons — stagger in
        const btns = header.querySelectorAll('[data-hero-cta]')
        if (btns.length) {
          tl.from(btns, {
            y: 20, opacity: 0,
            stagger: 0.1, duration: 0.65,
            ease: 'power3.out',
          }, '-=0.4')
        }

        // Social icon row
        const socials = header.querySelector('[data-hero-socials]')
        if (socials) {
          tl.from(socials, { x: -18, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        }

        // Photo: scale + fade from slightly below
        const photo = header.querySelector('[data-hero-photo]')
        if (photo) {
          tl.from(photo, {
            scale: 0.82, opacity: 0, y: 32,
            duration: 1.1, ease: 'expo.out',
          }, '-=0.85')
        }
      }

      // ── Scroll-triggered section animations ──────────────────────────────────
      const sections = gsap.utils.toArray<HTMLElement>('section')
      sections.forEach(sec => {
        const h2 = sec.querySelector('h2')
        if (h2) {
          gsap.from(h2, {
            opacity: 0, y: 16,
            duration: 0.7, ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: { trigger: sec, start: 'top 82%', once: true },
          })
        }

        const items = sec.querySelectorAll('.grid > div, article, [data-animate-item]')
        if (items.length) {
          gsap.from(items, {
            opacity: 0, y: 28,
            stagger: 0.08, duration: 0.75,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
          })
        }
      })

      // ── Animated counters ─────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count') || '0')
        const suffix = el.getAttribute('data-suffix') || ''
        const obj    = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.4,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      })

      // ── Parallax: hero photo drifts slightly on scroll ────────────────────────
      const heroPhoto = document.querySelector('[data-hero-photo]')
      if (heroPhoto) {
        gsap.to(heroPhoto, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: 'header#home',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

    })

    return () => ctx.revert()
  }, [])
}
