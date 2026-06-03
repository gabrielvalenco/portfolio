import { Suspense, useMemo, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Float, OrbitControls } from '@react-three/drei'
import { Box3, Vector3, Group } from 'three'

function Model() {
  const { scene } = useGLTF('/nerd_emoji_3d.glb')
  const ref = useRef<Group>(null)

  useEffect(() => {
    if (!ref.current) return
    const box = new Box3().setFromObject(ref.current)
    const center = new Vector3()
    box.getCenter(center)
    ref.current.position.sub(center)
  }, [scene])

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={ref}>
        <primitive object={scene} scale={2.2} />
      </group>
    </Float>
  )
}

const COLORS = [
  '#9eff00', '#7dcc00', '#b8ff4d', '#5aff5a', '#00ffaa',
  '#ccff33', '#39ff14', '#a3ff4f', '#00e676', '#76ff03',
  '#64dd17', '#1de9b6', '#c6ff00', '#69ff47', '#00ff8c',
]

const VB = 560
const HALF = VB / 2

function HalftoneBg() {
  const dots = useMemo(() => {
    const spacing = 10
    const cols = Math.floor(VB / spacing)
    const rows = Math.floor(VB / spacing)
    const maxDist = HALF * 0.9

    const result: { x: number; y: number; r: number; color: string; opacity: number }[] = []

    const prng = (n: number) => {
      const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
      return s - Math.floor(s)
    }

    let idx = 0
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const bx = col * spacing + spacing / 2
        const by = row * spacing + spacing / 2

        const jx = (prng(idx) - 0.5) * spacing * 0.5
        const jy = (prng(idx + 0.5) - 0.5) * spacing * 0.5
        const x = bx + jx
        const y = by + jy

        const dist = Math.sqrt((x - HALF) ** 2 + (y - HALF) ** 2)
        const norm = 1 - Math.min(dist / maxDist, 1)

        const noise = prng(idx * 3.7)
        const density = norm * norm * (0.6 + noise * 0.4)

        if (density < 0.07) { idx++; continue }

        const r = Math.max(0.8, density * spacing * 0.62 * (0.65 + prng(idx * 1.3) * 0.7))
        const colorIdx = Math.floor(prng(idx * 7.3) * COLORS.length)
        const opacity = 0.28 + density * 0.62

        result.push({ x, y, r, color: COLORS[colorIdx], opacity })
        idx++
      }
    }
    return result
  }, [])

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      aria-hidden
      className="pointer-events-none select-none"
      style={{
        position: 'absolute',
        width: '320%',
        height: '140%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(0.4px)',
      }}
    >
      <defs>
        <radialGradient id="htFade" cx="50%" cy="50%" r="50%">
          <stop offset="20%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="htMask">
          <rect width={VB} height={VB} fill="url(#htFade)" />
        </mask>
      </defs>
      <g mask="url(#htMask)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={d.opacity} />
        ))}
      </g>
    </svg>
  )
}

export default function NerdEmoji3D() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80" style={{ overflow: 'visible' }}>
        <HalftoneBg />
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#9eff00" />
            <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#ffffff" />
            <Environment preset="city" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minDistance={3}
              maxDistance={9}
              autoRotate
              autoRotateSpeed={1.2}
            />
            <Suspense fallback={null}>
              <Model />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  )
}
