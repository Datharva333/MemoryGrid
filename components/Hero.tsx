export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
        Memory<span className="text-blue-400">Grid</span>
      </h1>

      <p className="mt-8 max-w-3xl text-lg text-gray-400 md:text-xl">
        Explore the evolution of computer memory through interactive
        simulations, historical timelines, and hands-on experimentation.
      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button className="rounded-xl bg-blue-500 px-8 py-3 transition hover:bg-blue-600">
          Start Exploring
        </button>

        <button className="rounded-xl border border-gray-700 px-8 py-3 transition hover:border-blue-400">
          View Timeline
        </button>
      </div>
    </section>
  );
}