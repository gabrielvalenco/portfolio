import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: MouseEvent) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.07, ease: 'none',       overwrite: true })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.9,  ease: 'power3.out', overwrite: true })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.12, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1.8, opacity: 0.6,  duration: 0.25 })
    }

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.35, duration: 0.35, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1, opacity: 1,    duration: 0.25 })
    }

    window.addEventListener('mousemove', move)

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.classList.remove('has-custom-cursor')
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--primary)',
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(124,58,237,0.45)',
          pointerEvents: 'none', zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.35,
          willChange: 'transform',
        }}
      />
    </>
  )
}
