import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const LIME = '#9eff00'

// How tall the section is (in viewport heights). With sticky inside, the
// excess height becomes the "scrub range" the user scrolls through to play
// the whole video. h=220vh → 120vh of scroll drives the full clip.
const SECTION_VH = 220

// How aggressively the scrub catches up to scroll. Lower = smoother but laggier.
const LERP = 0.18

export default function ScrollVideoHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapEl = wrapperRef.current
    const videoEl = videoRef.current
    const text = textRef.current
    if (!wrapEl || !videoEl) return
    const wrap = wrapEl
    const video = videoEl

    video.pause()

    let duration = 0
    let current = 0
    let raf = 0
    let lastY = window.scrollY
    let vel = 0
    let glow = 0

    const setMeta = () => { duration = video.duration || 0 }
    video.addEventListener('loadedmetadata', setMeta)
    if (video.readyState >= 1) setMeta()

    function tick() {
      const wrapRect = wrap.getBoundingClientRect()
      const sectionTop = wrapRect.top + window.scrollY
      const sectionHeight = wrap.offsetHeight
      const scrubRange = Math.max(1, sectionHeight - window.innerHeight)

      const sy = window.scrollY
      const raw = (sy - sectionTop) / scrubRange
      const progress = Math.min(1, Math.max(0, raw))

      // Drive video frame via lerped currentTime for smoothness on jittery scroll.
      if (duration > 0) {
        const target = progress * duration
        current += (target - current) * LERP
        // Avoid setting currentTime if the video isn't ready, or it can throw.
        if (video.readyState >= 2) {
          try { video.currentTime = current } catch { /* seeking briefly */ }
        }
      }

      // Fade hero text out across the last 35% of the scrub so it hands off
      // cleanly to the next section.
      if (text) {
        const fade = 1 - Math.min(1, Math.max(0, (progress - 0.65) / 0.35))
        text.style.opacity = fade.toFixed(3)
      }

      // Scroll-velocity → lime glow at the next section's top edge.
      const delta = sy - lastY
      lastY = sy
      vel += delta * 0.05
      vel *= 0.88
      const targetGlow = Math.min(1, Math.abs(vel) * 0.45)
      glow += (targetGlow - glow) * 0.12
      document.documentElement.style.setProperty('--matrix-glow', glow.toFixed(3))

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', setMeta)
      document.documentElement.style.removeProperty('--matrix-glow')
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      id="home"
      className="relative bg-black"
      style={{ height: `${SECTION_VH}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          // poster avoids a blank frame while the file loads
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Vignette for hero text legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 45%, transparent 75%), linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 25%, transparent 70%, rgba(0,0,0,0.7))',
          }}
        />

        {/* Hero content */}
        <div
          ref={textRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center font-mono"
        >
          <p
            className="mb-6 text-xs tracking-[0.35em] sm:text-sm"
            style={{ color: LIME, textShadow: `0 0 12px ${LIME}80` }}
          >
            PORTFÓLIO
          </p>

          <h1
            className="whitespace-nowrap text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ color: LIME, textShadow: `0 0 28px ${LIME}66, 0 0 6px ${LIME}aa` }}
          >
            Gabriel Valenço
          </h1>

          <p className="mt-7 flex items-center gap-2 text-sm text-zinc-200 sm:text-base">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: LIME, boxShadow: `0 0 8px ${LIME}` }}
            />
            Desenvolvedor Full-Stack
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="scroll-indicator absolute bottom-10 left-1/2 z-10 flex flex-col items-center gap-1"
          style={{ color: LIME }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
