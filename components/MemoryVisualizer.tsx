import type { MemoryBlock } from "@/lib/memory";

type MemoryVisualizerProps = {
  blocks: MemoryBlock[];
  totalSize: number;
  compact?: boolean;
};

export default function MemoryVisualizer({
  blocks,
  totalSize,
  compact = false,
}: MemoryVisualizerProps) {
  return (
    <div>
      <div
        className={`flex w-full overflow-hidden rounded-xl border border-gray-700 bg-[#0D1117] ${
          compact ? "h-20" : "h-32"
        }`}
      >
        {blocks.map((block) => {
          const width = totalSize > 0 ? (block.size / totalSize) * 100 : 0;
          const allocated = block.status === "allocated";

          return (
            <div
              key={`${block.id}-${block.start}`}
              style={{ width: `${width}%` }}
              className={`relative flex min-w-0 items-center justify-center border-r border-[#0D1117] text-xs transition-[width,background-color] duration-300 ${
                allocated
                  ? "bg-gradient-to-b from-blue-400/90 to-blue-600/80 text-white"
                  : "bg-slate-800/80 text-slate-400"
              }`}
              title={`${allocated ? `P${block.processId}` : "FREE"} — ${block.size} KB`}
            >
              <span className="truncate px-2 font-medium">
                {allocated ? `P${block.processId}` : "FREE"}
              </span>
              {!compact && (
                <span className="absolute bottom-2 hidden opacity-70 sm:block">
                  {block.size} KB
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between text-xs text-gray-600">
        <span>0 KB</span>
        <span>{totalSize} KB</span>
      </div>
    </div>
  );
}
