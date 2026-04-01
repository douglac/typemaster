'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, X, Hand, Keyboard, Target, Lightbulb } from 'lucide-react'
import { fingerColors, type Finger } from '@/lib/keyboard-data'
import { HandScene } from '@/components/hand-3d/hand-scene'

interface TutorialStep {
  id: string
  title: string
  content: React.ReactNode
  activeHand?: 'left' | 'right'
  activeFinger?: Finger
  highlightKeys?: string[]
}

const fingerNames: Record<Finger, string> = {
  pinky: 'Mindinho',
  ring: 'Anelar',
  middle: 'Medio',
  index: 'Indicador',
  thumb: 'Polegar',
}

function FingerBadge({ finger, hand }: { finger: Finger; hand: 'left' | 'right' }) {
  return (
    <span 
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
      style={{ backgroundColor: `${fingerColors[finger]}30`, color: fingerColors[finger] }}
    >
      {hand === 'left' ? 'E' : 'D'} - {fingerNames[finger]}
    </span>
  )
}

function KeyBadge({ label, finger }: { label: string; finger: Finger }) {
  return (
    <span 
      className="inline-flex items-center justify-center w-8 h-8 rounded font-mono text-sm font-bold border-2"
      style={{ 
        borderColor: fingerColors[finger],
        backgroundColor: `${fingerColors[finger]}20`,
        color: fingerColors[finger]
      }}
    >
      {label}
    </span>
  )
}

function HomeRowDiagram() {
  const leftHand = [
    { key: 'A', finger: 'pinky' as Finger },
    { key: 'S', finger: 'ring' as Finger },
    { key: 'D', finger: 'middle' as Finger },
    { key: 'F', finger: 'index' as Finger },
  ]
  
  const rightHand = [
    { key: 'J', finger: 'index' as Finger },
    { key: 'K', finger: 'middle' as Finger },
    { key: 'L', finger: 'ring' as Finger },
    { key: ';', finger: 'pinky' as Finger },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 bg-card/50 rounded-xl">
      <div className="text-center text-sm text-muted-foreground mb-2">
        Posicao Inicial (Home Row)
      </div>
      <div className="flex justify-center gap-8">
        {/* Left Hand */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground">Mao Esquerda</div>
          <div className="flex gap-1">
            {leftHand.map(({ key, finger }) => (
              <KeyBadge key={key} label={key} finger={finger} />
            ))}
          </div>
          <div className="flex gap-1 text-[10px]">
            {leftHand.map(({ key, finger }) => (
              <div key={key} className="w-8 text-center" style={{ color: fingerColors[finger] }}>
                {fingerNames[finger].slice(0, 3)}
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-muted-foreground">Mao Direita</div>
          <div className="flex gap-1">
            {rightHand.map(({ key, finger }) => (
              <KeyBadge key={key} label={key} finger={finger} />
            ))}
          </div>
          <div className="flex gap-1 text-[10px]">
            {rightHand.map(({ key, finger }) => (
              <div key={key} className="w-8 text-center" style={{ color: fingerColors[finger] }}>
                {fingerNames[finger].slice(0, 3)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground mt-2">
        As teclas <span className="font-bold text-foreground">F</span> e <span className="font-bold text-foreground">J</span> tem marcas tateis para ajudar a encontrar a posicao sem olhar
      </div>
    </div>
  )
}

function FingerColumnsDiagram() {
  const columns = [
    { finger: 'pinky' as Finger, hand: 'left', keys: ['`', '1', 'Q', 'A', 'Z'] },
    { finger: 'ring' as Finger, hand: 'left', keys: ['2', 'W', 'S', 'X'] },
    { finger: 'middle' as Finger, hand: 'left', keys: ['3', 'E', 'D', 'C'] },
    { finger: 'index' as Finger, hand: 'left', keys: ['4', '5', 'R', 'T', 'F', 'G', 'V', 'B'] },
    { finger: 'index' as Finger, hand: 'right', keys: ['6', '7', 'Y', 'U', 'H', 'J', 'N', 'M'] },
    { finger: 'middle' as Finger, hand: 'right', keys: ['8', 'I', 'K', ','] },
    { finger: 'ring' as Finger, hand: 'right', keys: ['9', 'O', 'L', '.'] },
    { finger: 'pinky' as Finger, hand: 'right', keys: ['0', '-', 'P', ';', '/'] },
  ]

  return (
    <div className="flex flex-col gap-3 p-4 bg-card/50 rounded-xl">
      <div className="text-center text-sm text-muted-foreground">
        Cada dedo cuida de uma coluna vertical de teclas
      </div>
      <div className="flex justify-center gap-1">
        {columns.map((col, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center gap-0.5 p-1 rounded"
            style={{ backgroundColor: `${fingerColors[col.finger]}15` }}
          >
            {col.keys.slice(0, 5).map((key, j) => (
              <div
                key={j}
                className="w-6 h-6 flex items-center justify-center text-[10px] font-mono rounded"
                style={{ 
                  backgroundColor: `${fingerColors[col.finger]}30`,
                  color: fingerColors[col.finger]
                }}
              >
                {key}
              </div>
            ))}
            <div className="text-[8px] mt-1" style={{ color: fingerColors[col.finger] }}>
              {col.hand === 'left' ? 'E' : 'D'}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-muted-foreground">
        O <span style={{ color: fingerColors.index }}>indicador</span> cobre 2 colunas pois e o dedo mais agil
      </div>
    </div>
  )
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'intro',
    title: 'Bem-vindo ao Tutorial de Digitacao',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Digitar corretamente com todos os dedos aumenta sua velocidade e reduz o cansaco.
          Vamos aprender a posicao correta das maos no teclado.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <Card className="p-4 bg-card/50 border-border/30 flex flex-col items-center gap-2">
            <Hand className="w-8 h-8 text-primary" />
            <div className="text-sm font-medium">Posicao</div>
            <div className="text-xs text-muted-foreground text-center">Onde colocar cada dedo</div>
          </Card>
          <Card className="p-4 bg-card/50 border-border/30 flex flex-col items-center gap-2">
            <Keyboard className="w-8 h-8 text-primary" />
            <div className="text-sm font-medium">Mapeamento</div>
            <div className="text-xs text-muted-foreground text-center">Qual dedo para cada tecla</div>
          </Card>
          <Card className="p-4 bg-card/50 border-border/30 flex flex-col items-center gap-2">
            <Target className="w-8 h-8 text-primary" />
            <div className="text-sm font-medium">Pratica</div>
            <div className="text-xs text-muted-foreground text-center">Exercicios para memorizar</div>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 'home-row',
    title: 'A Linha Inicial (Home Row)',
    activeHand: 'left',
    activeFinger: 'index',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          A <span className="text-foreground font-medium">home row</span> e a linha do meio do teclado,
          onde seus dedos descansam quando nao estao digitando.
        </p>
        <HomeRowDiagram />
        <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg">
          <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Dica:</span> Sempre retorne os dedos para a home row apos pressionar qualquer tecla.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'finger-columns',
    title: 'Colunas Verticais',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Cada dedo e responsavel por uma <span className="text-foreground font-medium">coluna vertical</span> de teclas.
          Os dedos sobem e descem, mas nunca se movem para os lados (exceto o indicador).
        </p>
        <FingerColumnsDiagram />
      </div>
    ),
  },
  {
    id: 'left-hand',
    title: 'Mao Esquerda',
    activeHand: 'left',
    activeFinger: 'index',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          A mao esquerda cobre a metade esquerda do teclado, das teclas <KeyBadge label="`" finger="pinky" /> ate <KeyBadge label="T" finger="index" />, <KeyBadge label="G" finger="index" />, <KeyBadge label="B" finger="index" />.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="pinky" hand="left" />
            </div>
            <p className="text-xs text-muted-foreground">
              Tab, Caps Lock, Shift, `, 1, Q, A, Z
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="ring" hand="left" />
            </div>
            <p className="text-xs text-muted-foreground">
              2, W, S, X
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="middle" hand="left" />
            </div>
            <p className="text-xs text-muted-foreground">
              3, E, D, C
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="index" hand="left" />
            </div>
            <p className="text-xs text-muted-foreground">
              4, 5, R, T, F, G, V, B
            </p>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 'right-hand',
    title: 'Mao Direita',
    activeHand: 'right',
    activeFinger: 'index',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          A mao direita cobre de <KeyBadge label="Y" finger="index" />, <KeyBadge label="H" finger="index" />, <KeyBadge label="N" finger="index" /> ate o lado direito do teclado.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="index" hand="right" />
            </div>
            <p className="text-xs text-muted-foreground">
              6, 7, Y, U, H, J, N, M
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="middle" hand="right" />
            </div>
            <p className="text-xs text-muted-foreground">
              8, I, K, virgula
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="ring" hand="right" />
            </div>
            <p className="text-xs text-muted-foreground">
              9, O, L, ponto
            </p>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FingerBadge finger="pinky" hand="right" />
            </div>
            <p className="text-xs text-muted-foreground">
              0, -, P, ;, /, Enter, Shift, Backspace
            </p>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: 'thumbs',
    title: 'Os Polegares',
    activeHand: 'left',
    activeFinger: 'thumb',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Os <span style={{ color: fingerColors.thumb }} className="font-medium">polegares</span> tem uma funcao simples mas essencial:
          pressionar a <span className="text-foreground font-medium">barra de espaco</span>.
        </p>
        <Card className="p-4 bg-card/50 border-border/30">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div 
                className="w-16 h-8 rounded flex items-center justify-center text-xs font-medium mb-2"
                style={{ backgroundColor: `${fingerColors.thumb}30`, color: fingerColors.thumb }}
              >
                SPACE
              </div>
              <div className="text-xs text-muted-foreground">Polegar esquerdo ou direito</div>
            </div>
          </div>
        </Card>
        <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg">
          <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Dica:</span> Use o polegar da mao oposta a ultima letra digitada.
            Exemplo: depois de "e" (mao esquerda), use o polegar direito para espaco.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'practice-tip',
    title: 'Dicas para Praticar',
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">
          Agora que voce conhece o mapeamento, aqui estao algumas dicas para praticar:
        </p>
        <div className="flex flex-col gap-3">
          <Card className="p-3 bg-card/50 border-border/30 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">1</div>
            <div>
              <div className="text-sm font-medium">Comece devagar</div>
              <div className="text-xs text-muted-foreground">Precisao e mais importante que velocidade no inicio</div>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">2</div>
            <div>
              <div className="text-sm font-medium">Nao olhe para o teclado</div>
              <div className="text-xs text-muted-foreground">Confie na posicao dos seus dedos na home row</div>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">3</div>
            <div>
              <div className="text-sm font-medium">Pratique 15-30 min por dia</div>
              <div className="text-xs text-muted-foreground">Consistencia e melhor que sessoes longas esporadicas</div>
            </div>
          </Card>
          <Card className="p-3 bg-card/50 border-border/30 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">4</div>
            <div>
              <div className="text-sm font-medium">Use o modo Teacher</div>
              <div className="text-xs text-muted-foreground">Observe a mao 3D para aprender o movimento correto</div>
            </div>
          </Card>
        </div>
      </div>
    ),
  },
]

interface TutorialProps {
  onClose: () => void
}

export function Tutorial({ onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = tutorialSteps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === tutorialSteps.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-3xl mx-4 bg-card border-border/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{step.title}</h2>
              <div className="text-xs text-muted-foreground">
                Passo {currentStep + 1} de {tutorialSteps.length}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Text content */}
            <div>{step.content}</div>

            {/* 3D Hand visualization */}
            {(step.activeHand || step.activeFinger) && (
              <div className="h-64 rounded-xl overflow-hidden bg-card/30 border border-border/30">
                <HandScene
                  activeHand={step.activeHand}
                  activeFinger={step.activeFinger}
                  isPressed={false}
                  showBothHands={true}
                />
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={isFirst}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex gap-1">
            {tutorialSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  i === currentStep ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/30'
                )}
              />
            ))}
          </div>

          {isLast ? (
            <Button onClick={onClose} className="gap-2">
              Comecar a Praticar
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(s => s + 1)} className="gap-2">
              Proximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

// Icon component for GraduationCap (if not imported)
function GraduationCap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}
