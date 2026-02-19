import { useEffect, useRef } from 'react'

export default function Particles({ density = 60, className }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([])
  const lastTimeRef = useRef<number>(0)
  const pausedRef = useRef<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isNarrow = window.innerWidth < 768
    const base = prefersReduced ? Math.floor(density / 3) : density
    const count = Math.max(12, Math.floor(base * (isNarrow ? 0.6 : 1)))

    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.8 + 0.6,
    }))

    const draw = (now: number) => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      // Throttle ~30fps
      if (now - lastTimeRef.current < 33) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      lastTimeRef.current = now
      ctx.clearRect(0, 0, width, height)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        ctx.globalAlpha = 0.6
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.6)
        g.addColorStop(0, 'rgba(124,58,237,0.65)')
        g.addColorStop(1, 'rgba(124,58,237,0.0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    const onVisibility = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [density])

  return <canvas ref={canvasRef} className={className ?? "absolute inset-0 -z-10 opacity-50"} aria-hidden />
}
