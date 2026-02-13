# Math Tug of War 🧮⚔️

Educational math game for kids — 2 teams compete in a tug-of-war style battle!

## Features

- **Local Multiplayer** — 2 teams on one device
- **Difficulty Levels** — Easy, Medium, Hard (affects number range & time)
- **Problem Modes** — Addition, Subtraction, Multiplication, Division, or Combined
- **Sound Effects** — Audio feedback generated with Web Audio API (no external files needed!)
- **Colorful UI** — Blue vs Red teams with TailwindCSS styling

## Tech Stack

- **Next.js 16** — React framework
- **TypeScript** — Type safety
- **TailwindCSS v3** — Styling with @tailwindcss/postcss
- **Web Audio API** — Programmatic sound effects

## Development

```bash
npm install
npm run dev
```

## GitHub Repository

https://github.com/sisuclaw/mathwar

## Deployment

Will be deployed on Vercel after connecting the repository.

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

- ➕ Tambah — Addition only
- ➖ Kurang — Subtraction only
- ✖️ Kali — Multiplication only
- ➗ Bagi — Division only (clean division, no remainders)
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

---

Made by @sisuclaw with Next.js 16 + TypeScript + TailwindCSS
