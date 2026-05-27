import { useEffect, useRef } from 'react'

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789' +
  'ABCDEFGHJKLMNPQRSTUVWXYZ:.=*+-<>¦|╲╱┼の日生月¥€$#%&'

function randChar() {
  return CHARS[(Math.random() * CHARS.length) | 0]
}
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

/**
 * Full-screen Matrix-style code rain that reacts to scroll:
 * scrolling down pushes the glyphs down, scrolling up pulls them up.
 * It also publishes a `--scroll-glow` CSS variable (0→1) driven by scroll
 * velocity, used to make the next section's top edge glow lime.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const FONT = 16

    let width = 0
    let height = 0
    let rows = 0
    let columns = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let heads: Float32Array = new Float32Array(0)  // head row (float) per column
    let speeds: Float32Array = new Float32Array(0) // ambient rows/frame
    let lengths: Int16Array = new Int16Array(0)    // trail length per column
    let glyphs: string[][] = []                    // glyph per trail cell

    function setup() {
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = `700 ${FONT}px "JetBrains Mono", monospace`
      ctx!.textBaseline = 'top'

      columns = Math.ceil(width / FONT)
      rows = Math.ceil(height / FONT)

      heads = new Float32Array(columns)
      speeds = new Float32Array(columns)
      lengths = new Int16Array(columns)
      glyphs = []
      for (let c = 0; c < columns; c++) {
        const len = (rand(6, 24) | 0)
        lengths[c] = len
        heads[c] = rand(-rows, rows)
        speeds[c] = rand(0.12, 0.45)
        const trail: string[] = new Array(len)
        for (let i = 0; i < len; i++) trail[i] = randChar()
        glyphs[c] = trail
      }
    }

    // ─── Scroll velocity tracking ───
    let lastY = window.scrollY
    let scrollVel = 0 // accumulated px, decays each frame
    const onScroll = () => {
      const y = window.scrollY
      scrollVel += y - lastY
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(setup)
    }
    window.addEventListener('resize', onResize)

    setup()

    let raf = 0
    let frame = 0
    function draw() {
      frame++
      ctx!.clearRect(0, 0, width, height)

      // px → rows; scroll dominates motion, ambient keeps it alive
      const scrollRows = scrollVel / FONT
      scrollVel *= 0.86
      if (Math.abs(scrollVel) < 0.05) scrollVel = 0

      // glow intensity from scroll activity
      const glow = Math.min(1, Math.abs(scrollVel) / 36)
      document.documentElement.style.setProperty('--scroll-glow', glow.toFixed(3))

      // dominant direction (ambient is always downward)
      const dir = scrollRows + 0.28 >= 0 ? 1 : -1

      for (let c = 0; c < columns; c++) {
        const len = lengths[c]
        let head = heads[c] + (reduce ? 0 : speeds[c]) + scrollRows * 1.15

        // recycle when the whole stream leaves the viewport
        if (head - len > rows + 3) head = -rand(2, rows)
        else if (head + len < -3) head = rows + rand(2, rows)
        heads[c] = head

        // occasional glyph mutation for the flicker effect
        if ((frame & 1) === 0 && Math.random() < 0.22) {
          glyphs[c][(Math.random() * len) | 0] = randChar()
        }

        const x = c * FONT
        for (let i = 0; i < len; i++) {
          const y = (head - i * dir) * FONT
          if (y < -FONT || y > height) continue
          if (i === 0) {
            ctx!.fillStyle = 'rgba(225,255,205,0.95)' // bright head
          } else {
            const a = (1 - i / len) * 0.85
            ctx!.fillStyle = `rgba(150,235,55,${a})`
          }
          ctx!.fillText(glyphs[c][i], x, y)
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(resizeRaf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.documentElement.style.setProperty('--scroll-glow', '0')
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: '#05070a' }}
    />
  )
}
