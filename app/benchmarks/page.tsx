import BenchmarkExplorer from "@/components/BenchmarkExplorer";

export default function BenchmarksPage() {
  return (
    <main className="page-grid min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Comparison</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">Benchmarks</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          The same deterministic workload is executed with all three allocation strategies. Switch metrics to compare the outcome visually.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-[#101720]/80 p-6">
          <p className="text-sm font-medium text-slate-300">Test workload</p>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-500">
            ALLOC 180 → ALLOC 300 → ALLOC 120 → ALLOC 160 → FREE P2 → FREE P4 → ALLOC 140 → ALLOC 250
          </p>
        </div>

        <BenchmarkExplorer />

        <p className="mt-5 text-sm leading-6 text-slate-600">
          This is an illustrative comparison, not a real-world performance benchmark. Different workloads can produce different results.
        </p>
      </div>
    </main>
  );
}
