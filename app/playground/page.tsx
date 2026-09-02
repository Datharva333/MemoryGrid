export default function PlaygroundPage() {
  const [memorySize, setMemorySize] = useState(1024);
  const [processSize, setProcessSize] = useState(128);
  const [processes, setProcesses] = useState<
    { id: number; size: number }[]
  >([]);

  const [nextProcessId, setNextProcessId] = useState(1);

  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Experiment
        </p>

        <h1 className="mt-3 text-5xl font-bold md:text-7xl">
          Playground
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Create your own memory workloads and observe how different
          allocation strategies respond.
        </p>

        <div className="mt-12 rounded-2xl border border-gray-800 bg-[#11161D] p-6">
          <h2 className="text-xl font-semibold">
            Custom Workload
          </h2>

          <p className="mt-2 text-gray-500">
            Enter allocation and deallocation operations to experiment with
            memory management.
          </p>

          <textarea
            className="mt-6 h-64 w-full resize-none rounded-xl border border-gray-800 bg-[#0D1117] p-4 font-mono text-sm text-gray-300 outline-none focus:border-blue-400"
            placeholder={`ALLOC 128
ALLOC 256
FREE 128
ALLOC 64`}
          />

          <button className="mt-4 rounded-lg bg-blue-500 px-6 py-3 font-medium transition hover:bg-blue-600">
            Run Experiment
          </button>
        </div>
      </div>
    </main>
  );
}
