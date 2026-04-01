'use client'

import { keyboardLayout, type KeyData, type Finger, fingerColors } from '@/lib/keyboard-data'
import { cn } from '@/lib/utils'

interface KeyboardProps {
  activeKey?: string
  targetKey?: string
  pressedKeys: Set<string>
  showFingerColors?: boolean
  highlightFinger?: Finger
  keyState?: Record<string, 'correct' | 'wrong' | 'neutral'>
}

const KEY_SIZE = 48 // Base key size in pixels
const KEY_GAP = 4

function KeyCap({
  keyData,
  isActive,
  isTarget,
  isPressed,
  showFingerColors,
  state,
}: {
  keyData: KeyData
  isActive: boolean
  isTarget: boolean
  isPressed: boolean
  showFingerColors: boolean
  state?: 'correct' | 'wrong' | 'neutral'
}) {
  const width = (keyData.width || 1) * KEY_SIZE + (keyData.width ? (keyData.width - 1) * KEY_GAP : 0)
  const fingerColor = fingerColors[keyData.finger]
  
  const getBgColor = () => {
    if (state === 'correct') return 'bg-green-500/80'
    if (state === 'wrong') return 'bg-red-500/80'
    if (isPressed) return 'bg-primary/80'
    if (isTarget) return 'ring-2 ring-primary ring-offset-1 ring-offset-background'
    if (showFingerColors) return ''
    return 'bg-secondary'
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-md transition-all duration-75',
        'text-xs font-mono select-none',
        getBgColor(),
        isPressed && 'scale-95 shadow-inner',
        !isPressed && 'shadow-md',
        isTarget && !isPressed && 'animate-pulse',
      )}
      style={{
        width,
        height: KEY_SIZE,
        backgroundColor: showFingerColors && !state && !isPressed ? `${fingerColor}20` : undefined,
        borderBottom: showFingerColors ? `3px solid ${fingerColor}` : undefined,
      }}
    >
      <span className={cn(
        'text-foreground/90',
        keyData.label.length > 3 && 'text-[10px]',
        isTarget && 'font-bold text-primary',
      )}>
        {keyData.label.toUpperCase()}
      </span>
      {keyData.shiftLabel && (
        <span className="absolute top-1 left-1.5 text-[8px] text-muted-foreground">
          {keyData.shiftLabel}
        </span>
      )}
    </div>
  )
}

export function Keyboard({
  activeKey,
  targetKey,
  pressedKeys,
  showFingerColors = true,
  keyState = {},
}: KeyboardProps) {
  // Skip function row for cleaner look
  const mainRows = keyboardLayout.slice(1)
  
  return (
    <div className="flex flex-col items-center gap-1 p-4 bg-card/50 rounded-xl backdrop-blur-sm border border-border/50">
      {/* Keyboard body styled like MacBook */}
      <div className="bg-gradient-to-b from-secondary/80 to-secondary rounded-lg p-3 shadow-xl">
        {mainRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 mb-1 last:mb-0">
            {row.map((keyData) => (
              <KeyCap
                key={keyData.key}
                keyData={keyData}
                isActive={activeKey === keyData.key}
                isTarget={targetKey === keyData.key}
                isPressed={pressedKeys.has(keyData.key)}
                showFingerColors={showFingerColors}
                state={keyState[keyData.key]}
              />
            ))}
          </div>
        ))}
      </div>
      
      {/* Finger color legend */}
      {showFingerColors && (
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          {(['pinky', 'ring', 'middle', 'index', 'thumb'] as const).map((finger) => (
            <div key={finger} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: fingerColors[finger] }}
              />
              <span className="capitalize">{finger}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
