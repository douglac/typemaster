'use client'

import { TypingGame } from '@/components/typing-game/typing-game'

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-6 flex items-center justify-center">
      <TypingGame />
    </main>
  )
}
