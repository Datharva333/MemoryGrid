import { resources } from "@/lib/resources";

export default function OpenLibraryPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Knowledge Base
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            Open Library
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Explore books, papers, documentation and archival
            material related to the history and evolution of
            computer memory.
          </p>
        </div>


        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {resources.map((resource) => (
            <article
              key={resource.id}
              className="group flex flex-col rounded-2xl border border-gray-800 bg-[#11161D] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-600"
            >

              <div className="flex items-center justify-between">

                <span className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
                  {resource.type}
                </span>

                <span className="text-xs text-gray-600">
                  {resource.year}
                </span>

              </div>


              <h2 className="mt-6 text-xl font-semibold">
                {resource.title}
              </h2>


              <p className="mt-2 text-sm text-gray-500">
                {resource.author}
              </p>


              <p className="mt-5 flex-1 text-sm leading-7 text-gray-400">
                {resource.description}
              </p>


              <div className="mt-6 border-t border-gray-800 pt-5">

                <p className="text-xs text-gray-600">
                  Availability
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {resource.availability}
                </p>

              </div>


              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-between rounded-lg border border-gray-700 px-4 py-3 text-sm font-medium transition hover:border-blue-400 hover:text-blue-400"
              >
                Open Resource

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

            </article>
          ))}

        </div>

      </div>
    </main>
  );
}