"use client";

import { useMemo, useState } from "react";
import MemoryVisualizer from "@/components/MemoryVisualizer";
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
  const [strategy, setStrategy] = useState<Strategy>("first-fit");
  const [requestSize, setRequestSize] = useState(128);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [logs, setLogs] = useState<string[]>([
    "Memory initialized with 1024 KB.",
  ]);

  const usedMemory = useMemo(() => getUsedMemory(blocks), [blocks]);
  const freeMemoryAmount = useMemo(() => getFreeMemory(blocks), [blocks]);
  const utilization = Math.round((usedMemory / MEMORY_SIZE) * 100);
  const fragmentation = getExternalFragmentation(blocks);
  const allocatedProcesses = blocks.filter(
    (block) => block.status === "allocated"
  );

  function addLog(message: string) {
    setLogs((current) => [message, ...current].slice(0, 8));
  }

  function handleAllocate() {
    if (!Number.isInteger(requestSize) || requestSize <= 0) {
      addLog("Allocation size must be a positive whole number.");
      return;
    }

    if (requestSize > MEMORY_SIZE) {
      addLog(`Allocation size cannot exceed ${MEMORY_SIZE} KB.`);
      return;
    }

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
    const result = freeMemory(blocks, processId);
    setBlocks(result.blocks);
    addLog(result.message);
  }

  function handleReset() {
    setBlocks(createInitialMemory(MEMORY_SIZE));
    setNextProcessId(1);
    setLogs(["Memory reset to 1024 KB."]);
  }

  function handleRandomWorkload() {
    let currentBlocks = createInitialMemory(MEMORY_SIZE);
    let currentProcessId = 1;
    const sizes = [64, 96, 128, 160, 192, 256];
    const newLogs: string[] = [];

    for (let i = 0; i < 6; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const result = allocateMemory(
        currentBlocks,
        size,
        strategy,
        currentProcessId
      );

      currentBlocks = result.blocks;
      newLogs.push(result.message);

      if (result.success) {
        currentProcessId += 1;
      }
    }

    setBlocks(currentBlocks);
    setNextProcessId(currentProcessId);
    setLogs(["Random workload generated.", ...newLogs].slice(0, 8));
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-gray-500" htmlFor="allocator-strategy">
              Allocation Strategy
            </label>
            <select
              id="allocator-strategy"
              value={strategy}
              onChange={(event) => setStrategy(event.target.value as Strategy)}
              className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-sm outline-none focus:border-blue-400"
            >
              <option value="first-fit">First Fit</option>
              <option value="best-fit">Best Fit</option>
              <option value="worst-fit">Worst Fit</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-500" htmlFor="allocation-size">
              Allocation Size (KB)
            </label>
            <input
              id="allocation-size"
              type="number"
              min="1"
              max={MEMORY_SIZE}
              step="1"
              value={requestSize}
              onChange={(event) => setRequestSize(Number(event.target.value))}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAllocate();
              }}
              className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-sm outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleAllocate}
              className="w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-600"
            >
              Allocate Memory
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRandomWorkload}
            className="rounded-lg border border-gray-700 px-5 py-2 text-sm transition hover:border-blue-400"
          >
            Random Workload
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-700 px-5 py-2 text-sm transition hover:border-red-400 hover:text-red-400"
          >
            Reset
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Physical Memory</h2>
            <p className="mt-1 text-sm text-gray-500">1024 KB total</p>
          </div>
          <span className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
            {strategy.replace("-", " ").toUpperCase()}
          </span>
        </div>
        <MemoryVisualizer blocks={blocks} totalSize={MEMORY_SIZE} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Memory Used" value={`${usedMemory} KB`} />
        <StatCard label="Memory Free" value={`${freeMemoryAmount} KB`} />
        <StatCard label="Utilization" value={`${utilization}%`} />
        <StatCard label="Fragmentation" value={`${fragmentation}%`} />
      </section>

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Allocated Processes</h2>
            <p className="mt-1 text-sm text-gray-500">
              Free individual processes to create holes and observe fragmentation.
            </p>
          </div>
          <span className="shrink-0 text-sm text-gray-500">
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
                  <p className="font-medium">P{block.processId}</p>
                  <p className="text-sm text-gray-500">{block.size} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFree(block.processId!)}
                  className="rounded-lg border border-gray-700 px-3 py-2 text-xs transition hover:border-red-400 hover:text-red-400"
                >
                  Free
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
        <h2 className="text-xl font-semibold">Operation Log</h2>
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
    <div className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
