import MatrixRain from '@/components/MatrixRain'

// ─── Hero (no navbar) ────────────────────────────────────────────────────────
function Hero() {
  return (
    <header
      id="home"
      className="scanlines relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* darken center so the text reads over the rain */}
      <div
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(5,7,10,0.82) 0%, rgba(5,7,10,0.35) 55%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(var(--lime-rgb),0.3)] bg-[rgba(var(--lime-rgb),0.06)] px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--lime)]" />
          ./gabriel_valenco --status online
        </p>

        <h1 className="font-bold">
          <span className="block text-foreground">Full-stack developer</span>
          <span className="lime-text block">&amp; problem solver</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base text-muted-foreground sm:text-lg">
          <span className="text-primary">&gt;</span> Construo SaaS, automações e
          interfaces que parecem mágica — mas são só código bem escrito.
          <span className="term-cursor" />
        </p>
      </div>

      {/* scroll hint */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          scroll
        </span>
        <div className="mx-auto mt-2 text-primary">↓</div>
      </div>
    </header>
  )
}

// ─── Next section: opaque, so the rain runs underneath it ─────────────────────
// The top edge glows lime, intensifying with scroll velocity (--scroll-glow).
function NextSection() {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen bg-background"
    >
      {/* Glowing lime top edge — brightens as the code rain passes under it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--lime), transparent)',
          boxShadow:
            '0 0 calc(10px + var(--scroll-glow) * 46px) calc(1px + var(--scroll-glow) * 7px) rgba(var(--lime-rgb), calc(0.28 + var(--scroll-glow) * 0.72))',
        }}
      />
      {/* soft lime bloom bleeding down from the edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            'linear-gradient(to bottom, rgba(var(--lime-rgb), calc(0.12 + var(--scroll-glow) * 0.22)), transparent)',
        }}
      />

      <div className="container mx-auto px-6 py-28">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">// sobre</p>
        <h2 className="mt-4 max-w-2xl font-semibold text-foreground">
          O resto do portfólio vem aqui.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Esta seção é a próxima etapa da reconstrução. Por enquanto serve para
          mostrar o efeito: role para cima e para baixo e veja o código reagir
          atrás do hero e mergulhar por baixo desta borda iluminada.
        </p>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <MatrixRain />
      <Hero />
      <NextSection />
    </>
  )
}
