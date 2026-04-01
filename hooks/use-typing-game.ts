'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { getKeyData, charToKeyCode, type KeyData } from '@/lib/keyboard-data'

export type GameMode = 'teacher' | 'practice' | 'game'

interface GameStats {
  wpm: number
  accuracy: number
  correctKeys: number
  wrongKeys: number
  totalKeys: number
  startTime: number | null
  elapsedTime: number
}

interface UseTypingGameOptions {
  mode: GameMode
  text?: string
}

const practiceTexts = [
  'the quick brown fox jumps over the lazy dog',
  'pack my box with five dozen liquor jugs',
  'how vexingly quick daft zebras jump',
  'the five boxing wizards jump quickly',
  'sphinx of black quartz judge my vow',
]

export function useTypingGame({ mode, text }: UseTypingGameOptions) {
  const [currentText, setCurrentText] = useState(text || practiceTexts[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [keyStates, setKeyStates] = useState<Record<string, 'correct' | 'wrong' | 'neutral'>>({})
  const [stats, setStats] = useState<GameStats>({
    wpm: 0,
    accuracy: 100,
    correctKeys: 0,
    wrongKeys: 0,
    totalKeys: 0,
    startTime: null,
    elapsedTime: 0,
  })
  const [isComplete, setIsComplete] = useState(false)
  const [teacherIndex, setTeacherIndex] = useState(0)
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Get current target character and its key data
  const currentChar = currentText[currentIndex] || ''
  const targetKeyCode = charToKeyCode(currentChar)
  const targetKeyData = targetKeyCode ? getKeyData(targetKeyCode) : undefined

  // Teacher mode: cycle through keys
  const teacherKeyCode = mode === 'teacher' ? charToKeyCode(currentText[teacherIndex]) : undefined
  const teacherKeyData = teacherKeyCode ? getKeyData(teacherKeyCode) : undefined

  // Calculate WPM based on characters typed and time elapsed
  const calculateWPM = useCallback((correctChars: number, elapsedMs: number) => {
    if (elapsedMs < 1000) return 0 // Wait at least 1 second before calculating
    const minutes = elapsedMs / 60000
    const words = correctChars / 5 // Standard: 5 characters = 1 word
    return Math.round(words / minutes)
  }, [])

  // Start timer when first key is pressed
  const startTimer = useCallback(() => {
    if (stats.startTime === null) {
      const startTime = Date.now()
      setStats(prev => ({ ...prev, startTime }))
      
      timerRef.current = setInterval(() => {
        const elapsedMs = Date.now() - startTime
        setStats(prev => ({
          ...prev,
          elapsedTime: elapsedMs / 1000,
          wpm: calculateWPM(prev.correctKeys, elapsedMs),
        }))
      }, 100)
    }
  }, [stats.startTime, calculateWPM])

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Handle key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const code = event.code
    
    // Update pressed keys
    setPressedKeys(prev => new Set(prev).add(code))
    
    // Teacher mode: just show the finger
    if (mode === 'teacher') {
      setTeacherIndex(prev => (prev + 1) % currentText.length)
      return
    }
    
    // Don't process special keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].some(k => code.includes(k))) {
      return
    }
    
    // Prevent default for game keys
    event.preventDefault()
    
    // Start timer on first valid key
    startTimer()
    
    // Check if correct key was pressed
    const isCorrect = code === targetKeyCode
    
    setStats(prev => {
      const newCorrectKeys = isCorrect ? prev.correctKeys + 1 : prev.correctKeys
      const newTotalKeys = prev.totalKeys + 1
      const newWrongKeys = isCorrect ? prev.wrongKeys : prev.wrongKeys + 1
      const elapsedMs = prev.startTime ? Date.now() - prev.startTime : 0
      
      return {
        ...prev,
        totalKeys: newTotalKeys,
        correctKeys: newCorrectKeys,
        wrongKeys: newWrongKeys,
        accuracy: Math.round((newCorrectKeys / newTotalKeys) * 100),
        wpm: calculateWPM(newCorrectKeys, elapsedMs),
      }
    })
    
    // Update key visual state
    setKeyStates(prev => ({
      ...prev,
      [code]: isCorrect ? 'correct' : 'wrong',
    }))
    
    // Clear key state after short delay
    setTimeout(() => {
      setKeyStates(prev => {
        const newState = { ...prev }
        delete newState[code]
        return newState
      })
    }, 200)
    
    // Move to next character if correct
    if (isCorrect) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      
      // Check if complete
      if (nextIndex >= currentText.length) {
        setIsComplete(true)
        stopTimer()
      }
    }
  }, [mode, currentIndex, currentText, targetKeyCode, startTimer, stopTimer, calculateWPM])

  // Handle key release
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    setPressedKeys(prev => {
      const next = new Set(prev)
      next.delete(event.code)
      return next
    })
  }, [])

  // Reset game
  const reset = useCallback((newText?: string) => {
    stopTimer()
    setCurrentIndex(0)
    setTeacherIndex(0)
    setPressedKeys(new Set())
    setKeyStates({})
    setIsComplete(false)
    setStats({
      wpm: 0,
      accuracy: 100,
      correctKeys: 0,
      wrongKeys: 0,
      totalKeys: 0,
      startTime: null,
      elapsedTime: 0,
    })
    if (newText) {
      setCurrentText(newText)
    }
  }, [stopTimer])

  // Next text
  const nextText = useCallback(() => {
    const currentTextIndex = practiceTexts.indexOf(currentText)
    const nextIndex = (currentTextIndex + 1) % practiceTexts.length
    reset(practiceTexts[nextIndex])
  }, [currentText, reset])

  // Set custom text
  const setCustomText = useCallback((newText: string) => {
    reset(newText)
  }, [reset])

  // Add/remove event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      stopTimer()
    }
  }, [handleKeyDown, handleKeyUp, stopTimer])

  return {
    // State
    currentText,
    currentIndex,
    currentChar,
    pressedKeys,
    keyStates,
    stats,
    isComplete,
    
    // Target key info
    targetKeyCode,
    targetKeyData,
    
    // Teacher mode
    teacherKeyData: mode === 'teacher' ? teacherKeyData : targetKeyData,
    
    // Actions
    reset,
    nextText,
    setCustomText,
  }
}
