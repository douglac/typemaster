'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Trophy, TrendingUp, Users, Zap, Code, Keyboard } from 'lucide-react'

// Benchmarks baseados em estudos de velocidade de digitacao
// Fonte: TypingStudy, Ratatype, e pesquisas com desenvolvedores
const TYPING_BENCHMARKS = [
  { label: 'Iniciante', wpm: 20, color: 'text-red-400', bgColor: 'bg-red-400' },
  { label: 'Basico', wpm: 35, color: 'text-orange-400', bgColor: 'bg-orange-400' },
  { label: 'Intermediario', wpm: 50, color: 'text-yellow-400', bgColor: 'bg-yellow-400' },
  { label: 'Proficiente', wpm: 65, color: 'text-lime-400', bgColor: 'bg-lime-400' },
  { label: 'Avancado', wpm: 80, color: 'text-green-400', bgColor: 'bg-green-400' },
  { label: 'Expert', wpm: 100, color: 'text-emerald-400', bgColor: 'bg-emerald-400' },
  { label: 'Elite', wpm: 120, color: 'text-cyan-400', bgColor: 'bg-cyan-400' },
  { label: 'Pro Typist', wpm: 150, color: 'text-blue-400', bgColor: 'bg-blue-400' },
]

const PROGRAMMER_STATS = {
  junior: { wpm: 45, label: 'Dev Junior' },
  mid: { wpm: 60, label: 'Dev Pleno' },
  senior: { wpm: 75, label: 'Dev Senior' },
  average: { wpm: 55, label: 'Media Devs' },
  top10: { wpm: 90, label: 'Top 10%' },
  top1: { wpm: 120, label: 'Top 1%' },
}

function getSkillLevel(wpm: number) {
  for (let i = TYPING_BENCHMARKS.length - 1; i >= 0; i--) {
    if (wpm >= TYPING_BENCHMARKS[i].wpm) {
      return TYPING_BENCHMARKS[i]
    }
  }
  return TYPING_BENCHMARKS[0]
}

function getNextLevel(wpm: number) {
  for (const level of TYPING_BENCHMARKS) {
    if (wpm < level.wpm) {
      return level
    }
  }
  return null
}

function getPercentile(wpm: number): number {
  // Distribuicao aproximada baseada em dados reais
  if (wpm < 20) return 5
  if (wpm < 30) return 15
  if (wpm < 40) return 30
  if (wpm < 50) return 50
  if (wpm < 60) return 65
  if (wpm < 70) return 75
  if (wpm < 80) return 85
  if (wpm < 90) return 90
  if (wpm < 100) return 95
  if (wpm < 120) return 98
  return 99
}

interface SpeedComparisonProps {
  wpm: number
  accuracy: number
  isComplete: boolean
}

export function SpeedComparison({ wpm, accuracy, isComplete }: SpeedComparisonProps) {
  const currentLevel = getSkillLevel(wpm)
  const nextLevel = getNextLevel(wpm)
  const percentile = getPercentile(wpm)
  const progressToNext = nextLevel 
    ? Math.min(100, ((wpm - currentLevel.wpm) / (nextLevel.wpm - currentLevel.wpm)) * 100)
    : 100

  const comparisons = [
    { 
      icon: Code, 
      label: PROGRAMMER_STATS.junior.label, 
      benchmark: PROGRAMMER_STATS.junior.wpm,
      comparison: wpm >= PROGRAMMER_STATS.junior.wpm ? 'ahead' : 'behind'
    },
    { 
      icon: Code, 
      label: PROGRAMMER_STATS.mid.label, 
      benchmark: PROGRAMMER_STATS.mid.wpm,
      comparison: wpm >= PROGRAMMER_STATS.mid.wpm ? 'ahead' : 'behind'
    },
    { 
      icon: Code, 
      label: PROGRAMMER_STATS.senior.label, 
      benchmark: PROGRAMMER_STATS.senior.wpm,
      comparison: wpm >= PROGRAMMER_STATS.senior.wpm ? 'ahead' : 'behind'
    },
    { 
      icon: Zap, 
      label: PROGRAMMER_STATS.top10.label, 
      benchmark: PROGRAMMER_STATS.top10.wpm,
      comparison: wpm >= PROGRAMMER_STATS.top10.wpm ? 'ahead' : 'behind'
    },
  ]

  return (
    <div className="space-y-4">
      {/* Level Badge */}
      <Card className="p-4 bg-card/50 border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              currentLevel.bgColor + '/20'
            )}>
              <Trophy className={cn('w-6 h-6', currentLevel.color)} />
            </div>
            <div>
              <div className={cn('text-lg font-bold', currentLevel.color)}>
                {currentLevel.label}
              </div>
              <div className="text-sm text-muted-foreground">
                Seu nivel atual de digitacao
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">{wpm}</div>
            <div className="text-xs text-muted-foreground uppercase">WPM</div>
          </div>
        </div>

        {/* Progress to next level */}
        {nextLevel && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{currentLevel.label} ({currentLevel.wpm} WPM)</span>
              <span>{nextLevel.label} ({nextLevel.wpm} WPM)</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div 
                className={cn('h-full transition-all duration-500', currentLevel.bgColor)}
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Faltam {nextLevel.wpm - wpm} WPM para o proximo nivel
            </div>
          </div>
        )}
      </Card>

      {/* Percentile */}
      <Card className="p-4 bg-card/50 border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Voce digita mais rapido que</div>
            <div className="text-2xl font-bold text-primary">{percentile}% das pessoas</div>
          </div>
        </div>
      </Card>

      {/* Comparison with Programmers */}
      <Card className="p-4 bg-card/50 border-border/30">
        <div className="flex items-center gap-2 mb-3">
          <Keyboard className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Comparacao com Programadores
          </span>
        </div>
        <div className="space-y-2">
          {comparisons.map((comp, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
              <div className="flex items-center gap-2">
                <comp.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{comp.label}</span>
                <span className="text-xs text-muted-foreground">({comp.benchmark} WPM)</span>
              </div>
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                comp.comparison === 'ahead' ? 'text-green-400' : 'text-orange-400'
              )}>
                {comp.comparison === 'ahead' ? (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    +{wpm - comp.benchmark} WPM
                  </>
                ) : (
                  <>
                    <span className="text-xs">-{comp.benchmark - wpm} WPM</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Accuracy Impact */}
      {isComplete && (
        <Card className="p-4 bg-card/50 border-border/30">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              accuracy >= 95 ? 'bg-green-400/20' : accuracy >= 85 ? 'bg-yellow-400/20' : 'bg-red-400/20'
            )}>
              <Zap className={cn(
                'w-5 h-5',
                accuracy >= 95 ? 'text-green-400' : accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'
              )} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Precisao</div>
              <div className={cn(
                'text-xl font-bold',
                accuracy >= 95 ? 'text-green-400' : accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'
              )}>
                {accuracy}%
              </div>
            </div>
            <div className="ml-auto text-right text-sm text-muted-foreground">
              {accuracy >= 95 && 'Excelente! Precisao profissional.'}
              {accuracy >= 85 && accuracy < 95 && 'Boa precisao. Continue praticando!'}
              {accuracy < 85 && 'Foque em precisao antes de velocidade.'}
            </div>
          </div>
        </Card>
      )}

      {/* Tips */}
      <div className="text-xs text-muted-foreground text-center py-2">
        Media de desenvolvedores: {PROGRAMMER_STATS.average.wpm} WPM | 
        Top 10% programadores: {PROGRAMMER_STATS.top10.wpm}+ WPM |
        Top 1%: {PROGRAMMER_STATS.top1.wpm}+ WPM
      </div>
    </div>
  )
}
