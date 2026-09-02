"use client";

import { useState } from "react";

export default function PlaygroundPage() {
  const [memorySize, setMemorySize] = useState(1024);
  const [processSize, setProcessSize] = useState(128);
  const [processes, setProcesses] = useState<
    { id: number; size: number }[]
  >([]);

  const [nextProcessId, setNextProcessId] = useState(1);

  return (
    <main className="min-h-screen bg-[#0D1117] px-6 pb-24 pt-32 text-[#E6EDF3]">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
            Experiment
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            Playground
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Build your own memory configuration and experiment
            with how processes are allocated inside it.
          </p>
        </div>


        <section className="grid gap-8 lg:grid-cols-[320px_1fr]">

          {/* Controls */}

          <aside className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

            <h2 className="text-lg font-semibold">
              Configuration
            </h2>

            <div className="mt-6 space-y-6">

              <div>
                <label className="mb-2 block text-sm text-gray-500">
                  Memory Size (KB)
                </label>

                <input
                  type="number"
                  min="128"
                  max="16384"
                  value={memorySize}
                  onChange={(event) =>
                    setMemorySize(
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 outline-none focus:border-blue-400"
                />
              </div>


              <div>
                <label className="mb-2 block text-sm text-gray-500">
                  Process Size (KB)
                </label>

                <input
                  type="number"
                  min="1"
                  value={processSize}
                  onChange={(event) =>
                    setProcessSize(
                      Number(event.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 outline-none focus:border-blue-400"
                />
              </div>


              <button
                onClick={() => {
                  if (processSize <= 0 || processSize > memorySize) {
                    return;
                  }

                  setProcesses((current) => [
                    ...current,
                    {
                      id: nextProcessId,
                      size: processSize,
                    },
                  ]);

                  setNextProcessId((current) => current + 1);
                }}
                className="w-full rounded-lg bg-blue-500 px-5 py-3 font-medium transition hover:bg-blue-600"
              >
                Add Process
              </button>
              <button
                className="w-full rounded-lg border border-gray-700 px-5 py-3 text-sm transition hover:border-gray-500"
              >
                Reset
              </button>

            </div>

          </aside>


          {/* Workspace */}

          <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6 md:p-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  Memory Workspace
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {memorySize} KB available
                </p>
              </div>

              <span className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
                Experimental
              </span>

            </div>


            <div className="mt-8 min-h-40 overflow-hidden rounded-xl border border-gray-700 bg-[#0D1117] p-4">

              {processes.length === 0 ? (

                <div className="flex min-h-32 items-center justify-center text-sm text-gray-600">
                  Empty Memory
                </div>

              ) : (

                <div className="space-y-3">

                  {processes.map((process) => (
                    <div
                      key={process.id}
                      className="flex items-center justify-between rounded-lg border border-blue-400/30 bg-blue-400/10 px-4 py-3"
                    >

                      <span className="font-medium">
                        P{process.id}
                      </span>

                      <span className="text-sm text-gray-400">
                        {process.size} KB
                      </span>

                    </div>
                  ))}

                </div>

              )}

            </div>


            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="rounded-xl border border-gray-800 p-5">
                <p className="text-xs text-gray-600">
                  Memory
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {memorySize} KB
                </p>
              </div>


              <div className="rounded-xl border border-gray-800 p-5">
                <p className="text-xs text-gray-600">
                  Used
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {processes.reduce(
                    (total, process) => total + process.size,
                    0
                  )}{" "}
                  KB
                </p>
              </div>


              <div className="rounded-xl border border-gray-800 p-5">
                <p className="text-xs text-gray-600">
                  Processes
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  0
                </p>
              </div>

            </div>

          </section>

        </section>

      </div>
    </main>
  );
}