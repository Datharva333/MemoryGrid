const timeline = [
  {
    year: "1940s",
    name: "Early Electronic Memory",
    description:
      "Early computers experimented with technologies such as delay lines, Williams tubes, and other methods for storing binary information.",
    category: "Early Memory",
  },
  {
    year: "1950s",
    name: "Magnetic Core Memory",
    description:
      "Magnetic core memory became an important form of main memory, storing bits using the magnetic state of small ferrite cores.",
    category: "Magnetic Memory",
  },
  {
    year: "1960s",
    name: "Semiconductor Memory",
    description:
      "Semiconductor technology began replacing earlier magnetic technologies and established the foundation for modern electronic memory.",
    category: "Semiconductor",
  },
  {
    year: "1970s",
    name: "DRAM",
    description:
      "Dynamic RAM became an important technology for dense, relatively inexpensive main memory.",
    category: "RAM",
  },
  {
    year: "1980s",
    name: "SRAM",
    description:
      "Static RAM became widely important for high-speed memory applications, particularly cache memory.",
    category: "RAM",
  },
  {
    year: "1990s",
    name: "SDRAM",
    description:
      "Synchronous DRAM synchronized memory operations with the system clock, improving predictable memory transfers.",
    category: "DRAM",
  },
  {
    year: "2000s",
    name: "DDR",
    description:
      "Double Data Rate memory increased transfer rates by transferring data on both edges of the clock signal.",
    category: "DDR",
  },
  {
    year: "2003",
    name: "DDR2",
    description:
      "DDR2 increased memory transfer rates while improving the efficiency of the memory interface.",
    category: "DDR",
  },
  {
    year: "2007",
    name: "DDR3",
    description:
      "DDR3 continued the progression toward higher bandwidth and improved power efficiency.",
    category: "DDR",
  },
  {
    year: "2014",
    name: "DDR4",
    description:
      "DDR4 increased bandwidth and density while reducing operating voltage compared with earlier generations.",
    category: "DDR",
  },
  {
    year: "2020s",
    name: "DDR5",
    description:
      "DDR5 represents a newer generation of mainstream system memory with substantially increased bandwidth and density.",
    category: "DDR",
  },
  {
    year: "Modern",
    name: "High Bandwidth Memory",
    description:
      "HBM uses vertically stacked memory dies and a very wide interface to provide high memory bandwidth for demanding workloads.",
    category: "High Bandwidth",
  },
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-blue-400">
            Memory Evolution
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            The Memory Timeline
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Explore how computer memory evolved from early experimental
            technologies into the high-bandwidth memory systems used by modern
            computers.
          </p>
        </div>

        <div className="relative border-l border-gray-800 pl-8">
          {timeline.map((item) => (
            <article key={`${item.year}-${item.name}`} className="relative mb-12">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#0D1117] bg-blue-400" />

              <p className="text-sm font-medium text-blue-400">
                {item.year}
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {item.name}
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                {item.description}
              </p>

              <span className="mt-4 inline-block rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
                {item.category}
              </span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}