"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const TimelineScene3D = dynamic(() => import("@/components/three/TimelineScene3D"), {
  ssr: false,
  loading: () => <div className="h-[390px] animate-pulse rounded-3xl border border-slate-800 bg-slate-900/40 sm:h-[460px]" />,
});

const eras = [
  {
    period: "1940s",
    title: "The Beginning of Electronic Memory",
    description:
      "Early electronic computers experimented with several ways of storing binary information. Memory was expensive, physically large, and fundamentally different from the semiconductor memory used today.",
    technology: "Vacuum tubes, delay lines, early magnetic storage",
    significance:
      "The first generations of electronic computers established the need for fast, addressable memory.",
  },
  {
    period: "1950s",
    title: "Magnetic Core Memory",
    description:
      "Magnetic core memory became one of the dominant forms of main memory. Tiny magnetic rings stored individual bits and could retain information without continuous power.",
    technology: "Magnetic core memory",
    significance:
      "Core memory provided reliable random-access storage for many early computers.",
  },
  {
    period: "1960s",
    title: "The Semiconductor Era Begins",
    description:
      "Integrated circuits began changing computer hardware. Semiconductor memory research opened the path toward smaller, faster and increasingly affordable memory systems.",
    technology: "Early semiconductor memory",
    significance:
      "Memory began moving away from large electromechanical and magnetic technologies toward solid-state electronics.",
  },
  {
    period: "1970s",
    title: "DRAM Changes Main Memory",
    description:
      "Dynamic random-access memory made it possible to store bits using very small transistor-and-capacitor structures. DRAM rapidly became an important technology for computer main memory.",
    technology: "DRAM",
    significance:
      "Higher density and lower cost made semiconductor main memory increasingly practical.",
  },
  {
    period: "1980s",
    title: "SRAM, DRAM and Personal Computers",
    description:
      "Memory technology continued to improve as personal computers became widespread. Different types of RAM began taking specialized roles inside increasingly complex systems.",
    technology: "SRAM, DRAM, cache memory",
    significance:
      "The memory hierarchy became increasingly important for balancing speed, capacity and cost.",
  },
  {
    period: "1990s",
    title: "Synchronous Memory",
    description:
      "Synchronous DRAM coordinated memory operations with the system clock, improving the ability of memory to keep up with increasingly fast processors.",
    technology: "SDRAM",
    significance:
      "Memory interfaces became more tightly synchronized with processor and system architecture.",
  },
  {
    period: "2000s",
    title: "The DDR Generation",
    description:
      "Double Data Rate memory technologies increased effective transfer rates by transferring data on both edges of the clock signal.",
    technology: "DDR, DDR2, DDR3",
    significance:
      "Memory bandwidth increased substantially while the basic DRAM architecture continued to evolve.",
  },
  {
    period: "2010s",
    title: "High Bandwidth and Flash",
    description:
      "Modern systems increasingly combined multiple memory technologies. DDR4 became common while NAND flash transformed persistent storage.",
    technology: "DDR4, NAND Flash, HBM",
    significance:
      "The distinction between memory technologies became increasingly tied to performance, power and workload requirements.",
  },
  {
    period: "2020s",
    title: "Memory for Massive Computing",
    description:
      "Modern processors, GPUs and AI accelerators require enormous memory bandwidth. DDR5 and high-bandwidth memory technologies continue pushing the limits of capacity and throughput.",
    technology: "DDR5, HBM, advanced DRAM",
    significance:
      "Memory bandwidth has become a critical factor in modern computing and artificial intelligence.",
  },
];

export default function TimelinePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(false);
  const selectedEra = eras[selectedIndex];
  const progress = useMemo(() => ((selectedIndex + 1) / eras.length) * 100, [selectedIndex]);

  useEffect(() => {
    if (!autoTour) return;

    const timer = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % eras.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [autoTour]);

  function selectEra(index: number) {
    setAutoTour(false);
    setSelectedIndex(index);
  }

  function move(direction: -1 | 1) {
    setAutoTour(false);
    setSelectedIndex((current) => Math.min(eras.length - 1, Math.max(0, current + direction)));
  }

  return (
    <main className="page-grid min-h-screen px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">History of Computer Memory</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">Memory Through Time</h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Select an era to see how memory technology changed from room-sized early systems to modern high-bandwidth memory.
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600">3D evolution path</p>
            <button
              type="button"
              onClick={() => setAutoTour((current) => !current)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                autoTour
                  ? "border-blue-400/60 bg-blue-400/10 text-blue-200"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {autoTour ? "Pause tour" : "▶ Auto tour"}
            </button>
          </div>
          <TimelineScene3D
            periods={eras.map((era) => era.period)}
            selectedIndex={selectedIndex}
            onSelect={selectEra}
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <span>{selectedEra.period}</span>
          <span>{selectedIndex + 1} / {eras.length}</span>
        </div>
        <div className="mb-10 h-1 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-blue-400 transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="relative mb-12 overflow-x-auto pb-2">
          <div className="relative flex min-w-max gap-3 lg:min-w-0 lg:grid lg:grid-cols-9">
            {eras.map((era, index) => {
              const selected = selectedIndex === index;
              return (
                <button
                  key={era.period}
                  type="button"
                  onClick={() => selectEra(index)}
                  className={`w-32 rounded-xl border p-4 text-left transition-all duration-200 lg:w-auto lg:text-center ${
                    selected
                      ? "border-blue-400/70 bg-blue-400/10 text-white"
                      : "border-slate-800 bg-[#101720]/85 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <span className={`text-sm font-semibold ${selected ? "text-blue-300" : "text-slate-500"}`}>
                    {era.period}
                  </span>
                  <span className="mt-2 block text-xs leading-5">{era.technology}</span>
                </button>
              );
            })}
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-medium text-blue-300">{selectedEra.period}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  disabled={selectedIndex === 0}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  disabled={selectedIndex === eras.length - 1}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{selectedEra.title}</h2>
            <p className="mt-6 text-base leading-8 text-slate-400">{selectedEra.description}</p>
          </div>

          <div className="space-y-4">
            <div className="soft-card rounded-2xl border border-slate-800 bg-[#101720]/85 p-6">
              <p className="text-xs uppercase tracking-wider text-slate-600">Technology</p>
              <p className="mt-3 text-lg font-medium text-white">{selectedEra.technology}</p>
            </div>
            <div className="soft-card rounded-2xl border border-slate-800 bg-[#101720]/85 p-6">
              <p className="text-xs uppercase tracking-wider text-slate-600">Why it matters</p>
              <p className="mt-3 leading-7 text-slate-400">{selectedEra.significance}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
