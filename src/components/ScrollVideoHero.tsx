import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const LIME = '#9eff00'

// How tall the section is (in viewport heights). With sticky inside, the
// excess height (SECTION_VH - 100vh) becomes the "scrub range" the user
// scrolls through to play the whole video. Calibrated for a ~5s clip:
// 250vh ⇒ 150vh of scroll = ~30vh per second, feels deliberate without
// dragging.
const SECTION_VH = 250

// How aggressively the scrub catches up to scroll. Lower = smoother but laggier.
// With an all-keyframes re-encode, seeks are instant so we can be snappier.
const LERP = 0.32

// Skip setting currentTime if the delta is below this — avoids hammering the
// decoder with redundant assignments and trims a lot of jank on slow GPUs.
const TIME_EPS = 1 / 120 // half a frame at 60fps

// Below this the scrub and the glow are considered settled and the rAF loop stops.
const SETTLE_EPS = 0.002

const POSTER_DESKTOP = '/hero-poster.webp'
const POSTER_MOBILE = '/hero-poster-mobile.webp'

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      : false,
  )
  useEffect(() => {
    const check = () =>
      setMobile(window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return mobile
}

/**
 * The hero video is 8.7 MB (all-keyframes encode for instant scrubbing).
 * Loading it on page load kept the network busy for seconds and made
 * PageSpeed give up on the site. Now the poster (the video's first frame)
 * shows first and the video only starts downloading on the first sign of
 * intent: scroll, touch, click or key. Visitors who asked for reduced motion
 * or data saving keep the poster.
 */
function useVideoIntent() {
  const [wanted, setWanted] = useState(false)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduced || saveData) return

    const events = ['scroll', 'wheel', 'pointerdown', 'touchstart', 'keydown'] as const
    const go = () => {
      setWanted(true)
      events.forEach(e => window.removeEventListener(e, go))
    }
    events.forEach(e => window.addEventListener(e, go, { passive: true, once: true }))
    return () => events.forEach(e => window.removeEventListener(e, go))
  }, [])
  return wanted
}

export default function ScrollVideoHero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const videoWanted = useVideoIntent()

  // ── Start downloading the video once there is intent ────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoWanted) return
    video.preload = 'auto'
    video.load()
  }, [videoWanted])

  // ── Desktop: scroll-scrubbed video ──────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return
    const wrapEl = wrapperRef.current
    const videoEl = videoRef.current
    const text = textRef.current
    if (!wrapEl || !videoEl) return
    const wrap = wrapEl
    const video = videoEl

    video.pause()
    // Hint the decoder to warm up so the first scroll feels instant.
    const warm = () => {
      const p = video.play()
      if (p && typeof p.then === 'function') p.then(() => video.pause()).catch(() => {})
      else video.pause()
    }

    let duration = 0
    let current = 0
    let lastApplied = -1
    let raf = 0
    let lastY = window.scrollY
    let vel = 0
    let glow = 0
    let lastGlow = ''

    const setMeta = () => { duration = video.duration || 0; warm(); start() }
    video.addEventListener('loadedmetadata', setMeta)
    if (video.readyState >= 1) setMeta()
    // Some browsers fire `loadeddata` even when metadata was already cached.
    const setReady = () => { if (video.readyState >= 2 && duration > 0) { warm(); start() } }
    video.addEventListener('loadeddata', setReady)

    // fastSeek is much cheaper than currentTime= for scrubbing when available.
    // It's Chrome/Firefox-only; Safari falls back to currentTime.
    const supportsFastSeek =
      typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function'
    const seek = supportsFastSeek
      ? (t: number) => {
          try {
            ;(video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(t)
          } catch { /* mid-seek */ }
        }
      : (t: number) => { try { video.currentTime = t } catch { /* mid-seek */ } }

    function tick() {
      const wrapRect = wrap.getBoundingClientRect()
      const sectionTop = wrapRect.top + window.scrollY
      const sectionHeight = wrap.offsetHeight
      const scrubRange = Math.max(1, sectionHeight - window.innerHeight)

      const sy = window.scrollY
      const raw = (sy - sectionTop) / scrubRange
      const progress = Math.min(1, Math.max(0, raw))

      // Drive video frame via lerped time for smoothness on jittery scroll.
      let target = current
      if (duration > 0 && video.readyState >= 2) {
        target = progress * duration
        current += (target - current) * LERP
        if (Math.abs(current - lastApplied) >= TIME_EPS) {
          seek(current)
          lastApplied = current
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
      const glowValue = glow.toFixed(3)
      // Writing a custom property on <html> restyles the whole page: only when it changed.
      if (glowValue !== lastGlow) {
        document.documentElement.style.setProperty('--matrix-glow', glowValue)
        lastGlow = glowValue
      }

      // Idle page = no loop. It restarts on the next scroll.
      const settled =
        Math.abs(target - current) < SETTLE_EPS &&
        Math.abs(vel) < SETTLE_EPS &&
        glow < SETTLE_EPS
      raf = settled ? 0 : requestAnimationFrame(tick)
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', start, { passive: true })
    window.addEventListener('resize', start, { passive: true })
    start()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', start)
      video.removeEventListener('loadedmetadata', setMeta)
      video.removeEventListener('loadeddata', setReady)
      document.documentElement.style.removeProperty('--matrix-glow')
    }
  }, [isMobile])

  // ── Mobile: autoplay the video normally with loop, only while on screen ─────
  useEffect(() => {
    if (!isMobile || !videoWanted) return
    const video = videoRef.current
    const wrap = wrapperRef.current
    if (!video || !wrap) return
    video.loop = true
    video.muted = true

    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        const p = video.play()
        if (p && typeof p.then === 'function') p.catch(() => {})
      } else {
        video.pause()
      }
    })
    io.observe(wrap)
    return () => {
      io.disconnect()
      video.pause()
    }
  }, [isMobile, videoWanted])

  return (
    <section
      ref={wrapperRef}
      id="home"
      className="relative bg-black"
      style={{ height: isMobile ? '100vh' : `${SECTION_VH}vh` }}
    >
      <div className={`${isMobile ? 'relative h-dvh' : 'sticky top-0 h-screen'} w-full overflow-hidden`}>
        {/* Scroll-scrubbed video. The poster is its first frame. */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          poster={isMobile ? POSTER_MOBILE : POSTER_DESKTOP}
          muted
          playsInline
          preload="none"
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
          className="scroll-indicator absolute bottom-10 left-1/2 z-10 hidden flex-col items-center gap-1 md:flex"
          style={{ color: LIME }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
