export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">The Project</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">About MemoryGrid</h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-400">
          <p>
            MemoryGrid is a small educational side project for visualizing how computer memory evolved and how dynamic memory allocation works.
          </p>
          <p>
            Its main interactive feature is a heap simulator implementing First Fit, Best Fit, and Worst Fit allocation with deallocation, block coalescing, utilization, and external-fragmentation measurements.
          </p>
          <p>
            The project intentionally stays lightweight: the simulations run in the browser, there is no database or account system, and the interface focuses on quick experimentation rather than feature depth.
          </p>
        </div>
      </div>
    </main>
  );
}
