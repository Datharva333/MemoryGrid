"use client";

import { useMemo, useState } from "react";
import {
  allocateMemory,
  createInitialMemory,
  freeMemory,
  getExternalFragmentation,
  getFreeMemory,
  getLargestFreeBlock,
  getUsedMemory,
  type Strategy,
} from "@/lib/memory";

const MEMORY_SIZE = 1024;
const strategies: { key: Strategy; label: string }[] = [
  { key: "first-fit", label: "First Fit" },
  { key: "best-fit", label: "Best Fit" },
  { key: "worst-fit", label: "Worst Fit" },
];

type Operation =
  | { type: "alloc"; size: number }
  | { type: "free"; processId: number };

const workload: Operation[] = [
  { type: "alloc", size: 180 },
  { type: "alloc", size: 300 },
  { type: "alloc", size: 120 },
  { type: "alloc", size: 160 },
  { type: "free", processId: 2 },
  { type: "free", processId: 4 },
  { type: "alloc", size: 140 },
  { type: "alloc", size: 250 },
];

type Metric = "fragmentation" | "utilization" | "largestFree";

const metricMeta: Record<Metric, { label: string; suffix: string; max: number }> = {
  fragmentation: { label: "Fragmentation", suffix: "%", max: 100 },
  utilization: { label: "Utilization", suffix: "%", max: 100 },
  largestFree: { label: "Largest free block", suffix: " KB", max: MEMORY_SIZE },
};

function run(strategy: Strategy) {
  let blocks = createInitialMemory(MEMORY_SIZE);
  let nextProcessId = 1;
  let successes = 0;

  for (const operation of workload) {
    if (operation.type === "alloc") {
      const result = allocateMemory(blocks, operation.size, strategy, nextProcessId);
      blocks = result.blocks;
      if (result.success) {
        successes += 1;
        nextProcessId += 1;
      }
    } else {
      blocks = freeMemory(blocks, operation.processId).blocks;
    }
  }

  const used = getUsedMemory(blocks);
  return {
    used,
    free: getFreeMemory(blocks),
    utilization: Math.round((used / MEMORY_SIZE) * 100),
    fragmentation: getExternalFragmentation(blocks),
    largestFree: getLargestFreeBlock(blocks),
    successes,
  };
}

export default function BenchmarkExplorer() {
  const [metric, setMetric] = useState<Metric>("fragmentation");
  const results = useMemo(
    () => strategies.map((strategy) => ({ ...strategy, result: run(strategy.key) })),
    []
  );
  const meta = metricMeta[metric];

  return (
    <div className="mt-10 space-y-6">
      <section className="glass-panel rounded-2xl p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-300">Visual comparison</p>
            <p className="mt-1 text-sm text-slate-500">Switch the metric to compare the same final heap state.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(metricMeta) as Metric[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setMetric(key)}
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  metric === key
                    ? "bg-blue-500 text-white"
                    : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                {metricMeta[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {results.map(({ key, label, result }) => {
            const value = result[metric];
            const width = Math.max(2, Math.min(100, (value / meta.max) * 100));
            return (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-slate-300">{label}</span>
                  <span className="font-mono text-blue-300">{value}{meta.suffix}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-[width] duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#101720]/80">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-800 text-slate-500">
            <tr>
              <th className="px-5 py-4 font-medium">Strategy</th>
              <th className="px-5 py-4 font-medium">Used</th>
              <th className="px-5 py-4 font-medium">Free</th>
              <th className="px-5 py-4 font-medium">Utilization</th>
              <th className="px-5 py-4 font-medium">Fragmentation</th>
              <th className="px-5 py-4 font-medium">Largest hole</th>
              <th className="px-5 py-4 font-medium">Successful allocs</th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ key, label, result }) => (
              <tr key={key} className="border-t border-slate-800/70 text-slate-300 transition hover:bg-slate-800/25">
                <td className="px-5 py-4 font-medium text-white">{label}</td>
                <td className="px-5 py-4">{result.used} KB</td>
                <td className="px-5 py-4">{result.free} KB</td>
                <td className="px-5 py-4">{result.utilization}%</td>
                <td className="px-5 py-4 text-blue-300">{result.fragmentation}%</td>
                <td className="px-5 py-4">{result.largestFree} KB</td>
                <td className="px-5 py-4">{result.successes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
