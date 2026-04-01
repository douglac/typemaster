// MacBook Pro US Keyboard Layout with finger mapping
export type Finger = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb'
export type Hand = 'left' | 'right'

export interface KeyData {
  key: string
  label: string
  shiftLabel?: string
  width?: number // relative width (1 = standard key)
  finger: Finger
  hand: Hand
  row: number
  col: number
}

// Finger colors for visualization
export const fingerColors: Record<Finger, string> = {
  pinky: '#e879a9',   // Pink
  ring: '#a78bfa',    // Purple  
  middle: '#4ade80',  // Green
  index: '#fbbf24',   // Yellow/Orange
  thumb: '#38bdf8',   // Cyan
}

// MacBook Pro US Layout - each row from top to bottom
export const keyboardLayout: KeyData[][] = [
  // Row 0: Function keys (ESC, F1-F12)
  [
    { key: 'Escape', label: 'esc', width: 1, finger: 'pinky', hand: 'left', row: 0, col: 0 },
    { key: 'F1', label: 'F1', width: 1, finger: 'pinky', hand: 'left', row: 0, col: 1 },
    { key: 'F2', label: 'F2', width: 1, finger: 'pinky', hand: 'left', row: 0, col: 2 },
    { key: 'F3', label: 'F3', width: 1, finger: 'ring', hand: 'left', row: 0, col: 3 },
    { key: 'F4', label: 'F4', width: 1, finger: 'middle', hand: 'left', row: 0, col: 4 },
    { key: 'F5', label: 'F5', width: 1, finger: 'index', hand: 'left', row: 0, col: 5 },
    { key: 'F6', label: 'F6', width: 1, finger: 'index', hand: 'left', row: 0, col: 6 },
    { key: 'F7', label: 'F7', width: 1, finger: 'index', hand: 'right', row: 0, col: 7 },
    { key: 'F8', label: 'F8', width: 1, finger: 'index', hand: 'right', row: 0, col: 8 },
    { key: 'F9', label: 'F9', width: 1, finger: 'middle', hand: 'right', row: 0, col: 9 },
    { key: 'F10', label: 'F10', width: 1, finger: 'ring', hand: 'right', row: 0, col: 10 },
    { key: 'F11', label: 'F11', width: 1, finger: 'pinky', hand: 'right', row: 0, col: 11 },
    { key: 'F12', label: 'F12', width: 1, finger: 'pinky', hand: 'right', row: 0, col: 12 },
  ],
  // Row 1: Number row
  [
    { key: 'Backquote', label: '`', shiftLabel: '~', width: 1, finger: 'pinky', hand: 'left', row: 1, col: 0 },
    { key: 'Digit1', label: '1', shiftLabel: '!', width: 1, finger: 'pinky', hand: 'left', row: 1, col: 1 },
    { key: 'Digit2', label: '2', shiftLabel: '@', width: 1, finger: 'ring', hand: 'left', row: 1, col: 2 },
    { key: 'Digit3', label: '3', shiftLabel: '#', width: 1, finger: 'middle', hand: 'left', row: 1, col: 3 },
    { key: 'Digit4', label: '4', shiftLabel: '$', width: 1, finger: 'index', hand: 'left', row: 1, col: 4 },
    { key: 'Digit5', label: '5', shiftLabel: '%', width: 1, finger: 'index', hand: 'left', row: 1, col: 5 },
    { key: 'Digit6', label: '6', shiftLabel: '^', width: 1, finger: 'index', hand: 'right', row: 1, col: 6 },
    { key: 'Digit7', label: '7', shiftLabel: '&', width: 1, finger: 'index', hand: 'right', row: 1, col: 7 },
    { key: 'Digit8', label: '8', shiftLabel: '*', width: 1, finger: 'middle', hand: 'right', row: 1, col: 8 },
    { key: 'Digit9', label: '9', shiftLabel: '(', width: 1, finger: 'ring', hand: 'right', row: 1, col: 9 },
    { key: 'Digit0', label: '0', shiftLabel: ')', width: 1, finger: 'pinky', hand: 'right', row: 1, col: 10 },
    { key: 'Minus', label: '-', shiftLabel: '_', width: 1, finger: 'pinky', hand: 'right', row: 1, col: 11 },
    { key: 'Equal', label: '=', shiftLabel: '+', width: 1, finger: 'pinky', hand: 'right', row: 1, col: 12 },
    { key: 'Backspace', label: 'delete', width: 1.5, finger: 'pinky', hand: 'right', row: 1, col: 13 },
  ],
  // Row 2: QWERTY row
  [
    { key: 'Tab', label: 'tab', width: 1.5, finger: 'pinky', hand: 'left', row: 2, col: 0 },
    { key: 'KeyQ', label: 'Q', width: 1, finger: 'pinky', hand: 'left', row: 2, col: 1 },
    { key: 'KeyW', label: 'W', width: 1, finger: 'ring', hand: 'left', row: 2, col: 2 },
    { key: 'KeyE', label: 'E', width: 1, finger: 'middle', hand: 'left', row: 2, col: 3 },
    { key: 'KeyR', label: 'R', width: 1, finger: 'index', hand: 'left', row: 2, col: 4 },
    { key: 'KeyT', label: 'T', width: 1, finger: 'index', hand: 'left', row: 2, col: 5 },
    { key: 'KeyY', label: 'Y', width: 1, finger: 'index', hand: 'right', row: 2, col: 6 },
    { key: 'KeyU', label: 'U', width: 1, finger: 'index', hand: 'right', row: 2, col: 7 },
    { key: 'KeyI', label: 'I', width: 1, finger: 'middle', hand: 'right', row: 2, col: 8 },
    { key: 'KeyO', label: 'O', width: 1, finger: 'ring', hand: 'right', row: 2, col: 9 },
    { key: 'KeyP', label: 'P', width: 1, finger: 'pinky', hand: 'right', row: 2, col: 10 },
    { key: 'BracketLeft', label: '[', shiftLabel: '{', width: 1, finger: 'pinky', hand: 'right', row: 2, col: 11 },
    { key: 'BracketRight', label: ']', shiftLabel: '}', width: 1, finger: 'pinky', hand: 'right', row: 2, col: 12 },
    { key: 'Backslash', label: '\\', shiftLabel: '|', width: 1.5, finger: 'pinky', hand: 'right', row: 2, col: 13 },
  ],
  // Row 3: Home row (ASDF)
  [
    { key: 'CapsLock', label: 'caps lock', width: 1.75, finger: 'pinky', hand: 'left', row: 3, col: 0 },
    { key: 'KeyA', label: 'A', width: 1, finger: 'pinky', hand: 'left', row: 3, col: 1 },
    { key: 'KeyS', label: 'S', width: 1, finger: 'ring', hand: 'left', row: 3, col: 2 },
    { key: 'KeyD', label: 'D', width: 1, finger: 'middle', hand: 'left', row: 3, col: 3 },
    { key: 'KeyF', label: 'F', width: 1, finger: 'index', hand: 'left', row: 3, col: 4 },
    { key: 'KeyG', label: 'G', width: 1, finger: 'index', hand: 'left', row: 3, col: 5 },
    { key: 'KeyH', label: 'H', width: 1, finger: 'index', hand: 'right', row: 3, col: 6 },
    { key: 'KeyJ', label: 'J', width: 1, finger: 'index', hand: 'right', row: 3, col: 7 },
    { key: 'KeyK', label: 'K', width: 1, finger: 'middle', hand: 'right', row: 3, col: 8 },
    { key: 'KeyL', label: 'L', width: 1, finger: 'ring', hand: 'right', row: 3, col: 9 },
    { key: 'Semicolon', label: ';', shiftLabel: ':', width: 1, finger: 'pinky', hand: 'right', row: 3, col: 10 },
    { key: 'Quote', label: "'", shiftLabel: '"', width: 1, finger: 'pinky', hand: 'right', row: 3, col: 11 },
    { key: 'Enter', label: 'return', width: 2.25, finger: 'pinky', hand: 'right', row: 3, col: 12 },
  ],
  // Row 4: ZXCV row
  [
    { key: 'ShiftLeft', label: 'shift', width: 2.25, finger: 'pinky', hand: 'left', row: 4, col: 0 },
    { key: 'KeyZ', label: 'Z', width: 1, finger: 'pinky', hand: 'left', row: 4, col: 1 },
    { key: 'KeyX', label: 'X', width: 1, finger: 'ring', hand: 'left', row: 4, col: 2 },
    { key: 'KeyC', label: 'C', width: 1, finger: 'middle', hand: 'left', row: 4, col: 3 },
    { key: 'KeyV', label: 'V', width: 1, finger: 'index', hand: 'left', row: 4, col: 4 },
    { key: 'KeyB', label: 'B', width: 1, finger: 'index', hand: 'left', row: 4, col: 5 },
    { key: 'KeyN', label: 'N', width: 1, finger: 'index', hand: 'right', row: 4, col: 6 },
    { key: 'KeyM', label: 'M', width: 1, finger: 'index', hand: 'right', row: 4, col: 7 },
    { key: 'Comma', label: ',', shiftLabel: '<', width: 1, finger: 'middle', hand: 'right', row: 4, col: 8 },
    { key: 'Period', label: '.', shiftLabel: '>', width: 1, finger: 'ring', hand: 'right', row: 4, col: 9 },
    { key: 'Slash', label: '/', shiftLabel: '?', width: 1, finger: 'pinky', hand: 'right', row: 4, col: 10 },
    { key: 'ShiftRight', label: 'shift', width: 2.75, finger: 'pinky', hand: 'right', row: 4, col: 11 },
  ],
  // Row 5: Bottom row (modifiers + space)
  [
    { key: 'Fn', label: 'fn', width: 1, finger: 'pinky', hand: 'left', row: 5, col: 0 },
    { key: 'ControlLeft', label: 'control', width: 1.25, finger: 'pinky', hand: 'left', row: 5, col: 1 },
    { key: 'AltLeft', label: 'option', width: 1.25, finger: 'pinky', hand: 'left', row: 5, col: 2 },
    { key: 'MetaLeft', label: 'command', width: 1.5, finger: 'thumb', hand: 'left', row: 5, col: 3 },
    { key: 'Space', label: '', width: 6.5, finger: 'thumb', hand: 'left', row: 5, col: 4 },
    { key: 'MetaRight', label: 'command', width: 1.5, finger: 'thumb', hand: 'right', row: 5, col: 5 },
    { key: 'AltRight', label: 'option', width: 1.25, finger: 'pinky', hand: 'right', row: 5, col: 6 },
    { key: 'ArrowLeft', label: '◀', width: 1, finger: 'pinky', hand: 'right', row: 5, col: 7 },
    { key: 'ArrowUp', label: '▲', width: 1, finger: 'pinky', hand: 'right', row: 5, col: 8 },
    { key: 'ArrowDown', label: '▼', width: 1, finger: 'pinky', hand: 'right', row: 5, col: 9 },
    { key: 'ArrowRight', label: '▶', width: 1, finger: 'pinky', hand: 'right', row: 5, col: 10 },
  ],
]

// Flatten keyboard for easy lookup
export const keyMap = new Map<string, KeyData>()
keyboardLayout.forEach(row => {
  row.forEach(key => {
    keyMap.set(key.key, key)
  })
})

// Get key data by event.code
export function getKeyData(code: string): KeyData | undefined {
  return keyMap.get(code)
}

// Get finger color
export function getFingerColor(finger: Finger): string {
  return fingerColors[finger]
}

// Convert character to key code
export function charToKeyCode(char: string): string | undefined {
  const charMap: Record<string, string> = {
    'a': 'KeyA', 'b': 'KeyB', 'c': 'KeyC', 'd': 'KeyD', 'e': 'KeyE',
    'f': 'KeyF', 'g': 'KeyG', 'h': 'KeyH', 'i': 'KeyI', 'j': 'KeyJ',
    'k': 'KeyK', 'l': 'KeyL', 'm': 'KeyM', 'n': 'KeyN', 'o': 'KeyO',
    'p': 'KeyP', 'q': 'KeyQ', 'r': 'KeyR', 's': 'KeyS', 't': 'KeyT',
    'u': 'KeyU', 'v': 'KeyV', 'w': 'KeyW', 'x': 'KeyX', 'y': 'KeyY',
    'z': 'KeyZ',
    '0': 'Digit0', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4',
    '5': 'Digit5', '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9',
    ' ': 'Space',
    '.': 'Period', ',': 'Comma', '/': 'Slash', ';': 'Semicolon',
    "'": 'Quote', '[': 'BracketLeft', ']': 'BracketRight',
    '\\': 'Backslash', '`': 'Backquote', '-': 'Minus', '=': 'Equal',
  }
  return charMap[char.toLowerCase()]
}
