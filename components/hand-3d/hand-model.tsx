'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Finger, Hand } from '@/lib/keyboard-data'
import { fingerColors } from '@/lib/keyboard-data'

interface HandModelProps {
  hand: Hand
  activeFinger?: Finger
  isPressed?: boolean
}

// Finger segment with smooth rounded shape
function FingerSegment({
  length,
  radius,
  color,
  isActive,
  glowIntensity = 0,
}: {
  length: number
  radius: number
  color: string
  isActive: boolean
  glowIntensity: number
}) {
  return (
    <mesh castShadow receiveShadow>
      <capsuleGeometry args={[radius, length, 4, 12]} />
      <meshStandardMaterial
        color={isActive ? color : '#e8d5c4'}
        emissive={isActive ? color : '#000000'}
        emissiveIntensity={glowIntensity}
        roughness={0.65}
        metalness={0.05}
      />
    </mesh>
  )
}

// Complete finger with 3 phalanges in natural curved typing position
function Finger({
  name,
  basePosition,
  fingerSpread,
  lengths,
  radii,
  restCurve,
  isActive,
  isPressed,
  mirror,
}: {
  name: Finger
  basePosition: [number, number, number]
  fingerSpread: number
  lengths: [number, number, number]
  radii: [number, number, number]
  restCurve: [number, number, number]
  isActive: boolean
  isPressed: boolean
  mirror: boolean
}) {
  const seg1Ref = useRef<THREE.Group>(null)
  const seg2Ref = useRef<THREE.Group>(null)
  const seg3Ref = useRef<THREE.Group>(null)
  
  const color = fingerColors[name]
  const animProgress = useRef(0)
  
  useFrame((_, delta) => {
    // Animate finger pressing down
    const target = isActive && isPressed ? 1 : 0
    animProgress.current = THREE.MathUtils.lerp(animProgress.current, target, delta * 12)
    
    const press = animProgress.current * 0.4
    
    if (seg1Ref.current) seg1Ref.current.rotation.x = restCurve[0] + press * 0.3
    if (seg2Ref.current) seg2Ref.current.rotation.x = restCurve[1] + press * 0.5
    if (seg3Ref.current) seg3Ref.current.rotation.x = restCurve[2] + press * 0.3
  })
  
  const glowIntensity = isActive ? (isPressed ? 0.6 : 0.3) : 0
  const mirrorX = mirror ? -1 : 1
  
  return (
    <group
      position={[basePosition[0] * mirrorX, basePosition[1], basePosition[2]]}
      rotation={[0, 0, fingerSpread * mirrorX]}
    >
      {/* Proximal phalanx */}
      <group ref={seg1Ref} rotation={[restCurve[0], 0, 0]}>
        <mesh position={[0, lengths[0] / 2, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[radii[0], lengths[0], 4, 12]} />
          <meshStandardMaterial
            color={isActive ? color : '#e8d5c4'}
            emissive={isActive ? color : '#000000'}
            emissiveIntensity={glowIntensity}
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>
        
        {/* Middle phalanx */}
        <group ref={seg2Ref} position={[0, lengths[0], 0]} rotation={[restCurve[1], 0, 0]}>
          <mesh position={[0, lengths[1] / 2, 0]} castShadow receiveShadow>
            <capsuleGeometry args={[radii[1], lengths[1], 4, 12]} />
            <meshStandardMaterial
              color={isActive ? color : '#e8d5c4'}
              emissive={isActive ? color : '#000000'}
              emissiveIntensity={glowIntensity}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
          
          {/* Distal phalanx */}
          <group ref={seg3Ref} position={[0, lengths[1], 0]} rotation={[restCurve[2], 0, 0]}>
            <mesh position={[0, lengths[2] / 2, 0]} castShadow receiveShadow>
              <capsuleGeometry args={[radii[2], lengths[2], 4, 12]} />
              <meshStandardMaterial
                color={isActive ? color : '#e8d5c4'}
                emissive={isActive ? color : '#000000'}
                emissiveIntensity={glowIntensity}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

// Thumb with 2 segments in natural resting position
function Thumb({
  isActive,
  isPressed,
  mirror,
}: {
  isActive: boolean
  isPressed: boolean
  mirror: boolean
}) {
  const seg1Ref = useRef<THREE.Group>(null)
  const seg2Ref = useRef<THREE.Group>(null)
  
  const color = fingerColors.thumb
  const animProgress = useRef(0)
  const mirrorX = mirror ? -1 : 1
  
  useFrame((_, delta) => {
    const target = isActive && isPressed ? 1 : 0
    animProgress.current = THREE.MathUtils.lerp(animProgress.current, target, delta * 12)
    
    const press = animProgress.current * 0.3
    
    if (seg1Ref.current) seg1Ref.current.rotation.x = 0.2 + press
    if (seg2Ref.current) seg2Ref.current.rotation.x = 0.3 + press
  })
  
  const glowIntensity = isActive ? (isPressed ? 0.6 : 0.3) : 0
  
  return (
    <group
      position={[0.13 * mirrorX, 0.04, 0.03]}
      rotation={[0.6, mirrorX * 0.5, mirrorX * 0.7]}
    >
      {/* Metacarpal */}
      <group ref={seg1Ref} rotation={[0.2, 0, 0]}>
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.022, 0.06, 4, 12]} />
          <meshStandardMaterial
            color={isActive ? color : '#e8d5c4'}
            emissive={isActive ? color : '#000000'}
            emissiveIntensity={glowIntensity}
            roughness={0.65}
            metalness={0.05}
          />
        </mesh>
        
        {/* Distal */}
        <group ref={seg2Ref} position={[0, 0.08, 0]} rotation={[0.3, 0, 0]}>
          <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
            <capsuleGeometry args={[0.018, 0.045, 4, 12]} />
            <meshStandardMaterial
              color={isActive ? color : '#e8d5c4'}
              emissive={isActive ? color : '#000000'}
              emissiveIntensity={glowIntensity}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// Palm geometry
function Palm({ mirror }: { mirror: boolean }) {
  const mirrorX = mirror ? -1 : 1
  
  return (
    <group scale={[mirrorX, 1, 1]}>
      {/* Main palm body */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.14, 0.045]} />
        <meshStandardMaterial color="#e8d5c4" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Knuckles area - rounded top */}
      <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.04, 0.05]} />
        <meshStandardMaterial color="#e8d5c4" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Wrist */}
      <mesh position={[0, -0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.06, 0.085, 0.06, 12]} />
        <meshStandardMaterial color="#e8d5c4" roughness={0.7} metalness={0.05} />
      </mesh>
      
      {/* Thumb base mound */}
      <mesh position={[0.08, 0.03, 0.015]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#e8d5c4" roughness={0.7} metalness={0.05} />
      </mesh>
    </group>
  )
}

// Finger configurations with natural curved rest position
const fingerConfigs: Record<Finger, {
  position: [number, number, number]
  spread: number
  lengths: [number, number, number]
  radii: [number, number, number]
  restCurve: [number, number, number]
}> = {
  pinky: {
    position: [-0.075, 0.14, 0.01],
    spread: -0.12,
    lengths: [0.04, 0.028, 0.022],
    radii: [0.011, 0.009, 0.007],
    restCurve: [0.5, 0.6, 0.5], // Natural curve angles
  },
  ring: {
    position: [-0.028, 0.15, 0.01],
    spread: -0.04,
    lengths: [0.048, 0.035, 0.025],
    radii: [0.012, 0.01, 0.008],
    restCurve: [0.45, 0.55, 0.45],
  },
  middle: {
    position: [0.022, 0.155, 0.01],
    spread: 0,
    lengths: [0.052, 0.038, 0.028],
    radii: [0.013, 0.011, 0.009],
    restCurve: [0.4, 0.5, 0.4],
  },
  index: {
    position: [0.068, 0.145, 0.01],
    spread: 0.06,
    lengths: [0.046, 0.033, 0.024],
    radii: [0.012, 0.01, 0.008],
    restCurve: [0.45, 0.55, 0.45],
  },
  thumb: {
    position: [0, 0, 0], // Thumb handled separately
    spread: 0,
    lengths: [0, 0, 0],
    radii: [0, 0, 0],
    restCurve: [0, 0, 0],
  },
}

export function HandModel({ hand, activeFinger, isPressed = false }: HandModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mirror = hand === 'right'
  
  // Subtle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.6) * 0.003
      groupRef.current.position.y = breathe
    }
  })

  return (
    <group
      ref={groupRef}
      rotation={[-0.9, mirror ? 0.1 : -0.1, mirror ? 0.05 : -0.05]}
      scale={2}
    >
      <Palm mirror={mirror} />
      
      <Thumb
        isActive={activeFinger === 'thumb'}
        isPressed={isPressed}
        mirror={mirror}
      />
      
      {(Object.entries(fingerConfigs) as [Finger, typeof fingerConfigs.index][])
        .filter(([name]) => name !== 'thumb')
        .map(([name, config]) => (
          <Finger
            key={name}
            name={name}
            basePosition={config.position}
            fingerSpread={config.spread}
            lengths={config.lengths}
            radii={config.radii}
            restCurve={config.restCurve}
            isActive={activeFinger === name}
            isPressed={isPressed}
            mirror={mirror}
          />
        ))}
    </group>
  )
}
