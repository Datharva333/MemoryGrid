export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          The Project
        </p>

        <h1 className="mt-3 text-5xl font-bold md:text-7xl">
          About MemoryGrid
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-400">
          <p>
            MemoryGrid is an interactive educational platform focused on the
            evolution, architecture, and management of computer memory.
          </p>

          <p>
            Instead of presenting memory systems only through static
            explanations, the project aims to let users experiment with them
            directly through browser-based simulations.
          </p>

          <p>
            The project combines computer architecture, operating systems,
            data structures, and systems programming into one interactive
            environment.
          </p>
        </div>
      </div>
    </main>
  );
}