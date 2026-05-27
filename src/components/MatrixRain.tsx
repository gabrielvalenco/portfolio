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

          if (b < 1.15) {
            // bright leading head — near-white lime
            ctx.fillStyle = 'rgba(208,255,170,0.95)'
            ctx.fillText(ch, x, y)
          } else if (b < TAIL) {
            const lead = 1 - b / TAIL
            ctx.fillStyle = `rgba(120,235,70,${(0.12 + lead * 0.72).toFixed(3)})`
            ctx.fillText(ch, x, y)
          } else {
            ctx.fillStyle = 'rgba(46,140,58,0.10)'
            ctx.fillText(ch, x, y)
          }
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

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
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
