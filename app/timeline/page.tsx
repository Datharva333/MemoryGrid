"use client";

import { useState } from "react";

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
  const [selectedEra, setSelectedEra] = useState(eras[0]);

  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            History of Computer Memory
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            Memory Through Time
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Explore how computer memory evolved from early electronic
            machines to the high-bandwidth systems powering modern
            computing.
          </p>
        </div>


        {/* Timeline */}

        <div className="relative mb-16">

          <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-gray-800 lg:block" />

          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-9">

            {eras.map((era) => {

              const selected =
                selectedEra.period === era.period;

              return (
                <button
                  key={era.period}
                  onClick={() => setSelectedEra(era)}
                  className={`relative rounded-xl border p-4 text-left transition-all duration-200 lg:text-center ${
                    selected
                      ? "border-blue-400 bg-blue-400/10"
                      : "border-gray-800 bg-[#11161D] hover:border-gray-600"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      selected
                        ? "text-blue-400"
                        : "text-gray-500"
                    }`}
                  >
                    {era.period}
                  </span>

                  <span className="mt-2 block text-xs leading-5 text-gray-400">
                    {era.technology}
                  </span>
                </button>
              );
            })}

          </div>
        </div>


        {/* Selected era */}

        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">

          <div className="rounded-2xl border border-gray-800 bg-[#11161D] p-8 md:p-10">

            <p className="text-sm font-medium text-blue-400">
              {selectedEra.period}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              {selectedEra.title}
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400">
              {selectedEra.description}
            </p>

          </div>


          <div className="space-y-4">

            <div className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

              <p className="text-xs uppercase tracking-wider text-gray-600">
                Technology
              </p>

              <p className="mt-3 text-lg font-medium">
                {selectedEra.technology}
              </p>

            </div>


            <div className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

              <p className="text-xs uppercase tracking-wider text-gray-600">
                Why It Matters
              </p>

              <p className="mt-3 leading-7 text-gray-400">
                {selectedEra.significance}
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}