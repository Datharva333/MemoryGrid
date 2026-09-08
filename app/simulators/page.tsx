import MemoryAllocationSimulator from "@/components/MemoryAllocationSimulator";

export default function SimulatorsPage() {
  return (
    <main className="page-grid min-h-screen px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Interactive Systems</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">Memory Allocation</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Allocate, free, and fragment a simulated heap. Switch strategies at any time and watch the same memory state behave differently.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            ["1", "Choose", "Select First Fit, Best Fit, or Worst Fit."],
            ["2", "Allocate", "Enter a size or load a prepared heap state."],
            ["3", "Observe", "Free blocks and watch utilization and fragmentation change."],
          ].map(([step, title, text]) => (
            <div key={step} className="soft-card rounded-xl border border-slate-800 bg-[#101720]/80 p-4">
              <p className="text-xs font-medium text-blue-400">STEP {step}</p>
              <p className="mt-2 font-medium text-white">{title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>

        <MemoryAllocationSimulator />
      </div>
    </main>
  );
}
