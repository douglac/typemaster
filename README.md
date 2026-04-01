# Type Master

**Programmers forgot how to type.**

For years, coding meant short bursts — variable names, function calls, symbols. You could get away with 3-4 fingers and muscle memory for brackets and semicolons. Nobody noticed.

Then the way we program changed. AI tools turned coding into writing. Prompts, context descriptions, architectural explanations, code reviews in natural language — suddenly the job is about producing paragraphs, not one-liners. And the fingers that were enough for `if (x !== null)` are painfully slow for "Refactor the authentication middleware to support multi-tenant JWT validation with role-based access control."

The result: slower output, more typos, more fatigue.

**Type Master exists to take you back to the fundamentals.** Learn (or re-learn) proper 10-finger touch typing with real-time 3D hand visualization, an interactive keyboard map, and speed benchmarks calibrated for developers.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## Features

**3 Game Modes**

- **Teacher** — Watch the 3D hand model demonstrate correct finger movements for each key. Learn by observation before typing.
- **Practice** — Type at your own pace with real-time WPM, accuracy, elapsed time, and correct/wrong key stats.
- **Challenge** — Test your speed and get compared against developer benchmarks (Junior, Mid, Senior, Top 10%, Top 1%).

**3D Hand Visualization**

- Animated 3D hand models (left + right) built with React Three Fiber and Drei.
- Active finger highlights in real-time as you type, showing exactly which finger should press which key.
- Orbit controls to rotate and zoom the 3D scene.

**Interactive Keyboard**

- Full MacBook Pro US layout rendered on screen.
- Color-coded finger zones (pinky, ring, middle, index, thumb) so you can see which finger owns each key.
- Visual feedback on keypress — green flash for correct, red for wrong, pulsing target key.

**Built-in Tutorial**

- Step-by-step walkthrough: home row positioning, finger-to-column mapping, left hand, right hand, thumbs, and practice tips.
- Interactive diagrams showing the home row (ASDF / JKL;) and vertical column responsibilities.
- 3D hand preview integrated into each tutorial step.

**Speed Comparison (Challenge Mode)**

- Skill level classification: Iniciante → Basico → Intermediario → Proficiente → Avancado → Expert → Elite → Pro Typist.
- Percentile ranking ("you type faster than X% of people").
- Side-by-side comparison against Dev Junior (45 WPM), Dev Pleno (60), Dev Senior (75), Top 10% (90).
- Progress bar showing how close you are to the next level.

**Custom Text**

- Edit the practice phrase to anything you want. Hover over the text area and click the pencil icon, or use the "Editar Frase" button.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui (Radix primitives) |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Language | TypeScript 5.7 |
| Package Manager | pnpm |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/douglac/typemaster.git
cd typemaster

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx          # Root layout with Geist font and Vercel Analytics
  page.tsx            # Main page rendering TypingGame
  globals.css         # Global styles

components/
  typing-game/
    typing-game.tsx   # Main game component (mode selector, text display, stats, controls)
    speed-comparison.tsx  # Challenge mode benchmarks and percentile ranking
    tutorial.tsx      # Step-by-step typing tutorial with diagrams
  keyboard/
    keyboard.tsx      # Interactive keyboard with finger color zones
  hand-3d/
    hand-scene.tsx    # Three.js canvas with lighting, shadows, orbit controls
    hand-model.tsx    # 3D hand mesh with per-finger animation

hooks/
  use-typing-game.ts  # Core game logic: key detection, WPM calculation, stats tracking

lib/
  keyboard-data.ts    # Full MacBook Pro US key layout, finger mapping, key-to-code conversion
  utils.ts            # cn() utility (clsx + tailwind-merge)
```

## Build

```bash
pnpm build
pnpm start
```

## License

MIT
