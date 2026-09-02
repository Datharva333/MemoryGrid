# MemoryGrid

MemoryGrid is a lightweight educational side project for exploring the evolution of computer memory and experimenting with dynamic memory allocation.

## Features

- Visual timeline of major memory technologies
- First Fit, Best Fit, and Worst Fit heap allocation
- Allocate/free controls with adjacent free-block coalescing
- Used/free memory, utilization, and external-fragmentation metrics
- Scriptable playground using `ALLOC <size>` and `FREE <processId>` commands
- Small deterministic strategy comparison benchmark
- Open learning resources and references

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify before sharing

```bash
npm run lint
npm run build
```

## Production preview

```bash
npm run build
npm start
```

## Stack

Next.js, React, TypeScript, and Tailwind CSS. All simulations run locally in the browser; no backend or database is required.
