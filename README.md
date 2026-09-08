# MemoryGrid

MemoryGrid is a lightweight educational project for exploring the evolution of computer memory and experimenting with dynamic memory allocation.

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

## Quick demo

1. Open **Timeline** for the historical overview.
2. Open **Simulator**, choose an allocation strategy, then allocate and free blocks.
3. Click **Load Fragmentation Demo** to create separated free holes quickly.
4. Open **Playground** and run the sample `ALLOC` / `FREE` workload.
5. Open **Benchmarks** to compare the same workload across First Fit, Best Fit, and Worst Fit.

These pages form the finished core of MemoryGrid.

## 3D interface

MemoryGrid uses Three.js through React Three Fiber and Drei for the hardware hero scene, interactive heap visualization, and spatial memory timeline. The original 2D heap view remains available as a lightweight fallback inside the simulator.

Three.js scenes are dynamically loaded on the client and cap device pixel ratio to keep the interface responsive.
