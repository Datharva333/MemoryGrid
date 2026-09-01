import PlaygroundRunner from "@/components/PlaygroundRunner";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Experiment</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">Playground</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Write a small allocation workload, choose a strategy, and inspect the final heap state.
        </p>
        <PlaygroundRunner />
      </div>
    </main>
  );
}
