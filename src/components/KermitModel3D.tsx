import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

function Model(props: any) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/vibe_kermit.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

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
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={(nodes as any)._rootJoint} />
        <skinnedMesh
          name="Object_6"
          geometry={(nodes as any).Object_6.geometry}
          material={(materials as any).eyemat}
          skeleton={(nodes as any).Object_6.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_7"
          geometry={(nodes as any).Object_7.geometry}
          material={(materials as any).eyemat}
          skeleton={(nodes as any).Object_7.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_9"
          geometry={(nodes as any).Object_9.geometry}
          material={(materials as any).bodymat}
          skeleton={(nodes as any).Object_9.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_10"
          geometry={(nodes as any).Object_10.geometry}
          material={(materials as any).bodymat}
          skeleton={(nodes as any).Object_10.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_11"
          geometry={(nodes as any).Object_11.geometry}
          material={(materials as any).bodymat}
          skeleton={(nodes as any).Object_11.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_12"
          geometry={(nodes as any).Object_12.geometry}
          material={(materials as any).bodymat}
          skeleton={(nodes as any).Object_12.skeleton}
          scale={0.018}
        />
        <skinnedMesh
          name="Object_14"
          geometry={(nodes as any).Object_14.geometry}
          material={(materials as any).bodymat}
          skeleton={(nodes as any).Object_14.skeleton}
          scale={0.018}
        />
      </group>
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
          <Model scale={1.2} position={[0, -1.2, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
