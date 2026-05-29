import { useEffect, useRef } from 'react'

const LIME = '#9eff00'

const GLYPHS =
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ' +
  '0123456789' +
  'ABCDEFGHJKLMNPQRSTUVWXYZ' +
  '<>/\\[]{}()=+*-!?$#@%&;:.~^'

const CODE_SNIPPETS = [
  'const app = express()',
  'SELECT * FROM users',
  'git commit -m "feat"',
  'docker compose up -d',
  'npm run build',
  'useEffect(() => {}, [])',
  'interface Props {}',
  'async function fetch()',
  'return <Component />',
  'prisma.user.findMany()',
  'z.string().email()',
  'tailwind.config.js',
  'const [state, set]',
  'export default fn()',
  'import { gsap }',
  'border: 1px solid #9eff00',
  'type T = string | null',
  'Promise.all([...])',
  'res.status(200).json()',
  'schema.validate(data)',
]

const randGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0]
const randInt = (min: number, max: number) => (Math.random() * (max - min) + min) | 0

// ─── Canvas stream component ───────────────────────────────────────────────

function StreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const cv = el
    const ctx = cv.getContext('2d', { alpha: true })!
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const FONT = 13
    const TAIL = 18

    let width = 0, height = 0, cols = 0, rows = 0
    let chars: string[] = []
    let periods: number[] = []
    let speeds: number[] = []
    let heads: number[] = []
    let raf = 0

    // Mouse repel
    const OFF = -99999
    let mouseX = OFF, mouseY = OFF

    function build() {
      const rect = cv!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      cv!.width = Math.floor(width * dpr)
      cv!.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT}px ui-monospace,"JetBrains Mono","SFMono-Regular",Menlo,monospace`
      ctx.textBaseline = 'top'
      ctx.textAlign = 'left'

      cols = Math.ceil(width / FONT) + 1
      rows = Math.ceil(height / FONT) + 2
      const n = cols * rows
      chars = Array.from({ length: n }, randGlyph)
      periods = Array.from({ length: cols }, () => 12 + randInt(0, 18))
      speeds  = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.7)
      heads   = Array.from({ length: cols }, () => Math.random() * rows)
    }
    build()

    const mod = (a: number, b: number) => ((a % b) + b) % b

    function paint() {
      ctx.clearRect(0, 0, width, height)
      for (let c = 0; c < cols; c++) {
        const period = periods[c]
        const head = heads[c]
        const x = c * FONT
        const base = c * rows

        for (let r = 0; r < rows; r++) {
          const b = mod(head - r, period)
          const y = r * FONT
          const ch = chars[base + r]

          let cr: number, cg: number, cb: number, alpha: number
          if (b < 1.2) {
            cr = 220; cg = 255; cb = 180; alpha = 0.92
          } else if (b < TAIL) {
            const lead = 1 - b / TAIL
            cr = 100; cg = 220; cb = 50; alpha = 0.08 + lead * 0.6
          } else {
            cr = 36; cg = 110; cb = 40; alpha = 0.06
          }

          // Mouse proximity brightening
          const dx = x - mouseX, dy = y - mouseY
          const dist2 = dx * dx + dy * dy
          const R = 90
          if (dist2 < R * R) {
            const t = 1 - Math.sqrt(dist2) / R
            alpha = Math.min(1, alpha + t * 0.5)
          }

          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`
          ctx.fillText(ch, x, y)
        }
      }
    }

    function draw() {
      const n = (chars.length * 0.01) | 0
      for (let i = 0; i < n; i++) chars[(Math.random() * chars.length) | 0] = randGlyph()
      for (let c = 0; c < cols; c++) heads[c] += speeds[c]
      paint()
      raf = requestAnimationFrame(draw)
    }

    if (prefersReduced) paint()
    else raf = requestAnimationFrame(draw)

    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => { build(); if (prefersReduced) paint() }, 150)
    }
    window.addEventListener('resize', onResize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = cv.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouseX = OFF; mouseY = OFF }
    cv.addEventListener('mousemove', onMouseMove, { passive: true })
    cv.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      cv.removeEventListener('mousemove', onMouseMove)
      cv.removeEventListener('mouseleave', onMouseLeave)
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

// ─── Floating snippet cards ────────────────────────────────────────────────

function SnippetCard({ code, delay, col }: { code: string; delay: number; col: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Scroll-triggered reveal via IntersectionObserver
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const colColors: Record<number, string> = {
    0: 'rgba(158,255,0,0.18)',
    1: 'rgba(158,255,0,0.12)',
    2: 'rgba(158,255,0,0.08)',
  }

  return (
    <div
      ref={ref}
      className="relative font-mono text-xs border px-4 py-3 cursor-default select-none"
      style={{
        opacity: 0,
        transform: 'translateY(22px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease',
        borderColor: `rgba(158,255,0,${0.15 + col * 0.05})`,
        background: colColors[col] ?? colColors[0],
        backdropFilter: 'blur(4px)',
        color: LIME,
      }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.borderColor = 'rgba(158,255,0,0.7)'
        t.style.boxShadow = '0 0 18px rgba(158,255,0,0.18)'
        t.style.background = 'rgba(158,255,0,0.14)'
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.borderColor = `rgba(158,255,0,${0.15 + col * 0.05})`
        t.style.boxShadow = 'none'
        t.style.background = colColors[col] ?? colColors[0]
      }}
    >
      <span className="opacity-40 mr-2 text-[10px]">&gt;_</span>
      {code}
      <span
        className="ml-1 inline-block w-[7px] h-[13px] align-middle"
        style={{
          background: LIME,
          animation: 'term-blink 1s steps(1) infinite',
          opacity: 0.7,
        }}
      />
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function CodeShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  // Distribute snippets into 3 columns
  const cols = [0, 1, 2].map(ci =>
    CODE_SNIPPETS.filter((_, i) => i % 3 === ci)
  )

  return (
    <section
      ref={sectionRef}
      id="code-showcase"
      className="relative border-t border-[#9eff00]/10 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Animated glyph rain behind everything */}
      <StreamCanvas />

      {/* Gradient masks: fade canvas into bg at top and bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 z-10"
        style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Subtle radial glow center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(158,255,0,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="container relative z-20 mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <header className="mb-14 text-center">
          <div
            className="inline-flex items-center gap-4 font-mono text-[11px] tracking-[0.32em] mb-5"
            style={{ color: LIME }}
          >
            <span className="h-px w-16" style={{ background: `${LIME}55` }} />
            <span>03</span>
            <span className="h-px w-16" style={{ background: `${LIME}55` }} />
          </div>
          <h2
            className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none"
            style={{ color: LIME, textShadow: `0 0 32px ${LIME}44` }}
          >
            Stack em ação
          </h2>
          <p className="mt-5 font-mono text-sm text-zinc-400 max-w-lg mx-auto">
            O dia a dia em código: as ferramentas, padrões e sintaxes que uso pra construir produtos reais.
          </p>
        </header>

        {/* Three-column snippet grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cols.map((snippets, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {snippets.map((code, si) => (
                <SnippetCard
                  key={code}
                  code={code}
                  delay={ci * 80 + si * 90}
                  col={ci}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom line decoration */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <span className="h-px flex-1 max-w-[120px]" style={{ background: `${LIME}33` }} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: `${LIME}77` }}
          >
            e muito mais
          </span>
          <span className="h-px flex-1 max-w-[120px]" style={{ background: `${LIME}33` }} />
        </div>
      </div>
    </section>
  )
}
