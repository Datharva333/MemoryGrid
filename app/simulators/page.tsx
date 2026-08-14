const simulators = [
  {
    title: "Memory Allocation",
    description:
      "Experiment with First Fit, Best Fit, Worst Fit, and Buddy System allocation strategies.",
    status: "Core simulator",
  },
  {
    title: "Cache Simulator",
    description:
      "Explore cache hits, misses, locality, and replacement strategies.",
    status: "Planned",
  },
  {
    title: "Virtual Memory",
    description:
      "Visualize pages, frames, page tables, and virtual-to-physical address translation.",
    status: "Planned",
  },
  {
    title: "Memory Hierarchy",
    description:
      "Compare the capacity, latency, and role of different levels of computer memory.",
    status: "Planned",
  },
];

export default function SimulatorsPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Interactive Systems
        </p>

        <h1 className="mt-3 text-5xl font-bold md:text-7xl">
          Simulators
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Experiment with the mechanisms that determine how operating systems
          and computer architectures use memory.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {simulators.map((simulator) => (
            <div
              key={simulator.title}
              className="rounded-2xl border border-gray-800 bg-[#11161D] p-8 transition hover:-translate-y-1 hover:border-blue-400"
            >
              <span className="text-xs uppercase tracking-widest text-gray-500">
                {simulator.status}
              </span>

              <h2 className="mt-4 text-2xl font-semibold">
                {simulator.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-400">
                {simulator.description}
              </p>

              <button className="mt-8 rounded-lg border border-gray-700 px-5 py-2 text-sm transition hover:border-blue-400 hover:text-blue-400">
                Open Simulator
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}