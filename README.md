# Math Tug of War 🧮⚔️

Educational math game for kids — 2 teams compete in a tug-of-war style battle!

![Math Tug of War](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Local Multiplayer** — 2 teams on one device
- **Difficulty Levels** — Easy, Medium, Hard (affects number range & time)
- **Problem Modes** — Addition, Subtraction, Multiplication, Division, or Combined
- **Sound Effects** — Audio feedback generated with Web Audio API (no external files needed!)
- **Beautiful UI** — Gradient backgrounds, smooth animations, responsive design
- **Colorful Teams** — Blue vs Red with distinct visual styles

## Tech Stack

- **Next.js 16** — React framework with App Router
- **TypeScript** — Type safety and better DX
- **TailwindCSS v3** — Utility-first CSS with @tailwindcss/postcss
- **Web Audio API** — Programmatic sound effects (no external files needed)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## GitHub Repository

https://github.com/sisuclaw/mathwar

## Deployment

Deployed on Vercel: https://mathwar.vercel.app

Auto-deployed from GitHub main branch.

## Game Rules

1. Select difficulty (Easy/Medium/Hard) and problem mode
2. Two teams (Blue vs Red) compete to solve math problems
3. Teams take turns answering questions
4. Correct answer → Score +1 and new problem
5. Wrong answer → Other team's turn
6. When timer ends, team with highest score wins!

## Difficulty Settings

| Difficulty | Number Range | Time |
|------------|---------------|------|
| Easy       | 1-10 (±,×,÷) | 3 minutes |
| Medium     | 1-50 (±,×,÷) | 2 minutes |
| Hard       | 1-100 (±,×,÷) | 1 minute |

## Problem Modes

### Single Operations
- ➕ Tambah — Addition only
- ➖ Kurang — Subtraction only
- ✖️ Kali — Multiplication only
- ➗ Bagi — Division only (clean division, no remainders)

### Combination Operations (click to expand)
- ➕➖ Tambah + Kurang — Addition & Subtraction
- ➕✖️ Tambah + Kali — Addition & Multiplication
- ➕➗ Tambah + Bagi — Addition & Division
- ➖✖️ Kurang + Kali — Subtraction & Multiplication
- ➖➗ Kurang + Bagi — Subtraction & Division
- ✖️➗ Kali + Bagi — Multiplication & Division
- 🎲 Campuran Semua — All operations

## Sound Effects

Sounds are generated programmatically using Web Audio API:
- **Correct** — Happy ding (ascending tones)
- **Wrong** — Low buzz
- **Win** — Victory melody (ascending arpeggio)
- **Tick** — Quick tick sound

No external sound files required!

## UI Features

- **Gradient backgrounds** — Beautiful color transitions
- **Backdrop blur** — Modern glassmorphism effects
- **Smooth animations** — Transitions and transforms
- **Responsive design** — Works on mobile and desktop
- **Color-coded urgency** — Timer changes color based on time remaining
- **Visual feedback** — Active states, shadows, and scaling effects

---

Made by @sisuclaw with Next.js 16 + TypeScript + TailwindCSS
