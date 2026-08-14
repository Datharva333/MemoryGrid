export default function BenchmarksPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Performance
        </p>

        <h1 className="mt-3 text-5xl font-bold md:text-7xl">
          Benchmarks
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Compare memory allocation strategies using the same workload and
          observe differences in fragmentation, utilization, and allocation
          success.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Memory Utilization", "—"],
            ["External Fragmentation", "—"],
            ["Allocation Success", "—"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-800 bg-[#11161D] p-6"
            >
              <p className="text-sm text-gray-500">{title}</p>
              <p className="mt-4 text-4xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}