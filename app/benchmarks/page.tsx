import {
  allocateMemory,
  createInitialMemory,
  freeMemory,
  getExternalFragmentation,
  getFreeMemory,
  getLargestFreeBlock,
  getUsedMemory,
  type Strategy,
} from "@/lib/memory";

const MEMORY_SIZE = 1024;
const strategies: { key: Strategy; label: string }[] = [
  { key: "first-fit", label: "First Fit" },
  { key: "best-fit", label: "Best Fit" },
  { key: "worst-fit", label: "Worst Fit" },
];

type Operation =
  | { type: "alloc"; size: number }
  | { type: "free"; processId: number };

const workload: Operation[] = [
  { type: "alloc", size: 180 },
  { type: "alloc", size: 300 },
  { type: "alloc", size: 120 },
  { type: "alloc", size: 160 },
  { type: "free", processId: 2 },
  { type: "free", processId: 4 },
  { type: "alloc", size: 140 },
  { type: "alloc", size: 250 },
];

function run(strategy: Strategy) {
  let blocks = createInitialMemory(MEMORY_SIZE);
  let nextProcessId = 1;
  let successes = 0;

  for (const operation of workload) {
    if (operation.type === "alloc") {
      const result = allocateMemory(blocks, operation.size, strategy, nextProcessId);
      blocks = result.blocks;
      if (result.success) {
        successes++;
        nextProcessId++;
      }
    } else {
      blocks = freeMemory(blocks, operation.processId).blocks;
    }
  }

  const used = getUsedMemory(blocks);
  return {
    used,
    free: getFreeMemory(blocks),
    utilization: Math.round((used / MEMORY_SIZE) * 100),
    fragmentation: getExternalFragmentation(blocks),
    largestFree: getLargestFreeBlock(blocks),
    successes,
  };
}

export default function BenchmarksPage() {
  const results = strategies.map((strategy) => ({
    ...strategy,
    result: run(strategy.key),
  }));

  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Comparison</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">Benchmarks</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          The same deterministic workload is executed with all three allocation strategies so their resulting fragmentation can be compared directly.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-800 bg-[#11161D] p-6">
          <p className="text-sm font-medium text-gray-300">Test workload</p>
          <p className="mt-3 font-mono text-sm leading-7 text-gray-500">
            ALLOC 180 → ALLOC 300 → ALLOC 120 → ALLOC 160 → FREE P2 → FREE P4 → ALLOC 140 → ALLOC 250
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#11161D] text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Strategy</th>
                <th className="px-5 py-4 font-medium">Used</th>
                <th className="px-5 py-4 font-medium">Free</th>
                <th className="px-5 py-4 font-medium">Utilization</th>
                <th className="px-5 py-4 font-medium">Fragmentation</th>
                <th className="px-5 py-4 font-medium">Largest free block</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ key, label, result }) => (
                <tr key={key} className="border-t border-gray-800 text-gray-300">
                  <td className="px-5 py-4 font-medium text-white">{label}</td>
                  <td className="px-5 py-4">{result.used} KB</td>
                  <td className="px-5 py-4">{result.free} KB</td>
                  <td className="px-5 py-4">{result.utilization}%</td>
                  <td className="px-5 py-4 text-blue-400">{result.fragmentation}%</td>
                  <td className="px-5 py-4">{result.largestFree} KB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-sm leading-6 text-gray-600">
          This is a small illustrative benchmark, not a real-world performance benchmark. Different workloads can produce different winners.
        </p>
      </div>
    </main>
  );
}
