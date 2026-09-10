import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import { Box3, Vector3, Group } from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'

const TARGET_HEIGHT = 3.2

function Model() {
  const { scene: originalScene, animations } = useGLTF('/vibe_kermit.glb')
  const clonedScene = useMemo(
    () => cloneSkeleton(originalScene),
    [originalScene],
  )
  const groupRef = useRef<Group>(null)
  const { actions } = useAnimations(animations, groupRef)

  useLayoutEffect(() => {
    const box = new Box3().setFromObject(clonedScene)
    const center = new Vector3()
    box.getCenter(center)
    clonedScene.position.sub(center)

    const size = new Vector3()
    box.getSize(size)
    const height = size.y
    const scale = height ? TARGET_HEIGHT / height : 1
    clonedScene.scale.setScalar(scale)
    // Lower a bit to leave headroom for the dance animation
    clonedScene.position.y -= 0.25
  }, [clonedScene])

  useEffect(() => {
    const first = Object.values(actions)[0]
    if (first) {
      first.reset().fadeIn(0.5).play()
    }
    return () => {
      if (first) first.fadeOut(0.5)
    }
  }, [actions])

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/vibe_kermit.glb')

export default function KermitModel3D() {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  )
}
