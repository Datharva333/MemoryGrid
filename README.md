# MemoryGrid

MemoryGrid is an interactive educational project for exploring the evolution of computer memory and experimenting with dynamic memory allocation through 2D and 3D visualizations.

The project combines a historical memory timeline with browser-based allocation simulations, live fragmentation metrics, an interactive playground, and lightweight benchmark comparisons.

## Features

- Cinematic **3D memory timeline** with selectable eras and optional auto-tour
- Interactive **First Fit, Best Fit, and Worst Fit** allocation strategies
- Allocate and free memory blocks with adjacent free-block coalescing
- Annotated **3D heap map** with block inspection and memory-address ranges
- 2D heap visualization available as a lightweight fallback
- Real-time graph for **memory utilization and external fragmentation**
- Live metrics for used memory, free memory, utilization, largest free block, and fragmentation
- Preset simulator states for quickly demonstrating fragmentation and allocation behavior
- Scriptable playground using `ALLOC <size>` and `FREE <processId>` commands
- Benchmark comparison using the same workload across all three allocation strategies
- Open learning resources and references
- Responsive dark interface with interactive Three.js visuals

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Three.js**
- **React Three Fiber**
- **Drei**

All allocation simulations run locally in the browser. No backend, database, or authentication system is required.

## Run Locally

### Requirements

- Node.js 20.9+
- npm

### Installation

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Before sharing or deploying the project, verify it with:

```bash
npm run lint
npm run build
```

To run the production build locally:

```bash
npm start
```

## Quick Demo

A short demonstration can be done in this order:

1. Open **Timeline** and start the **3D Auto Tour**.
2. Select different memory generations to move through the 3D timeline.
3. Open **Simulator** and switch to the **3D Heap** view.
4. Load the **Fragmented** preset.
5. Click individual memory blocks to inspect their process ID, size, and address range.
6. Allocate or free blocks and observe the heap update immediately.
7. Watch the **live utilization and fragmentation graph** change after each operation.
8. Open **Playground** and run a custom workload.
9. Open **Benchmarks** to compare First Fit, Best Fit, and Worst Fit.

Example playground workload:

```text
ALLOC 180
ALLOC 300
ALLOC 120
FREE 2
ALLOC 200
```

## How the Simulator Works

The simulator models memory as an ordered collection of allocated and free blocks.

When the user requests an allocation:

1. The selected strategy searches the available free blocks.
2. A suitable block is selected.
3. The block is split when required.
4. A new process block is created.
5. Utilization and fragmentation metrics are recalculated.
6. The 2D/3D visualization and telemetry graph update immediately.

When a process is freed, adjacent free blocks are automatically merged through **coalescing**.

### Allocation Strategies

**First Fit**  
Selects the first free block large enough for the requested allocation.

**Best Fit**  
Selects the smallest free block that can satisfy the request.

**Worst Fit**  
Selects the largest available free block.

## 3D Visualization

MemoryGrid uses Three.js through React Three Fiber and Drei for its main interactive scenes.

The 3D interface includes:

- floating RAM hardware visualization on the homepage
- animated spatial memory timeline
- cinematic camera movement between timeline eras
- annotated heap blocks
- address markers from low to high memory
- selectable allocated and free blocks
- interactive camera rotation and zoom

Three.js scenes are loaded on the client and rendering resolution is capped to keep the interface responsive.

## Real-Time Telemetry

The simulator records memory state after allocation, free, reset, and preset operations.

The live graph tracks:

- memory utilization
- external fragmentation
- largest contiguous free block

History is intentionally bounded so repeated operations do not create unnecessary long-term state or rendering overhead.

## Project Structure

```text
MemoryGrid/
├── app/
│   ├── about/
│   ├── benchmarks/
│   ├── open-library/
│   ├── playground/
│   ├── references/
│   ├── simulators/
│   └── timeline/
├── components/
│   ├── three/
│   │   ├── MemoryHeap3D.tsx
│   │   ├── MemoryModuleScene.tsx
│   │   └── TimelineScene3D.tsx
│   ├── BenchmarkExplorer.tsx
│   ├── MemoryAllocationSimulator.tsx
│   ├── MemoryVisualizer.tsx
│   ├── PlaygroundRunner.tsx
│   └── RealtimeMemoryGraph.tsx
├── lib/
│   ├── memory.ts
│   └── resources.ts
├── public/
├── package.json
└── README.md
```

## Main Routes

```text
/                Home
/timeline        3D memory evolution timeline
/simulators      Memory allocation simulator
/playground      Custom allocation workload runner
/benchmarks      Strategy comparison
/open-library    Learning resources
/references      Project references
/about           Project overview
```

## Performance Approach

To keep the project responsive:

- simulations run entirely in the browser
- Three.js scenes are client-side and isolated from normal content
- device pixel ratio is capped for 3D rendering
- graph history is bounded
- simple geometry is preferred over high-poly models
- the 2D heap remains available as a lightweight alternative
- no backend requests are required during simulation

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
