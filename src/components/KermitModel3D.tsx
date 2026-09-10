import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { Box3, Vector3, Group } from 'three'

const TARGET_SIZE = 2.2

function Model() {
  const { scene: originalScene } = useGLTF('/vibe_kermit.glb')
  const clonedScene = useMemo(() => {
    const clone = originalScene.clone(true)
    const box = new Box3().setFromObject(clone)
    const center = new Vector3()
    box.getCenter(center)
    clone.position.sub(center)

    const size = new Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = maxDim ? TARGET_SIZE / maxDim : 1
    clone.scale.setScalar(scale)
    return clone
  }, [originalScene])

  const groupRef = useRef<Group>(null)
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/vibe_kermit.glb')

export default function KermitModel3D() {
  return (
    <div
      className="terminal-panel corner-brackets relative w-full overflow-hidden"
      style={{ height: '16rem' }}
    >
      <span className="cb-tl" />
      <span className="cb-tr" />
      <span className="cb-bl" />
      <span className="cb-br" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#9eff00" />
        <directionalLight position={[-5, -2, -3]} intensity={0.4} color="#ffffff" />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}
