import Link from "next/link";
import Hero from "@/components/Hero";

const sections = [
  {
    number: "01",
    title: "Memory Timeline",
    text: "Move through major memory eras and inspect the technology and significance of each period.",
    href: "/timeline",
  },
  {
    number: "02",
    title: "Allocation Simulator",
    text: "Allocate and free blocks using First Fit, Best Fit, and Worst Fit while watching the heap change.",
    href: "/simulators",
  },
  {
    number: "03",
    title: "Playground",
    text: "Write your own ALLOC and FREE command sequence and execute it with any supported strategy.",
    href: "/playground",
  },
  {
    number: "04",
    title: "Benchmarks",
    text: "Compare strategy outcomes visually using the same deterministic workload.",
    href: "/benchmarks",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-400">Explore the project</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              History on one side. Experimentation on the other.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="soft-card group rounded-2xl border border-slate-800 bg-[#101720]/80 p-7"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="text-xs font-semibold tracking-[0.2em] text-blue-400">{section.number}</span>
                  <span className="text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-300">→</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{section.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-slate-400">{section.text}</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/30 p-5 text-sm leading-6 text-slate-500">
            Everything runs locally in the browser. MemoryGrid does not need a database, account system, or backend service.
          </div>
        </div>
      </section>
    </main>
  );
}
