import { useEffect, useRef } from 'react'

const GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789<>/\\[]{}()=+*-!?$#@%&;:.~^'
const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]

function spawnBurst(x: number, y: number) {
  const COUNT = 10
  const BASE_SPEED = 68

  for (let i = 0; i < COUNT; i++) {
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4
    const speed = BASE_SPEED * (0.55 + Math.random() * 0.9)
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed
    const size = 11 + ((Math.random() * 5) | 0)
    const dur = 520 + ((Math.random() * 280) | 0)

    const el = document.createElement('span')
    el.textContent = randGlyph()
    el.style.cssText = `
      position:fixed;
      left:${x}px;
      top:${y}px;
      font-family:ui-monospace,"JetBrains Mono",monospace;
      font-size:${size}px;
      color:#9eff00;
      pointer-events:none;
      z-index:99999;
      user-select:none;
      will-change:transform,opacity;
      text-shadow:0 0 8px #9eff0099;
    `
    document.body.appendChild(el)

    let start: number | null = null
    function frame(ts: number) {
      if (!start) start = ts
      const t = (ts - start) / dur
      if (t >= 1) { el.remove(); return }
      const ease = 1 - t * t          // decelerate
      const op   = t < 0.3 ? 1 : 1 - (t - 0.3) / 0.7
      el.style.transform = `translate(${vx * ease * t}px,${vy * ease * t}px) scale(${1 - t * 0.4})`
      el.style.opacity   = String(op.toFixed(3))
      requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  // Ripple ring
  const ring = document.createElement('div')
  ring.style.cssText = `
    position:fixed;
    left:${x}px;
    top:${y}px;
    width:0;height:0;
    border-radius:50%;
    border:1.5px solid #9eff00;
    pointer-events:none;
    z-index:99998;
    will-change:transform,opacity;
    box-shadow:0 0 10px #9eff0066;
  `
  document.body.appendChild(ring)
  let rs: number | null = null
  const RDUR = 480
  function rframe(ts: number) {
    if (!rs) rs = ts
    const t = (ts - rs) / RDUR
    if (t >= 1) { ring.remove(); return }
    const r = t * 52
    ring.style.transform = `translate(-${r}px,-${r}px)`
    ring.style.width  = `${r * 2}px`
    ring.style.height = `${r * 2}px`
    ring.style.opacity = String((1 - t).toFixed(3))
    requestAnimationFrame(rframe)
  }
  requestAnimationFrame(rframe)
}

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
    document.documentElement.style.cursor = 'none'
    document.body.style.cursor = 'none'

    // Target position (updated on every mousemove)
    let tx = -200, ty = -200
    // Ring lags behind with lerp
    let rx = -200, ry = -200
    let raf = 0

    const onMove  = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const onClick = (e: MouseEvent) => spawnBurst(e.clientX, e.clientY)
    window.addEventListener('mousemove', onMove,  { passive: true })
    window.addEventListener('click',    onClick)

    function tick() {
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      dot!.style.transform  = `translate3d(${tx - 4}px,${ty - 4}px,0)`
      ring!.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      document.documentElement.classList.remove('has-custom-cursor')
      document.documentElement.style.cursor = ''
      document.body.style.cursor = ''
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
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid rgba(158,255,0,0.45)',
          pointerEvents: 'none', zIndex: 9998,
          opacity: 0.35,
          willChange: 'transform',
        }}
      />
    </>
  )
}
