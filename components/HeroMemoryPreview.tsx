"use client";

import dynamic from "next/dynamic";
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
} from "@/lib/memory";

const MemoryModuleScene = dynamic(() => import("@/components/three/MemoryModuleScene"), {
  ssr: false,
  loading: () => <div className="h-[250px] animate-pulse rounded-2xl bg-slate-900/50 sm:h-[285px]" />,
});

const TOTAL = 512;
const sequence = [96, 144, 72, 120];

export default function HeroMemoryPreview() {
  const [blocks, setBlocks] = useState<MemoryBlock[]>(createInitialMemory(TOTAL));
  const [nextProcessId, setNextProcessId] = useState(1);
  const [step, setStep] = useState(0);

  const used = useMemo(() => getUsedMemory(blocks), [blocks]);
  const free = useMemo(() => getFreeMemory(blocks), [blocks]);
  const fragmentation = useMemo(() => getExternalFragmentation(blocks), [blocks]);
  const allocated = blocks.filter((block) => block.status === "allocated");

  function allocateNext() {
    const size = sequence[step % sequence.length];
    const result = allocateMemory(blocks, size, "first-fit", nextProcessId);
    setBlocks(result.blocks);
    if (result.success) {
      setNextProcessId((id) => id + 1);
      setStep((value) => value + 1);
    }
  }

  function freeOldest() {
    const first = allocated[0];
    if (!first?.processId) return;
    setBlocks(freeMemory(blocks, first.processId).blocks);
  }

  function reset() {
    setBlocks(createInitialMemory(TOTAL));
    setNextProcessId(1);
    setStep(0);
  }

  return (
    <div className="glass-panel depth-panel relative overflow-hidden rounded-3xl p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
      <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <MemoryModuleScene />

      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">Live preview</p>
          <h2 className="mt-2 text-lg font-semibold text-white">512 KB heap</h2>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-400">
          First Fit
        </span>
      </div>

      <div className="mt-6">
        <MemoryVisualizer blocks={blocks} totalSize={TOTAL} compact />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <Metric label="Used" value={`${used} KB`} />
        <Metric label="Free" value={`${free} KB`} />
        <Metric label="Frag." value={`${fragmentation}%`} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={allocateNext}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_8px_24px_rgba(59,130,246,0.22)]"
        >
          Allocate next
        </button>
        <button
          type="button"
          onClick={freeOldest}
          disabled={allocated.length === 0}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:-translate-y-0.5 hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Free oldest
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:text-slate-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-depth rounded-xl border border-slate-800 bg-slate-950/50 px-2 py-3">
      <p className="text-[11px] uppercase tracking-wide text-slate-600">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}
