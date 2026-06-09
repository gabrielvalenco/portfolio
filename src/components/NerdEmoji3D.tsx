import { Suspense, useEffect, useRef, useCallback, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider, BallCollider } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import { Box3, Vector3, Group, Plane, Raycaster, Vector2 } from 'three'

// ── Draggable physics emoji ────────────────────────────────────────────────────

const WALL_THICKNESS = 1.0
const AUTO_TORQUE = 0.25
const MAX_LIN_VEL = 14
const MAX_ANG_VEL = 16
const DRAG_STIFFNESS = 5
const DRAG_DAMPING_FACTOR = 0.15

function DraggableEmoji() {
  const { scene: originalScene } = useGLTF('/nerd_emoji_3d.glb')
  const clonedScene = useMemo(() => originalScene.clone(true), [originalScene])
  const groupRef = useRef<Group>(null)
  const bodyRef = useRef<RapierRigidBody>(null)
  const dragging = useRef(false)
  const { camera, gl } = useThree()
  const dragPlane = useRef(new Plane(new Vector3(0, 0, 1), 0))
  const pointer = useRef(new Vector2())
  const raycaster = useRef(new Raycaster())

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
    const body = bodyRef.current
    if (body) {
      // Fling in a random direction on click
      const angle = Math.random() * Math.PI * 2
      const force = 10 + Math.random() * 6
      body.setLinvel({ x: Math.cos(angle) * force, y: Math.sin(angle) * force, z: 0 }, true)
      body.setAngvel({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
      }, true)
    }
  }, [gl])

  useEffect(() => {
    const up = () => {
      dragging.current = false
      gl.domElement.style.cursor = 'grab'
    }
    window.addEventListener('pointerup', up)
    return () => window.removeEventListener('pointerup', up)
  }, [gl])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [gl])

  useFrame(() => {
    const body = bodyRef.current
    if (!body) return

    if (dragging.current) {
      raycaster.current.setFromCamera(pointer.current, camera)
      const target = new Vector3()
      raycaster.current.ray.intersectPlane(dragPlane.current, target)
      if (target) {
        const pos = body.translation()
        const vel = body.linvel()
        // Spring-like: stiffness * displacement - damping * velocity
        const fx = DRAG_STIFFNESS * (target.x - pos.x) - DRAG_DAMPING_FACTOR * vel.x
        const fy = DRAG_STIFFNESS * (target.y - pos.y) - DRAG_DAMPING_FACTOR * vel.y
        body.applyImpulse({ x: fx, y: fy, z: 0 }, true)
        body.applyTorqueImpulse({ x: fy * 0.03, y: -fx * 0.03, z: 0.005 }, true)
      }
    } else {
      body.applyTorqueImpulse(
        { x: AUTO_TORQUE * 0.012, y: AUTO_TORQUE * 0.016, z: AUTO_TORQUE * 0.004 },
        true,
      )
    }

    // Clamp velocities to prevent tunneling through walls
    const vel = body.linvel()
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z)
    if (speed > MAX_LIN_VEL) {
      const s = MAX_LIN_VEL / speed
      body.setLinvel({ x: vel.x * s, y: vel.y * s, z: vel.z * s }, true)
    }
    const avel = body.angvel()
    const aspeed = Math.sqrt(avel.x * avel.x + avel.y * avel.y + avel.z * avel.z)
    if (aspeed > MAX_ANG_VEL) {
      const s = MAX_ANG_VEL / aspeed
      body.setAngvel({ x: avel.x * s, y: avel.y * s, z: avel.z * s }, true)
    }
  })

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={[0, 0, 0]}
      gravityScale={0}
      linearDamping={1.0}
      angularDamping={0.8}
      ccd
    >
      <BallCollider args={[0.9]} restitution={0.45} friction={0.3} />
      <group
        ref={groupRef}
        onPointerDown={onPointerDown}
        onPointerOver={() => { gl.domElement.style.cursor = 'grab' }}
        onPointerOut={() => { if (!dragging.current) gl.domElement.style.cursor = 'default' }}
      >
        <primitive object={clonedScene} scale={2.2} />
      </group>
    </RigidBody>
  )
}

// ── Invisible walls ────────────────────────────────────────────────────────────

function Walls({ width, height }: { width: number; height: number }) {
  const hw = width / 2
  const hh = height / 2
  const t = WALL_THICKNESS
  const r = 0.5
  const f = 0.2
  return (
    <>
      {/* left   */}<CuboidCollider args={[t, hh + t, t + 1]} position={[-(hw + t), 0, 0]} restitution={r} friction={f} />
      {/* right  */}<CuboidCollider args={[t, hh + t, t + 1]} position={[hw + t, 0, 0]} restitution={r} friction={f} />
      {/* top    */}<CuboidCollider args={[hw + t, t, t + 1]} position={[0, hh + t, 0]} restitution={r} friction={f} />
      {/* bottom */}<CuboidCollider args={[hw + t, t, t + 1]} position={[0, -(hh + t), 0]} restitution={r} friction={f} />
      {/* front  */}<CuboidCollider args={[hw + t, hh + t, t]} position={[0, 0, 2]} restitution={r} friction={f} />
      {/* back   */}<CuboidCollider args={[hw + t, hh + t, t]} position={[0, 0, -2]} restitution={r} friction={f} />
    </>
  )
}


// ── Scene (reads frustum to size walls) ──────────────────────────────────────

const CAM_Z = 7
const FOV = 40

function Scene() {
  const { viewport } = useThree()
  const w = viewport.width
  const h = viewport.height
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#9eff00" />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#ffffff" />
      <Environment preset="city" />
      <Physics gravity={[0, 0, 0]}>
        <Walls width={w} height={h} />
        <Suspense fallback={null}>
          <DraggableEmoji />
        </Suspense>
      </Physics>
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
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, #1e2b1a 0%, #141e11 50%, #0d140a 100%)
          `,
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
          {/* Formulas */}
          <text x="60" y="55" fill="rgba(220,230,210,0.6)" stroke="none" style={{ fontSize: 15 }} transform="rotate(-2 60 55)">E = mc²</text>
          <text x="950" y="70" fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 13 }} transform="rotate(1.5 950 70)">∫ f(x)dx</text>
          <text x="180" y="360" fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 12 }} transform="rotate(-1 180 360)">Σ(n²) = n(n+1)(2n+1)/6</text>
          <text x="800" y="340" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 13 }} transform="rotate(2 800 340)">{'{ code }'}</text>
          <text x="1050" y="180" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-3 1050 180)">π ≈ 3.14159</text>
          <text x="70" y="200" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(1 70 200)">{'f(x) => x * 2'}</text>
          <text x="400" y="45" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-1.5 400 45)">npm install</text>
          <text x="700" y="380" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1 700 380)">{'<Component />'}</text>
          <text x="550" y="90" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(-2 550 90)">git push origin main</text>
          <text x="1020" y="310" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(2.5 1020 310)">O(n log n)</text>
          {/* More math */}
          <text x="320" y="230" fill="rgba(220,230,210,0.5)" stroke="none" style={{ fontSize: 14 }} transform="rotate(-1 320 230)">Δx = v₀t + ½at²</text>
          <text x="650" y="155" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(2 650 155)">√(a² + b²) = c</text>
          <text x="50" y="310" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1.5 50 310)">lim x→∞</text>
          <text x="850" y="230" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 13 }} transform="rotate(-2 850 230)">∂f/∂x = 2x + 1</text>
          <text x="450" y="270" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1 450 270)">log₂(n) = 8</text>
          <text x="1050" y="120" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(-1.5 1050 120)">∞ × 0 ≠ 0</text>
          <text x="730" y="260" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 12 }} transform="rotate(-3 730 260)">Φ = 1.618...</text>
          <text x="160" y="130" fill="rgba(220,230,210,0.45)" stroke="none" style={{ fontSize: 12 }} transform="rotate(2 160 130)">{'x² + y² = r²'}</text>
          <text x="500" y="180" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(-2 500 180)">∇ × F = 0</text>
          <text x="920" y="370" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(1.5 920 370)">n! = n × (n-1)!</text>
          <text x="350" y="370" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(-1 350 370)">∫₀¹ x²dx = 1/3</text>
          <text x="1100" y="350" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(2 1100 350)">eⁱᵖ + 1 = 0</text>
          <text x="40" y="380" fill="rgba(220,230,210,0.3)" stroke="none" style={{ fontSize: 9 }} transform="rotate(1 40 380)">P(A|B) = P(B|A)·P(A)/P(B)</text>
          <text x="680" y="50" fill="rgba(220,230,210,0.4)" stroke="none" style={{ fontSize: 11 }} transform="rotate(-1 680 50)">Σᵢ₌₁ⁿ i = n(n+1)/2</text>
          <text x="200" y="55" fill="rgba(220,230,210,0.35)" stroke="none" style={{ fontSize: 10 }} transform="rotate(1.5 200 55)">sin²θ + cos²θ = 1</text>

          {/* Doodle arrows and shapes */}
          <path d="M310 100 Q330 80 350 95" strokeWidth="1" opacity="0.5" />
          <path d="M348 90 L350 95 L344 94" strokeWidth="1" opacity="0.5" />
          <circle cx="900" cy="130" r="18" strokeWidth="0.8" opacity="0.35" strokeDasharray="3 4" />
          <rect x="130" y="270" width="40" height="30" rx="3" strokeWidth="0.8" opacity="0.35" transform="rotate(-3 150 285)" />
          <path d="M750 50 L760 30 L770 50" strokeWidth="1" opacity="0.4" />
          <path d="M760 30 L760 70" strokeWidth="0.8" opacity="0.3" />
          {/* Squiggly underlines */}
          <path d="M60 65 Q70 70 80 65 Q90 60 100 65 Q110 70 120 65" strokeWidth="0.8" opacity="0.4" />
          <path d="M320 242 Q335 248 350 242 Q365 236 380 242 Q395 248 410 242" strokeWidth="0.7" opacity="0.35" />
          {/* Small stars */}
          <path d="M1100 100 L1103 110 L1113 110 L1105 116 L1108 126 L1100 120 L1092 126 L1095 116 L1087 110 L1097 110 Z" strokeWidth="0.7" opacity="0.3" />
          <path d="M580 320 L582 326 L588 326 L583 330 L585 336 L580 332 L575 336 L577 330 L572 326 L578 326 Z" strokeWidth="0.6" opacity="0.25" />
          {/* Brackets */}
          <text x="480" y="350" fill="rgba(220,230,210,0.3)" stroke="none" style={{ fontSize: 18 }}>{'{ }'}</text>
          <text x="280" y="150" fill="rgba(220,230,210,0.3)" stroke="none" style={{ fontSize: 16 }} transform="rotate(-4 280 150)">{'</>'}</text>
          {/* Lightbulb doodle */}
          <circle cx="1130" cy="250" r="10" strokeWidth="0.8" opacity="0.4" />
          <path d="M1125 260 L1135 260 M1126 264 L1134 264 M1128 268 L1132 268" strokeWidth="0.7" opacity="0.35" />
          <path d="M1130 238 L1130 232 M1120 242 L1116 238 M1140 242 L1144 238" strokeWidth="0.7" opacity="0.3" />
          {/* Graph axes doodle */}
          <path d="M80 150 L80 100 M80 150 L140 150" strokeWidth="0.9" opacity="0.3" />
          <path d="M85 140 Q100 110 120 130 Q135 145 140 125" strokeWidth="0.7" opacity="0.3" />
          {/* Infinity symbol */}
          <path d="M1000 260 Q1010 248 1020 260 Q1030 272 1040 260 Q1030 248 1020 260 Q1010 272 1000 260" strokeWidth="0.8" opacity="0.35" fill="none" />
          {/* Division / fraction line */}
          <line x1="850" y1="245" x2="920" y2="245" strokeWidth="0.8" opacity="0.3" />
          {/* Plus sign */}
          <path d="M430 115 L430 135 M420 125 L440 125" strokeWidth="0.9" opacity="0.3" />
          {/* Sigma doodle */}
          <path d="M610 200 L630 200 L618 215 L630 230 L610 230" strokeWidth="1" opacity="0.35" fill="none" />
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
