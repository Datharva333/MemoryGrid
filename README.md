# MemoryGrid

MemoryGrid is a lightweight educational project for exploring the evolution of computer memory and experimenting with dynamic memory allocation.

## Features

- Cinematic 3D timeline of major memory technologies with an optional auto-tour
- First Fit, Best Fit, and Worst Fit heap allocation
- Allocate/free controls with adjacent free-block coalescing
- Annotated 3D address map with block inspection, address ranges, and 2D fallback
- Live utilization/fragmentation telemetry updated after every memory operation
- Used/free memory, utilization, largest-hole, and external-fragmentation metrics
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
3. Load the **Fragmented** quick state, inspect blocks in the annotated 3D heap, then allocate/free memory and watch the live graph change.
4. Open **Playground** and run the sample `ALLOC` / `FREE` workload.
5. Open **Benchmarks** to compare the same workload across First Fit, Best Fit, and Worst Fit.

These pages form the finished core of MemoryGrid.

## 3D interface

MemoryGrid uses Three.js through React Three Fiber and Drei for the hardware hero scene, annotated heap visualization, and animated spatial memory timeline. The original 2D heap view remains available as a lightweight fallback inside the simulator.

The final 3D scenes are dynamically loaded on the client, cap device pixel ratio, use bounded animation/history data, and reduce shadow/particle work where it does not improve the visualization.
