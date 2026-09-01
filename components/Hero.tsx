import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 pt-20">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.28em] text-blue-400">
          Computer Memory, Visualized
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
          Understand memory by seeing it work.
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
          MemoryGrid is a compact interactive project for exploring the evolution
          of computer memory and experimenting with dynamic memory allocation.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/simulators"
            className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600"
          >
            Open Simulator
          </Link>

          <Link
            href="/timeline"
            className="rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-200 transition hover:border-gray-500"
          >
            View Timeline
          </Link>
        </div>
      </div>
    </section>
  );
}
