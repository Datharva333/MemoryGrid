import Link from "next/link";
import HeroMemoryPreview from "@/components/HeroMemoryPreview";

export default function Hero() {
  return (
    <section className="page-grid border-b border-slate-800/70">
      <div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/5 px-3 py-1.5 text-xs font-medium text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Computer memory, visualized
          </div>

          <h1 className="text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            Understand memory by seeing it work.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Explore the evolution of computer memory, then experiment with allocation strategies and fragmentation directly in your browser.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/simulators"
              className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Open Simulator
            </Link>

            <Link
              href="/timeline"
              className="rounded-lg border border-slate-700 bg-slate-950/30 px-6 py-3 font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-slate-500"
            >
              View Timeline
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>First / Best / Worst Fit</span>
            <span>Live fragmentation</span>
            <span>No backend required</span>
          </div>
        </div>

        <HeroMemoryPreview />
      </div>
    </section>
  );
}
