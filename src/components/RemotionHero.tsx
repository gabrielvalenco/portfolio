import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { Player } from '@remotion/player'

// ─── Token data ──────────────────────────────────────────────────────────────

interface TokenData {
  text:       string
  x:          number
  startY:     number
  endY:       number
  delay:      number
  maxOpacity: number
  size:       number
}

const TOKENS: TokenData[] = [
  { text: '{ }',     x:  8, startY: 78, endY: 20, delay:   0, maxOpacity: 0.5,  size: 18 },
  { text: '/>',      x: 20, startY: 85, endY: 28, delay:  25, maxOpacity: 0.45, size: 22 },
  { text: '()',      x: 75, startY: 80, endY: 22, delay:  50, maxOpacity: 0.48, size: 20 },
  { text: 'async',   x: 88, startY: 70, endY: 12, delay:  15, maxOpacity: 0.35, size: 14 },
  { text: '=>',      x: 35, startY: 90, endY: 40, delay:  65, maxOpacity: 0.52, size: 24 },
  { text: 'const',   x: 62, startY: 86, endY: 26, delay:  35, maxOpacity: 0.32, size: 14 },
  { text: '[ ]',     x: 48, startY: 82, endY: 24, delay:  80, maxOpacity: 0.42, size: 20 },
  { text: '.map()',  x: 92, startY: 65, endY:  8, delay:  55, maxOpacity: 0.30, size: 13 },
  { text: '<>',      x:  5, startY: 62, endY:  7, delay:  95, maxOpacity: 0.42, size: 22 },
  { text: 'return',  x: 72, startY: 95, endY: 38, delay: 110, maxOpacity: 0.30, size: 13 },
  { text: '...',     x: 42, startY: 74, endY: 16, delay: 135, maxOpacity: 0.46, size: 28 },
  { text: 'await',   x: 57, startY: 93, endY: 32, delay: 165, maxOpacity: 0.32, size: 14 },
  { text: '===',     x: 15, startY: 90, endY: 35, delay: 200, maxOpacity: 0.38, size: 16 },
  { text: 'fn()',    x: 82, startY: 88, endY: 30, delay: 175, maxOpacity: 0.36, size: 15 },
]

const LOOP = 240  // 8 s @ 30 fps

// ─── Single floating token ────────────────────────────────────────────────────

function FloatingToken({ text, x, startY, endY, delay, maxOpacity, size }: TokenData) {
  const frame   = useCurrentFrame()
  const looped  = (frame + delay) % LOOP
  const p       = looped / LOOP

  const opacity = interpolate(
    p,
    [0, 0.12, 0.4, 0.68, 0.9, 1],
    [0, maxOpacity, maxOpacity, maxOpacity * 0.65, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  )
  const currentY = interpolate(p, [0, 1], [startY, endY])
  const drift    = interpolate(p, [0, 0.4, 1], [0, 5, -3])

  return (
    <div
      style={{
        position:      'absolute',
        left:          `${x + drift * 0.08}%`,
        top:           `${currentY}%`,
        opacity,
        color:         '#8B5CF6',
        fontSize:      size,
        fontFamily:    '"JetBrains Mono","Fira Code","Cascadia Code",monospace',
        fontWeight:    700,
        letterSpacing: '-0.03em',
        userSelect:    'none',
        pointerEvents: 'none',
        filter:        'drop-shadow(0 0 8px rgba(139,92,246,0.45))',
        whiteSpace:    'nowrap',
      }}
    >
      {text}
    </div>
  )
}

// ─── Composition ─────────────────────────────────────────────────────────────

function HeroBg() {
  return (
    <AbsoluteFill style={{ background: 'transparent', overflow: 'hidden' }}>
      {TOKENS.map((t, i) => <FloatingToken key={i} {...t} />)}
    </AbsoluteFill>
  )
}

// ─── Exported wrapper ─────────────────────────────────────────────────────────

export default function RemotionHero() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <Player
        component={HeroBg}
        durationInFrames={LOOP}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        style={{ width: '100%', height: '100%' }}
        loop
        autoPlay
        clickToPlay={false}
        showPosterWhenUnplayed={false}
        renderLoading={() => null}
      />
    </div>
  )
}
