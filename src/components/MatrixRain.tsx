import { useEffect, useRef } from 'react'

const GLYPHS =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ' +
  '0123456789' +
  'ABCDEFGHJKLMNPQRSTUVWXYZ' +
  '<>/\\[]{}()=+*-!?$#@%&;:.~^'

const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]
const mod = (n: number, m: number) => ((n % m) + m) % m

const FONT = 16
const TAIL = 13
const MOUSE_RADIUS = 130
const MOUSE_PUSH = 24
const TRAIL_LEN = 10
const MAX_PUSH = MOUSE_PUSH * 1.7
const MAX_PUSH_SQ = MAX_PUSH * MAX_PUSH

// Precomputed trail weights — newest (i=0) at full strength, decaying with age.
const TRAIL_WEIGHTS: number[] = Array.from(
  { length: TRAIL_LEN },
  (_, i) => Math.pow(1 - i / TRAIL_LEN, 1.6),
)

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const cv = el
    const ctx = cv.getContext('2d', { alpha: true })!

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let chars: string[] = []
    let periods: number[] = []
    let speeds: number[] = []
    let heads: number[] = []

    function build() {
      width = cv.clientWidth
      height = cv.clientHeight
      cv.width = Math.floor(width * dpr)
      cv.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT}px ui-monospace, "JetBrains Mono", "SFMono-Regular", Menlo, monospace`
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'

      cols = Math.ceil(width / FONT) + 1
      rows = Math.ceil(height / FONT) + 2
      chars = new Array(cols * rows)
      for (let i = 0; i < chars.length; i++) chars[i] = randGlyph()
      periods = new Array(cols)
      speeds = new Array(cols)
      heads = new Array(cols)
      for (let c = 0; c < cols; c++) {
        periods[c] = 16 + ((Math.random() * 22) | 0)
        speeds[c] = 0.55 + Math.random() * 0.9
        heads[c] = Math.random() * rows
      }
    }
    build()

    let lastScrollY = window.scrollY
    let vel = 0
    let glow = 0
    let dir = 1
    let raf = 0

    // Mouse "bubble" + trail — smoothed position, off-screen when not present.
    const OFF = -99999
    let mouseX = OFF
    let mouseY = OFF
    let mouseTargetX = OFF
    let mouseTargetY = OFF
    const trailX = new Float32Array(TRAIL_LEN).fill(OFF)
    const trailY = new Float32Array(TRAIL_LEN).fill(OFF)

    const IDLE = 0.14 // gentle baseline drift (rows/frame) so it feels alive

    function paint() {
      ctx.clearRect(0, 0, width, height)

      for (let c = 0; c < cols; c++) {
        const period = periods[c]
        const head = heads[c]
        const x = c * FONT
        const base = c * rows

        for (let r = 0; r < rows; r++) {
          const b = mod((head - r) * dir, period) // 0 at the leading char, grows behind
          const ch = chars[base + r]
          const y = r * FONT

          let cr: number, cg: number, cb: number, alpha: number
          let isLead = false

          if (b < 1.15) {
            cr = 208; cg = 255; cb = 170
            alpha = 0.95
            isLead = true
          } else if (b < TAIL) {
            const lead = 1 - b / TAIL
            cr = 120; cg = 235; cb = 70
            alpha = 0.12 + lead * 0.72
          } else {
            cr = 46; cg = 140; cb = 58
            alpha = 0.10
          }

          // Mouse bubble + trail: each trail point pushes & brightens.
          let dxSum = 0
          let dySum = 0
          let maxEase = 0
          for (let ti = 0; ti < TRAIL_LEN; ti++) {
            const tw = TRAIL_WEIGHTS[ti]
            const tdx = x - trailX[ti]
            const tdy = y - trailY[ti]
            const effR = MOUSE_RADIUS * (0.55 + 0.45 * tw)
            const td2 = tdx * tdx + tdy * tdy
            if (td2 >= effR * effR) continue
            const td = Math.sqrt(td2)
            const t = 1 - td / effR
            const ease = t * t * (3 - 2 * t) * tw
            if (ease > maxEase) maxEase = ease
            if (td > 0.5) {
              const inv = 1 / td
              const push = ease * MOUSE_PUSH
              dxSum += tdx * inv * push
              dySum += tdy * inv * push
            }
          }

          let drawX = x
          let drawY = y
          if (maxEase > 0) {
            // Clamp combined push so overlapping trail points don't explode.
            const sumSq = dxSum * dxSum + dySum * dySum
            if (sumSq > MAX_PUSH_SQ) {
              const k = MAX_PUSH / Math.sqrt(sumSq)
              dxSum *= k
              dySum *= k
            }
            drawX = x + dxSum
            drawY = y + dySum
            alpha = Math.min(1, alpha + maxEase * 0.7)
            if (!isLead) {
              cr = (cr + (220 - cr) * maxEase) | 0
              cg = (cg + (255 - cg) * maxEase) | 0
              cb = (cb + (170 - cb) * maxEase) | 0
            }
          }

          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
          ctx.fillText(ch, drawX, drawY)
        }
      }
    }

    function draw() {
      const sy = window.scrollY
      const delta = sy - lastScrollY
      lastScrollY = sy

      vel += delta * 0.05
      vel *= 0.88

      const move = IDLE + vel
      if (Math.abs(move) > 0.001) dir = move >= 0 ? 1 : -1

      const target = Math.min(1, Math.abs(vel) * 0.45)
      glow += (target - glow) * 0.12
      document.documentElement.style.setProperty('--matrix-glow', glow.toFixed(3))

      // Smooth mouse position toward latest event target
      mouseX += (mouseTargetX - mouseX) * 0.3
      mouseY += (mouseTargetY - mouseY) * 0.3

      // Shift trail (newest at index 0) and record current smoothed position
      for (let i = TRAIL_LEN - 1; i > 0; i--) {
        trailX[i] = trailX[i - 1]
        trailY[i] = trailY[i - 1]
      }
      trailX[0] = mouseX
      trailY[0] = mouseY

      // flicker a small slice of glyphs each frame
      const n = (chars.length * 0.012) | 0
      for (let i = 0; i < n; i++) chars[(Math.random() * chars.length) | 0] = randGlyph()

      for (let c = 0; c < cols; c++) heads[c] += move * speeds[c]

      paint()
      raf = requestAnimationFrame(draw)
    }

    if (prefersReduced) {
      paint()
    } else {
      raf = requestAnimationFrame(draw)
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        build()
        if (prefersReduced) paint()
      }, 150)
    }
    window.addEventListener('resize', onResize)

    // The canvas covers the viewport (sticky, top:0, h-screen), so clientX/Y
    // map directly to canvas-local coordinates.
    const onMouseMove = (e: MouseEvent) => {
      mouseTargetX = e.clientX
      mouseTargetY = e.clientY
      // First move: snap so the bubble (and trail) don't fly in from off-screen.
      if (mouseX === OFF) {
        mouseX = mouseTargetX
        mouseY = mouseTargetY
        for (let i = 0; i < TRAIL_LEN; i++) {
          trailX[i] = mouseTargetX
          trailY[i] = mouseTargetY
        }
      }
    }
    const onMouseLeave = () => {
      mouseTargetX = OFF
      mouseTargetY = OFF
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.style.removeProperty('--matrix-glow')
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ display: 'block' }}
    />
  )
}
