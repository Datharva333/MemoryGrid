const references = [
  {
    title: "Operating Systems: Three Easy Pieces",
    source: "Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau",
    href: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    note: "Memory APIs, address spaces, paging, and free-space management.",
  },
  {
    title: "xv6: a simple, Unix-like teaching operating system",
    source: "MIT PDOS",
    href: "https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf",
    note: "Teaching reference for virtual memory and operating-system internals.",
  },
  {
    title: "Memory Allocation",
    source: "OSDev Wiki",
    href: "https://wiki.osdev.org/Memory_Allocation",
    note: "Overview of physical, virtual, and heap memory allocation.",
  },
  {
    title: "jemalloc documentation",
    source: "jemalloc project",
    href: "https://jemalloc.net/",
    note: "Reference for a modern general-purpose memory allocator.",
  },
];

export default function ReferencesPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Sources</p>
        <h1 className="mt-3 text-5xl font-bold md:text-7xl">References</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          A compact list of resources used to support the educational material and allocator concepts in MemoryGrid.
        </p>

        <div className="mt-12 space-y-4">
          {references.map((reference, index) => (
            <a
              key={reference.title}
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-gray-800 bg-[#11161D] p-6 transition hover:border-gray-600"
            >
              <p className="text-xs uppercase tracking-widest text-blue-400">
                Reference {index + 1}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-white">
                {reference.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{reference.source}</p>
              <p className="mt-3 leading-7 text-gray-400">{reference.note}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
