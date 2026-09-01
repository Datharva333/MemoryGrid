import MemoryAllocationSimulator from "@/components/MemoryAllocationSimulator";

export default function SimulatorsPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Interactive Systems
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">
            Memory Allocation
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Experiment with dynamic memory allocation strategies
            and observe how different algorithms affect memory
            utilization and fragmentation.
          </p>
        </div>

        <MemoryAllocationSimulator />

      </div>
    </main>
  );
}