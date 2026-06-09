import { Suspense, useEffect, useRef, useCallback, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { Box3, Vector3, Group, Plane, Raycaster, Vector2, Euler } from 'three'

// ── Manual physics constants ───────────────────────────────────────────────────

const RESTITUTION   = 0.52   // bounciness on wall hit
const LINEAR_DAMP   = 0.012  // velocity decay per frame (fraction)
const ANGULAR_DAMP  = 0.018
const AUTO_TORQUE_X = 0.006
const AUTO_TORQUE_Y = 0.008
const AUTO_TORQUE_Z = 0.003
const MAX_LIN_VEL   = 20
const MAX_ANG_VEL   = 28
const DRAG_K        = 0.38   // spring stiffness toward drag target
const DRAG_D        = 0.60   // drag damping
const RADIUS        = 0.9    // collision sphere radius (world units)

// ── Draggable emoji with manual physics ───────────────────────────────────────

function DraggableEmoji() {
  const { scene: originalScene } = useGLTF('/nerd_emoji_3d.glb')
  const clonedScene = useMemo(() => originalScene.clone(true), [originalScene])
  const groupRef    = useRef<Group>(null)
  const dragging    = useRef(false)
  const { camera, gl, viewport } = useThree()

  const pos  = useRef(new Vector3(0, 0, 0))
  const vel  = useRef(new Vector3(0.08, 0.12, 0))
  const rot  = useRef(new Euler(0, 0, 0))
  const avel = useRef(new Vector3(0.01, 0.015, 0.005))

  const dragPlane = useRef(new Plane(new Vector3(0, 0, 1), 0))
  const pointer   = useRef(new Vector2())
  const raycaster = useRef(new Raycaster())
  const dragTarget = useRef(new Vector3())

  useEffect(() => {
    if (!groupRef.current) return
    const box = new Box3().setFromObject(groupRef.current)
    const center = new Vector3()
    box.getCenter(center)
    groupRef.current.position.sub(center)
  }, [clonedScene])

  const onPointerDown = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    dragging.current = true
    gl.domElement.style.cursor = 'grabbing'
    const angle = Math.random() * Math.PI * 2
    const force = 14 + Math.random() * 8
    vel.current.set(Math.cos(angle) * force, Math.sin(angle) * force, 0)
    avel.current.set(
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.7,
      (Math.random() - 0.5) * 0.35,
    )
  }, [gl])

  useEffect(() => {
    const up = () => { dragging.current = false; gl.domElement.style.cursor = 'grab' }
    window.addEventListener('pointerup', up)
    return () => window.removeEventListener('pointerup', up)
  }, [gl])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointer.current.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      pointer.current.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [gl])

  useFrame((_, dt) => {
    const group = groupRef.current
    if (!group) return
    const p = pos.current
    const v = vel.current
    const av = avel.current

    if (dragging.current) {
      raycaster.current.setFromCamera(pointer.current, camera)
      raycaster.current.ray.intersectPlane(dragPlane.current, dragTarget.current)
      const dx = dragTarget.current.x - p.x
      const dy = dragTarget.current.y - p.y
      v.x += dx * DRAG_K - v.x * (1 - DRAG_D)
      v.y += dy * DRAG_K - v.y * (1 - DRAG_D)
      av.z += -dx * 0.004
    } else {
      av.x += AUTO_TORQUE_X
      av.y += AUTO_TORQUE_Y
      av.z += AUTO_TORQUE_Z
    }

    const step = Math.min(dt, 0.05)
    p.x += v.x * step
    p.y += v.y * step

    v.multiplyScalar(1 - LINEAR_DAMP)
    av.multiplyScalar(1 - ANGULAR_DAMP)

    const hw = viewport.width  / 2 - RADIUS
    const hh = viewport.height / 2 - RADIUS

    if (p.x >  hw) { p.x =  hw; v.x = -Math.abs(v.x) * RESTITUTION }
    if (p.x < -hw) { p.x = -hw; v.x =  Math.abs(v.x) * RESTITUTION }
    if (p.y >  hh) { p.y =  hh; v.y = -Math.abs(v.y) * RESTITUTION }
    if (p.y < -hh) { p.y = -hh; v.y =  Math.abs(v.y) * RESTITUTION }

    const linSpeed = Math.sqrt(v.x * v.x + v.y * v.y)
    if (linSpeed > MAX_LIN_VEL) { const s = MAX_LIN_VEL / linSpeed; v.x *= s; v.y *= s }
    const angSpeed = av.length()
    if (angSpeed > MAX_ANG_VEL) av.multiplyScalar(MAX_ANG_VEL / angSpeed)

    rot.current.x += av.x * step
    rot.current.y += av.y * step
    rot.current.z += av.z * step

    group.position.copy(p)
    group.rotation.copy(rot.current)
  })

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerOver={() => { gl.domElement.style.cursor = 'grab' }}
      onPointerOut={() => { if (!dragging.current) gl.domElement.style.cursor = 'default' }}
    >
      <primitive object={clonedScene} scale={2.2} />
    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────

const CAM_Z = 7
const FOV   = 40

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#9eff00" />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#ffffff" />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <DraggableEmoji />
      </Suspense>
    </>
  )
}

export default function NerdEmoji3D() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '38vh', minHeight: 260, background: '#1a2318' }}>
      {/* ── Chalkboard texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 50%, #1e2b1a 0%, #141e11 50%, #0d140a 100%)`,
        }}
      />
      {/* ── Chalk dust noise ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* ── Chalk scribbles SVG ── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full select-none"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.18 }}
      >
        <g fill="none" stroke="rgba(220,230,210,0.7)" strokeWidth="1.2" strokeLinecap="round" fontFamily="'Courier New',monospace" fontSize="14">
          <text x="60"  y="55"  fill="rgba(220,230,210,0.6)" stroke="none" style={{ fontSize: 15 }} transform="rotate(-2 60 55)">E = mc²</text>
          <text x="950" y="70"  fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 13 }} transform="rotate(1.5 950 70)">∫ f(x)dx</text>
          <text x="180" y="360" fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 12 }} transform="rotate(-1 180 360)">Σ(n²) = n(n+1)(2n+1)/6</text>
          <text x="800" y="340" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 13 }} transform="rotate(2 800 340)">{'{ code }'}</text>
          <text x="1050" y="180" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-3 1050 180)">π ≈ 3.14159</text>
          <text x="70"  y="200" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(1 70 200)">{'f(x) => x * 2'}</text>
          <text x="400" y="45"  fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-1.5 400 45)">npm install</text>
          <text x="700" y="380" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1 700 380)">{'<Component />'}</text>
          <text x="550" y="90"  fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(-2 550 90)">git push origin main</text>
          <text x="1020" y="310" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(2.5 1020 310)">O(n log n)</text>
          <text x="320" y="230" fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 14 }} transform="rotate(-1 320 230)">Δx = v₀t + ½at²</text>
          <text x="650" y="155" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(2 650 155)">√(a² + b²) = c</text>
          <text x="50"  y="310" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1.5 50 310)">lim x→∞</text>
          <text x="850" y="230" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 13 }} transform="rotate(-2 850 230)">∂f/∂x = 2x + 1</text>
          <text x="450" y="270" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1 450 270)">log₂(n) = 8</text>
          <text x="730" y="260" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 12 }} transform="rotate(-3 730 260)">Φ = 1.618...</text>
          <text x="160" y="130" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(2 160 130)">{'x² + y² = r²'}</text>
          <text x="920" y="370" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1.5 920 370)">n! = n × (n-1)!</text>
          <text x="1100" y="350" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(2 1100 350)">eⁱᵖ + 1 = 0</text>
          <text x="680" y="50"  fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-1 680 50)">Σᵢ₌₁ⁿ i = n(n+1)/2</text>
          <text x="200" y="55"  fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(1.5 200 55)">sin²θ + cos²θ = 1</text>
          <path d="M310 100 Q330 80 350 95" strokeWidth="1" opacity="0.5" />
          <path d="M348 90 L350 95 L344 94" strokeWidth="1" opacity="0.5" />
          <circle cx="900" cy="130" r="18" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 4" />
          <path d="M60 65 Q70 70 80 65 Q90 60 100 65 Q110 70 120 65" strokeWidth="0.8" opacity="0.4" />
          <path d="M610 200 L630 200 L618 215 L630 230 L610 230" strokeWidth="1" opacity="0.35" fill="none" />
          <path d="M80 150 L80 100 M80 150 L140 150" strokeWidth="0.9" opacity="0.3" />
          <path d="M85 140 Q100 110 120 130 Q135 145 140 125" strokeWidth="0.7" opacity="0.3" />
          <text x="280" y="150" fill="rgba(220,230,210,0.3)" stroke="none" style={{ fontSize: 16 }} transform="rotate(-4 280 150)">{'</>'}</text>
        </g>
      </svg>
      {/* ── Vignette ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, transparent 0%, rgba(13,20,10,0.6) 60%, rgba(13,20,10,0.95) 100%)',
        }}
      />
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, CAM_Z], fov: FOV }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>
    </div>
  )
}
