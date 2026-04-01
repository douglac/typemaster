'use client'

import React, { useState } from 'react'
import { useTypingGame, type GameMode } from '@/hooks/use-typing-game'
import { Keyboard } from '@/components/keyboard/keyboard'
import { HandScene } from '@/components/hand-3d/hand-scene'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { RotateCcw, ChevronRight, Keyboard as KeyboardIcon, Gamepad2, GraduationCap, Pencil, Check, X, Trophy, HelpCircle } from 'lucide-react'
import { SpeedComparison } from './speed-comparison'
import { Tutorial } from './tutorial'

function ModeSelector({
  mode,
  onModeChange,
}: {
  mode: GameMode
  onModeChange: (mode: GameMode) => void
}) {
  const modes: { value: GameMode; label: string; icon: typeof GraduationCap; description: string }[] = [
    { value: 'teacher', label: 'Teacher', icon: GraduationCap, description: 'Watch and learn' },
    { value: 'practice', label: 'Practice', icon: KeyboardIcon, description: 'Type at your pace' },
    { value: 'game', label: 'Challenge', icon: Gamepad2, description: 'Test your speed' },
  ]

  return (
    <div className="flex gap-2">
      {modes.map(({ value, label, icon: Icon, description }) => (
        <button
          key={value}
          onClick={() => onModeChange(value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
            'border border-border/50 hover:border-primary/50',
            mode === value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card/50 text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon className="w-4 h-4" />
          <div className="text-left">
            <div className="text-sm font-medium">{label}</div>
            <div className="text-[10px] opacity-70">{description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

function TextEditor({
  text,
  onSave,
  onCancel,
}: {
  text: string
  onSave: (newText: string) => void
  onCancel: () => void
}) {
  const [editText, setEditText] = useState(text)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed.length > 0) {
      onSave(trimmed.toLowerCase())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="relative p-4 bg-card/30 rounded-xl border border-primary/50">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Pencil className="w-4 h-4" />
          <span>Digite sua frase personalizada:</span>
        </div>
        <textarea
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-4 bg-background/50 rounded-lg border border-border/50 font-mono text-lg resize-none focus:outline-none focus:border-primary/50 min-h-[100px]"
          placeholder="Digite aqui a frase que voce quer praticar..."
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Pressione Enter para salvar ou Esc para cancelar
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="gap-1"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-1"
            >
              <Check className="w-4 h-4" />
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TextDisplay({
  text,
  currentIndex,
  isComplete,
  onEditClick,
}: {
  text: string
  currentIndex: number
  isComplete: boolean
  onEditClick: () => void
}) {
  return (
    <div className="relative p-6 bg-card/30 rounded-xl border border-border/30 font-mono text-lg leading-relaxed group">
      <button
        onClick={onEditClick}
        className="absolute top-3 right-3 p-2 rounded-lg bg-background/50 border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background hover:border-primary/50"
        title="Editar frase"
      >
        <Pencil className="w-4 h-4 text-muted-foreground" />
      </button>
      
      {text.split('').map((char, index) => {
        const isPast = index < currentIndex
        const isCurrent = index === currentIndex
        const isFuture = index > currentIndex

        return (
          <span
            key={index}
            className={cn(
              'transition-colors duration-100',
              isPast && 'text-primary',
              isCurrent && 'bg-primary/20 text-foreground border-b-2 border-primary',
              isFuture && 'text-muted-foreground/50',
              char === ' ' && isCurrent && 'bg-primary/10 px-1',
            )}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
      
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">Complete!</div>
            <div className="text-muted-foreground">Otimo trabalho!</div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatsDisplay({
  wpm,
  accuracy,
  elapsedTime,
  correctKeys,
  wrongKeys,
}: {
  wpm: number
  accuracy: number
  elapsedTime: number
  correctKeys: number
  wrongKeys: number
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex gap-4">
      <Card className="flex-1 p-4 bg-card/50 border-border/30">
        <div className="text-3xl font-bold text-primary">{wpm}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">WPM</div>
      </Card>
      <Card className="flex-1 p-4 bg-card/50 border-border/30">
        <div className="text-3xl font-bold text-foreground">{accuracy}%</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</div>
      </Card>
      <Card className="flex-1 p-4 bg-card/50 border-border/30">
        <div className="text-3xl font-bold text-muted-foreground">{formatTime(elapsedTime)}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Time</div>
      </Card>
      <Card className="flex-1 p-4 bg-card/50 border-border/30">
        <div className="flex gap-2 text-2xl font-bold">
          <span className="text-green-500">{correctKeys}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-red-400">{wrongKeys}</span>
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Correct/Wrong</div>
      </Card>
    </div>
  )
}

function FingerHint({
  finger,
  hand,
  keyLabel,
}: {
  finger?: string
  hand?: string
  keyLabel?: string
}) {
  if (!finger || !hand) return null

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card/30 rounded-lg border border-border/30">
      <div className="text-sm text-muted-foreground">
        Press <span className="text-primary font-bold mx-1">{keyLabel}</span> with your
      </div>
      <div className="flex items-center gap-2">
        <span className="text-foreground font-medium capitalize">{hand}</span>
        <span className="text-primary font-medium capitalize">{finger}</span>
      </div>
    </div>
  )
}

export function TypingGame() {
  const [mode, setMode] = useState<GameMode>('practice')
  const [showFingerColors, setShowFingerColors] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  
  const {
    currentText,
    currentIndex,
    currentChar,
    pressedKeys,
    keyStates,
    stats,
    isComplete,
    targetKeyCode,
    teacherKeyData,
    reset,
    nextText,
    setCustomText,
  } = useTypingGame({ mode })

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode)
    reset()
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveText = (newText: string) => {
    setCustomText(newText)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <>
    {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Type Master</h1>
          <p className="text-sm text-muted-foreground">Aprenda a digitar corretamente com guia visual</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTutorial(true)}
            className="gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Tutorial
          </Button>
          <ModeSelector mode={mode} onModeChange={handleModeChange} />
        </div>
      </div>

      {/* Stats - only for practice mode */}
      {mode === 'practice' && (
        <StatsDisplay
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          elapsedTime={stats.elapsedTime}
          correctKeys={stats.correctKeys}
          wrongKeys={stats.wrongKeys}
        />
      )}

      {/* Challenge Mode Header */}
      {mode === 'game' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/20">
          <Trophy className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">Modo Desafio</div>
            <div className="text-xs text-muted-foreground">
              Digite a frase completa para ver sua comparacao com outros programadores
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.wpm}</div>
              <div className="text-[10px] text-muted-foreground uppercase">WPM</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{stats.accuracy}%</div>
              <div className="text-[10px] text-muted-foreground uppercase">Precisao</div>
            </div>
          </div>
        </div>
      )}

      {/* Text to type or editor */}
      {isEditing ? (
        <TextEditor
          text={currentText}
          onSave={handleSaveText}
          onCancel={handleCancelEdit}
        />
      ) : (
        <TextDisplay
          text={currentText}
          currentIndex={currentIndex}
          isComplete={isComplete}
          onEditClick={handleEditClick}
        />
      )}

      {/* Finger hint */}
      {!isEditing && (
        <FingerHint
          finger={teacherKeyData?.finger}
          hand={teacherKeyData?.hand}
          keyLabel={currentChar.toUpperCase() || 'SPACE'}
        />
      )}

      {/* 3D Hands */}
      {!isEditing && (
        <HandScene
          activeHand={teacherKeyData?.hand}
          activeFinger={teacherKeyData?.finger}
          isPressed={pressedKeys.size > 0}
          showBothHands={true}
        />
      )}

      {/* Keyboard */}
      {!isEditing && (
        <Keyboard
          targetKey={targetKeyCode}
          pressedKeys={pressedKeys}
          showFingerColors={showFingerColors}
          keyState={keyStates}
        />
      )}

      {/* Speed Comparison - Challenge Mode */}
      {mode === 'game' && (stats.totalKeys > 0 || isComplete) && (
        <SpeedComparison
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          isComplete={isComplete}
        />
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => reset()}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextText}
            className="gap-2"
          >
            Proxima Frase
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditClick}
            className="gap-2"
          >
            <Pencil className="w-4 h-4" />
            Editar Frase
          </Button>
        </div>
        
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={showFingerColors}
            onChange={(e) => setShowFingerColors(e.target.checked)}
            className="rounded border-border"
          />
          Mostrar zonas dos dedos
        </label>
      </div>
    </div>
      </>
    )
}
