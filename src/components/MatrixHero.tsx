import MatrixRain from '@/components/MatrixRain'
import { ChevronDown } from 'lucide-react'

const LIME = '#9eff00'

export default function MatrixHero() {
  return (
    <section
      id="home"
      className="sticky top-0 z-0 flex h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Falling terminal glyphs */}
      <MatrixRain />

      {/* Vignette + center darken for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, transparent 75%), linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 25%, transparent 70%, rgba(0,0,0,0.55))',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center font-mono">
        <p
          className="mb-6 text-xs tracking-[0.35em] sm:text-sm"
          style={{ color: LIME, textShadow: `0 0 12px ${LIME}80` }}
        >
          root@portfolio:~$ ./init
        </p>

        <h1
          className="text-5xl font-bold uppercase leading-none tracking-tight sm:text-7xl md:text-8xl"
          style={{ color: LIME, textShadow: `0 0 28px ${LIME}66, 0 0 6px ${LIME}aa` }}
        >
          Gabriel
          <br />
          Valenço
        </h1>

        <p className="mt-7 max-w-md text-sm text-lime-200/70 sm:text-base">
          <span className="text-lime-300/90">&gt;</span> full-stack developer
          <span className="ml-0.5 inline-block animate-pulse" style={{ color: LIME }}>
            _
          </span>
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
    </section>
  )
}
