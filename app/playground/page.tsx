import PlaygroundRunner from "@/components/PlaygroundRunner";

export default function PlaygroundPage() {
  return (
    <main className="page-grid min-h-screen px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Experiment</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">Playground</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Write a small allocation workload, choose a strategy, and inspect the final heap and operation log.
        </p>
        <PlaygroundRunner />
      </div>
    </main>
  );
}
