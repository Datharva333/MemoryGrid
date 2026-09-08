export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">The Project</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">About MemoryGrid</h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-400">
          <p>
            MemoryGrid is an educational project for visualizing how computer memory evolved and how dynamic memory allocation works.
          </p>
          <p>
            Its main interactive feature is a heap simulator implementing First Fit, Best Fit, and Worst Fit allocation with deallocation, block coalescing, utilization, and external-fragmentation measurements. Three.js scenes turn the heap, hardware and memory timeline into spatial visualizations rather than static diagrams.
          </p>
          <p>
            The project stays browser-first: allocation logic runs locally, 3D scenes are loaded only when needed, and there is no database or account system.
          </p>
        </div>
      </div>
    </main>
  );
}
