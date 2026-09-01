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
const DEFAULT_SCRIPT = `ALLOC 180
ALLOC 300
ALLOC 120
FREE 2
ALLOC 200`;

type RunResult = {
  blocks: MemoryBlock[];
  logs: string[];
};

function runScript(script: string, strategy: Strategy): RunResult {
  let blocks = createInitialMemory(MEMORY_SIZE);
  let nextProcessId = 1;
  const logs: string[] = [];

  const lines = script
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return {
      blocks,
      logs: ["Add at least one ALLOC or FREE command."],
    };
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const [rawCommand, rawValue, ...extra] = line.split(/\s+/);
    const command = rawCommand?.toUpperCase();
    const value = Number(rawValue);

    if (extra.length > 0 || !rawValue || !Number.isInteger(value) || value <= 0) {
      logs.push(`Line ${index + 1}: invalid command "${line}".`);
      continue;
    }

    if (command === "ALLOC") {
      if (value > MEMORY_SIZE) {
        logs.push(`Line ${index + 1}: allocation cannot exceed ${MEMORY_SIZE} KB.`);
        continue;
      }

      const result = allocateMemory(blocks, value, strategy, nextProcessId);
      blocks = result.blocks;
      logs.push(`Line ${index + 1}: ${result.message}`);

      if (result.success) {
        nextProcessId += 1;
      }
      continue;
    }

    if (command === "FREE") {
      const result = freeMemory(blocks, value);
      blocks = result.blocks;
      logs.push(`Line ${index + 1}: ${result.message}`);
      continue;
    }

    logs.push(`Line ${index + 1}: unknown command "${rawCommand}".`);
  }

  return { blocks, logs };
}

export default function PlaygroundRunner() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const [strategy, setStrategy] = useState<Strategy>("first-fit");
  const [blocks, setBlocks] = useState<MemoryBlock[]>(
    createInitialMemory(MEMORY_SIZE)
  );
  const [logs, setLogs] = useState<string[]>([
    "Ready. Run the example workload or write your own.",
  ]);

  const used = useMemo(() => getUsedMemory(blocks), [blocks]);
  const free = useMemo(() => getFreeMemory(blocks), [blocks]);
  const fragmentation = useMemo(
    () => getExternalFragmentation(blocks),
    [blocks]
  );

  function handleRun() {
    const result = runScript(script, strategy);
    setBlocks(result.blocks);
    setLogs(result.logs);
  }

  function handleReset() {
    setScript(DEFAULT_SCRIPT);
    setBlocks(createInitialMemory(MEMORY_SIZE));
    setLogs(["Playground reset."]);
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm text-gray-500" htmlFor="strategy">
              Allocation strategy
            </label>
            <select
              id="strategy"
              value={strategy}
              onChange={(event) => setStrategy(event.target.value as Strategy)}
              className="w-full rounded-lg border border-gray-700 bg-[#0D1117] px-4 py-3 text-sm outline-none focus:border-blue-400"
            >
              <option value="first-fit">First Fit</option>
              <option value="best-fit">Best Fit</option>
              <option value="worst-fit">Worst Fit</option>
            </select>
          </div>
        </div>

        <label className="mt-5 mb-2 block text-sm text-gray-500" htmlFor="workload">
          Workload
        </label>
        <textarea
          id="workload"
          value={script}
          onChange={(event) => setScript(event.target.value)}
          spellCheck={false}
          className="h-64 w-full resize-y rounded-xl border border-gray-700 bg-[#0D1117] p-4 font-mono text-sm leading-7 text-gray-200 outline-none focus:border-blue-400"
          aria-describedby="workload-help"
        />
        <p id="workload-help" className="mt-3 text-xs leading-5 text-gray-600">
          Syntax: ALLOC &lt;size in KB&gt; and FREE &lt;process id&gt;. Processes are numbered P1, P2, P3... in allocation order.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRun}
            className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            Run workload
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-700 px-5 py-2.5 text-sm text-gray-300 transition hover:border-gray-500"
          >
            Reset example
          </button>
        </div>
      </section>

      <div className="space-y-6">
        <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Final heap state</h2>
              <p className="mt-1 text-sm text-gray-500">1024 KB simulated heap</p>
            </div>
            <span className="rounded-full border border-gray-800 px-3 py-1 text-xs text-gray-500">
              {strategy.replace("-", " ").toUpperCase()}
            </span>
          </div>
          <MemoryVisualizer blocks={blocks} totalSize={MEMORY_SIZE} compact />

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Metric label="Used" value={`${used} KB`} />
            <Metric label="Free" value={`${free} KB`} />
            <Metric label="Fragmentation" value={`${fragmentation}%`} />
          </div>
        </section>

        <section className="rounded-2xl border border-gray-800 bg-[#11161D] p-6">
          <h2 className="text-xl font-semibold">Run log</h2>
          <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
            {logs.map((log, index) => (
              <div
                key={`${index}-${log}`}
                className="rounded-lg bg-[#0D1117] px-4 py-3 font-mono text-xs leading-5 text-gray-500"
              >
                {log}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#0D1117] p-3">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-200">{value}</p>
    </div>
  );
}
