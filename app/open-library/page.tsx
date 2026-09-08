import { resources } from "@/lib/resources";

export default function OpenLibraryPage() {
  return (
    <main className="page-grid min-h-screen px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">Knowledge Base</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">Open Library</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          A small collection of openly accessible learning material and historical resources related to computer systems and memory.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="soft-card group flex min-h-64 flex-col rounded-2xl border border-slate-800 bg-[#101720]/80 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/5 px-3 py-1 text-xs uppercase tracking-wider text-blue-300">
                  {resource.type}
                </span>
                <span className="text-xs text-slate-600">{resource.era}</span>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-white">{resource.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{resource.author} · {resource.year}</p>
              <p className="mt-4 flex-1 leading-7 text-slate-400">{resource.description}</p>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800 pt-4 text-sm">
                <span className="text-slate-600">{resource.availability}</span>
                <span className="text-blue-300 transition group-hover:translate-x-1">Open ↗</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/30 p-5 text-sm leading-6 text-slate-500">
          MemoryGrid links to external resources rather than redistributing copyrighted material. Availability is described on each card.
        </div>
      </div>
    </main>
  );
}
