const resources = [
  {
    type: "Open Book",
    title: "Operating Systems: Three Easy Pieces",
    description: "Free operating-systems textbook with chapters on address spaces, memory APIs, paging, and free-space management.",
    href: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
  },
  {
    type: "Open Book",
    title: "xv6 Book",
    description: "A compact teaching operating-system book useful for understanding virtual memory and kernel memory management.",
    href: "https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf",
  },
  {
    type: "Documentation",
    title: "OSDev Memory Allocation",
    description: "Practical notes on physical, virtual, and heap allocation in operating-system development.",
    href: "https://wiki.osdev.org/Memory_Allocation",
  },
  {
    type: "Allocator",
    title: "jemalloc",
    description: "Documentation for a modern general-purpose memory allocator.",
    href: "https://jemalloc.net/",
  },
];

export default function OpenLibraryPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Knowledge Base</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">Open Library</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          A deliberately small collection of free resources for learning how computer memory works.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-gray-800 bg-[#11161D] p-6 transition hover:border-gray-600"
            >
              <span className="text-xs uppercase tracking-widest text-blue-400">{resource.type}</span>
              <h2 className="mt-3 text-xl font-semibold text-white">{resource.title}</h2>
              <p className="mt-3 leading-7 text-gray-400">{resource.description}</p>
              <p className="mt-5 text-sm text-blue-400">Open resource ↗</p>
            </a>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Only freely accessible resources are linked here; copyrighted books are not redistributed.
        </p>
      </div>
    </main>
  );
}
