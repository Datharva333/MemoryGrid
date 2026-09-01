"use client";

import { useMemo, useState } from "react";
import {
  allocateMemory,
  createInitialMemory,
  freeMemory,
  getExternalFragmentation,
  getFreeMemory,
  getUsedMemory,
  type MemoryBlock,
  type Strategy,
} from "@/lib/memory";

const MEMORY_SIZE = 1024;

export default function MemoryAllocationSimulator() {
  const [blocks, setBlocks] = useState<MemoryBlock[]>(
    createInitialMemory(MEMORY_SIZE)
  );

  const [strategy, setStrategy] =
    useState<Strategy>("first-fit");

  const [requestSize, setRequestSize] =
    useState(128);

  const [nextProcessId, setNextProcessId] =
    useState(1);

  const [logs, setLogs] = useState<string[]>([
    "Memory initialized with 1024 KB.",
  ]);

  const usedMemory = useMemo(
    () => getUsedMemory(blocks),
    [blocks]
  );

  const freeMemoryAmount = useMemo(
    () => getFreeMemory(blocks),
    [blocks]
  );

  const utilization = Math.round(
    (usedMemory / MEMORY_SIZE) * 100
  );

  const fragmentation =
    getExternalFragmentation(blocks);

  const allocatedProcesses = blocks.filter(
    (block) => block.status === "allocated"
  );

  function addLog(message: string) {
    setLogs((current) =>
      [message, ...current].slice(0, 8)
    );
  }

  function handleAllocate() {
    const result = allocateMemory(
      blocks,
      requestSize,
      strategy,
      nextProcessId
    );

    setBlocks(result.blocks);
    addLog(result.message);

    if (result.success) {
      setNextProcessId((id) => id + 1);
    }
  }

  function handleFree(processId: number) {
    const result = freeMemory(
      blocks,
      processId
    );

    setBlocks(result.blocks);
    addLog(result.message);
  }

  function handleReset() {
    setBlocks(
      createInitialMemory(MEMORY_SIZE)
    );

    setNextProcessId(1);

    setLogs([
      "Memory reset to 1024 KB.",
    ]);
  }

  function handleRandomWorkload() {
    let currentBlocks =
      createInitialMemory(MEMORY_SIZE);

    let currentProcessId = 1;

    const sizes = [
      64,
      96,
      128,
      160,
      192,
      256,
    ];

    const newLogs: string[] = [];

    for (let i = 0; i < 6; i++) {
      const size =
        sizes[
          Math.floor(
            Math.random() * sizes.length
          )
        ];

      const result = allocateMemory(
        currentBlocks,
        size,
        strategy,
        currentProcessId
      );

      currentBlocks = result.blocks;

      newLogs.push(result.message);

      if (result.success) {
        currentProcessId++;
      }
    }

    setBlocks(currentBlocks);

    setNextProcessId(currentProcessId);

    setLogs([
      "Random workload generated.",
      ...newLogs,
    ].slice(0, 8));
  }

  return (
    <div className="space-y-8">

      {/* Controls */}

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

        <div className="grid gap-6 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Allocation Strategy
            </label>

            <select
              value={strategy}
              onChange={(event) =>
                setStrategy(
                  event.target.value as Strategy
                )
              }
              className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-sm outline-none focus:border-blue-400"
            >
              <option value="first-fit">
                First Fit
              </option>

              <option value="best-fit">
                Best Fit
              </option>

              <option value="worst-fit">
                Worst Fit
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Allocation Size (KB)
            </label>

            <input
              type="number"
              min="1"
              max={MEMORY_SIZE}
              value={requestSize}
              onChange={(event) =>
                setRequestSize(
                  Number(event.target.value)
                )
              }
              className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleAllocate}
              className="w-full rounded-lg bg-blue-500 px-5 py-3 font-medium transition hover:bg-blue-600"
            >
              Allocate Memory
            </button>
          </div>

        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <button
            onClick={handleRandomWorkload}
            className="rounded-lg border border-gray-700 px-5 py-2 text-sm transition hover:border-blue-400"
          >
            Random Workload
          </button>

          <button
            onClick={handleReset}
            className="rounded-lg border border-gray-700 px-5 py-2 text-sm transition hover:border-red-400 hover:text-red-400"
          >
            Reset
          </button>

        </div>

      </section>


      {/* Memory visualization */}

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Physical Memory
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              1024 KB total
            </p>
          </div>

          <span className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
            {strategy
              .replace("-", " ")
              .toUpperCase()}
          </span>

        </div>

        <div className="flex h-32 w-full overflow-hidden rounded-xl border border-gray-700 bg-[#0D1117]">

          {blocks.map((block) => {

            const width =
              (block.size / MEMORY_SIZE) * 100;

            return (
              <div
                key={`${block.id}-${block.start}`}
                style={{
                  width: `${width}%`,
                }}
                className={`group relative flex min-w-0 items-center justify-center border-r border-[#0D1117] text-xs transition-all duration-300 ${
                  block.status === "allocated"
                    ? "bg-blue-500/80 text-white"
                    : "bg-gray-800 text-gray-500"
                }`}
                title={`${block.status === "allocated" ? `P${block.processId}` : "FREE"} — ${block.size} KB`}
              >

                <span className="truncate px-2">
                  {block.status === "allocated"
                    ? `P${block.processId}`
                    : "FREE"}
                </span>

                <span className="absolute bottom-2 opacity-60">
                  {block.size} KB
                </span>

              </div>
            );

          })}

        </div>

        <div className="mt-4 flex justify-between text-xs text-gray-600">
          <span>0 KB</span>
          <span>1024 KB</span>
        </div>

      </section>


      {/* Statistics */}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          label="Memory Used"
          value={`${usedMemory} KB`}
        />

        <StatCard
          label="Memory Free"
          value={`${freeMemoryAmount} KB`}
        />

        <StatCard
          label="Utilization"
          value={`${utilization}%`}
        />

        <StatCard
          label="Fragmentation"
          value={`${fragmentation}%`}
        />

      </section>


      {/* Allocated processes */}

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Allocated Processes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Free individual processes to
              create fragmentation.
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {allocatedProcesses.length} active
          </span>

        </div>

        {allocatedProcesses.length === 0 ? (

          <div className="mt-6 rounded-xl border border-dashed border-gray-800 p-8 text-center text-sm text-gray-600">
            No processes allocated.
          </div>

        ) : (

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {allocatedProcesses.map((block) => (

              <div
                key={block.processId}
                className="flex items-center justify-between rounded-xl border border-gray-800 p-4"
              >

                <div>
                  <p className="font-medium">
                    P{block.processId}
                  </p>

                  <p className="text-sm text-gray-500">
                    {block.size} KB
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleFree(
                      block.processId!
                    )
                  }
                  className="rounded-lg border border-gray-700 px-3 py-2 text-xs transition hover:border-red-400 hover:text-red-400"
                >
                  Free
                </button>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* Operation log */}

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">

        <h2 className="text-xl font-semibold">
          Operation Log
        </h2>

        <div className="mt-4 space-y-2">

          {logs.map((log, index) => (

            <div
              key={`${log}-${index}`}
              className="rounded-lg bg-[#0D1117] px-4 py-3 font-mono text-xs text-gray-500"
            >
              {log}
            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111] p-6">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}