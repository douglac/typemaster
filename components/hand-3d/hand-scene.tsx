'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { HandModel } from './hand-model'
import type { Finger, Hand } from '@/lib/keyboard-data'

interface HandSceneProps {
  activeHand?: Hand
  activeFinger?: Finger
  isPressed?: boolean
  showBothHands?: boolean
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-3, 5, 2]}
        intensity={0.4}
        color="#a5f3fc"
      />
      <pointLight position={[0, 3, 5]} intensity={0.3} color="#4ade80" />
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.3, 0.1, 0.2]} />
      <meshBasicMaterial color="#4ade80" wireframe />
    </mesh>
  )
}

export function HandScene({
  activeHand = 'left',
  activeFinger,
  isPressed = false,
  showBothHands = true,
}: HandSceneProps) {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-b from-muted/30 to-background border border-border/50">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0.5, 1.5]} fov={45} />
        
        <color attach="background" args={['#0a0a0a']} />
        
        <Lighting />
        
        <Suspense fallback={<LoadingFallback />}>
          {showBothHands ? (
            <>
              {/* Left hand */}
              <group position={[-0.35, -0.1, 0]}>
                <HandModel
                  hand="left"
                  activeFinger={activeHand === 'left' ? activeFinger : undefined}
                  isPressed={isPressed && activeHand === 'left'}
                />
              </group>
              
              {/* Right hand */}
              <group position={[0.35, -0.1, 0]}>
                <HandModel
                  hand="right"
                  activeFinger={activeHand === 'right' ? activeFinger : undefined}
                  isPressed={isPressed && activeHand === 'right'}
                />
              </group>
            </>
          ) : (
            <group position={[0, -0.1, 0]}>
              <HandModel
                hand={activeHand}
                activeFinger={activeFinger}
                isPressed={isPressed}
              />
            </group>
          )}
        </Suspense>
        
        <ContactShadows
          position={[0, -0.35, 0]}
          opacity={0.5}
          scale={3}
          blur={2}
          far={1.5}
        />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={0.8}
          maxDistance={3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
