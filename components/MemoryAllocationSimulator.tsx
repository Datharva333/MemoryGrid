"use client";

import { useMemo, useState } from "react";
import MemoryVisualizer from "@/components/MemoryVisualizer";
import {
  allocateMemory,
  createInitialMemory,
  freeMemory,
  getExternalFragmentation,
  getFreeMemory,
  getLargestFreeBlock,
  getUsedMemory,
  type MemoryBlock,
  type Strategy,
} from "@/lib/memory";

const MEMORY_SIZE = 1024;

const strategyDescriptions: Record<Strategy, string> = {
  "first-fit": "Uses the first free block large enough for the request.",
  "best-fit": "Uses the smallest free block that can satisfy the request.",
  "worst-fit": "Uses the largest available free block for the request.",
};

type Preset = {
  name: string;
  description: string;
  allocations: number[];
  frees: number[];
};

const presets: Preset[] = [
  {
    name: "Fragmented",
    description: "Creates two separated holes.",
    allocations: [180, 300, 120, 160],
    frees: [2, 4],
  },
  {
    name: "Tight Fit",
    description: "Leaves several differently-sized free areas.",
    allocations: [256, 128, 220, 160, 100],
    frees: [2, 4],
  },
  {
    name: "Busy Heap",
    description: "Fills most of memory with small processes.",
    allocations: [120, 140, 160, 180, 110, 130],
    frees: [2, 5],
  },
];

export default function MemoryAllocationSimulator() {
  const [blocks, setBlocks] = useState<MemoryBlock[]>(createInitialMemory(MEMORY_SIZE));
  const [strategy, setStrategy] = useState<Strategy>("first-fit");
  const [requestSize, setRequestSize] = useState(128);
  const [nextProcessId, setNextProcessId] = useState(1);
  const [logs, setLogs] = useState<string[]>(["Memory initialized with 1024 KB."]);

  const usedMemory = useMemo(() => getUsedMemory(blocks), [blocks]);
  const freeMemoryAmount = useMemo(() => getFreeMemory(blocks), [blocks]);
  const largestFreeBlock = useMemo(() => getLargestFreeBlock(blocks), [blocks]);
  const utilization = Math.round((usedMemory / MEMORY_SIZE) * 100);
  const fragmentation = getExternalFragmentation(blocks);
  const allocatedProcesses = blocks.filter((block) => block.status === "allocated");

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

    const result = allocateMemory(blocks, requestSize, strategy, nextProcessId);
    setBlocks(result.blocks);
    addLog(result.message);

    if (result.success) setNextProcessId((id) => id + 1);
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

  function loadPreset(preset: Preset) {
    let currentBlocks = createInitialMemory(MEMORY_SIZE);
    let currentProcessId = 1;
    const newLogs: string[] = [];

    for (const size of preset.allocations) {
      const result = allocateMemory(currentBlocks, size, strategy, currentProcessId);
      currentBlocks = result.blocks;
      newLogs.push(result.message);
      if (result.success) currentProcessId += 1;
    }

    for (const processId of preset.frees) {
      const result = freeMemory(currentBlocks, processId);
      currentBlocks = result.blocks;
      newLogs.push(result.message);
    }

    setBlocks(currentBlocks);
    setNextProcessId(currentProcessId);
    setLogs([`${preset.name} preset loaded. Try another allocation.`, ...newLogs.reverse()].slice(0, 8));
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-2xl p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-500" htmlFor="allocator-strategy">
              Allocation Strategy
            </label>
            <select
              id="allocator-strategy"
              value={strategy}
              onChange={(event) => setStrategy(event.target.value as Strategy)}
              className="w-full rounded-lg border border-slate-700 bg-[#0A0F16] px-4 py-3 text-sm outline-none focus:border-blue-400"
            >
              <option value="first-fit">First Fit</option>
              <option value="best-fit">Best Fit</option>
              <option value="worst-fit">Worst Fit</option>
            </select>
            <p className="mt-2 text-xs leading-5 text-slate-600">{strategyDescriptions[strategy]}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500" htmlFor="allocation-size">
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
              className="w-full rounded-lg border border-slate-700 bg-[#0A0F16] px-4 py-3 text-sm outline-none focus:border-blue-400"
            />
            <p className="mt-2 text-xs text-slate-600">Largest free block: {largestFreeBlock} KB</p>
          </div>

          <div className="flex items-start md:items-end">
            <button
              type="button"
              onClick={handleAllocate}
              className="w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Allocate Memory
            </button>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-wider text-slate-600">Quick states</span>
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => loadPreset(preset)}
                title={preset.description}
                className="rounded-lg border border-slate-700 bg-slate-950/30 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/60 hover:text-blue-300"
              >
                {preset.name}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg px-4 py-2 text-sm text-slate-500 transition hover:text-red-300"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Physical Memory</h2>
            <p className="mt-1 text-sm text-slate-500">1024 KB simulated heap</p>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-950/40 px-3 py-1 text-xs text-slate-400">
            {strategy.replace("-", " ").toUpperCase()}
          </span>
        </div>
        <MemoryVisualizer blocks={blocks} totalSize={MEMORY_SIZE} />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Memory Used" value={`${usedMemory} KB`} detail={`${utilization}% of heap`} />
        <StatCard label="Memory Free" value={`${freeMemoryAmount} KB`} detail={`${MEMORY_SIZE - usedMemory} KB available`} />
        <StatCard label="Largest Hole" value={`${largestFreeBlock} KB`} detail="Largest continuous free block" />
        <StatCard label="Fragmentation" value={`${fragmentation}%`} detail="External fragmentation" accent />
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Allocated Processes</h2>
            <p className="mt-1 text-sm text-slate-500">Free a process to create holes and observe coalescing.</p>
          </div>
          <span className="shrink-0 text-sm text-slate-500">{allocatedProcesses.length} active</span>
        </div>

        {allocatedProcesses.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-600">
            No processes allocated. Use a quick state or allocate your first process.
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allocatedProcesses.map((block) => (
              <div
                key={block.processId}
                className="soft-card flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/25 p-4"
              >
                <div>
                  <p className="font-medium text-white">P{block.processId}</p>
                  <p className="text-sm text-slate-500">{block.size} KB · starts at {block.start} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFree(block.processId!)}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-red-400/60 hover:text-red-300"
                >
                  Free
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Operation Log</h2>
          <span className="text-xs text-slate-600">Newest first</span>
        </div>
        <div className="mt-4 space-y-2" aria-live="polite">
          {logs.map((log, index) => (
            <div
              key={`${log}-${index}`}
              className={`rounded-lg border px-4 py-3 font-mono text-xs leading-5 ${
                index === 0
                  ? "border-blue-400/20 bg-blue-400/5 text-slate-300"
                  : "border-transparent bg-[#0A0F16] text-slate-500"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  accent = false,
}: {
  label: string;
  value: string;
  detail: string;
  accent?: boolean;
}) {
  return (
    <div className="soft-card rounded-2xl border border-slate-800 bg-[#101720]/85 p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-semibold ${accent ? "text-blue-300" : "text-white"}`}>{value}</p>
      <p className="mt-2 text-xs text-slate-600">{detail}</p>
    </div>
  );
}
