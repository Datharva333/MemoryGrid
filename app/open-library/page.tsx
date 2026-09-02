const resources = [
  {
    type: "Book",
    title: "Computer Systems: A Programmer's Perspective",
    description:
      "A systems-oriented resource covering how software interacts with computer hardware and memory.",
  },
  {
    type: "Topic",
    title: "Memory Management",
    description:
      "Resources covering allocation, fragmentation, virtual memory, and related operating-system concepts.",
  },
  {
    type: "Research",
    title: "Original Research & Historical Papers",
    description:
      "A curated collection of legally accessible papers and historical resources related to memory technology.",
  },
];

export default function OpenLibraryPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Knowledge Base
        </p>

        <h1 className="mt-3 text-5xl font-bold md:text-7xl">
          Open Library
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          Books, papers, documentation, and historical resources related to
          computer memory and systems.
        </p>

        <div className="mt-12 space-y-4">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="rounded-2xl border border-gray-800 bg-[#11161D] p-6"
            >
              <span className="text-xs uppercase tracking-widest text-blue-400">
                {resource.type}
              </span>

              <h2 className="mt-3 text-xl font-semibold">
                {resource.title}
              </h2>

              <p className="mt-2 leading-7 text-gray-400">
                {resource.description}
              </p>
            </article>
          ))}

        </div>
      </div>
    </main>
  );
}
