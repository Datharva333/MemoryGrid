"use client";

export type MemoryMetricSample = {
  step: number;
  utilization: number;
  fragmentation: number;
  largestFree: number;
  used: number;
};

function toPoints(
  history: MemoryMetricSample[],
  key: "utilization" | "fragmentation",
  width: number,
  height: number,
  paddingX: number,
  paddingY: number
) {
  const count = Math.max(1, history.length - 1);
  return history
    .map((sample, index) => {
      const x = paddingX + (index / count) * (width - paddingX * 2);
      const y = paddingY + ((100 - sample[key]) / 100) * (height - paddingY * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function RealtimeMemoryGraph({
  history,
  totalSize,
}: {
  history: MemoryMetricSample[];
  totalSize: number;
}) {
  const width = 720;
  const height = 230;
  const paddingX = 42;
  const paddingY = 22;
  const utilizationPoints = toPoints(history, "utilization", width, height, paddingX, paddingY);
  const fragmentationPoints = toPoints(history, "fragmentation", width, height, paddingX, paddingY);
  const latest = history[history.length - 1];
  const largestFreePercent = Math.round((latest.largestFree / totalSize) * 100);

  return (
    <section className="glass-panel rounded-2xl p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-blue-400">Live telemetry</p>
          <h2 className="mt-2 text-xl font-semibold">Memory state over time</h2>
          <p className="mt-1 text-sm text-slate-500">
            Every allocate/free operation adds a point. Utilization and external fragmentation share a 0–100% scale.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-2 text-slate-400">
            <i className="h-2.5 w-2.5 rounded-full bg-blue-400" /> Utilization
          </span>
          <span className="flex items-center gap-2 text-slate-400">
            <i className="h-2.5 w-2.5 rounded-full bg-cyan-300" /> Fragmentation
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-[#080d13] p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Line graph showing memory utilization and external fragmentation after each operation"
        >
          {[0, 25, 50, 75, 100].map((value) => {
            const y = paddingY + ((100 - value) / 100) * (height - paddingY * 2);
            return (
              <g key={value}>
                <line
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
                <text x="5" y={y + 4} fill="#64748b" fontSize="10" fontFamily="monospace">
                  {value}%
                </text>
              </g>
            );
          })}

          <polyline
            points={utilizationPoints}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={fragmentationPoints}
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.9"
          />

          {history.map((sample, index) => {
            const count = Math.max(1, history.length - 1);
            const x = paddingX + (index / count) * (width - paddingX * 2);
            const utilY = paddingY + ((100 - sample.utilization) / 100) * (height - paddingY * 2);
            const fragY = paddingY + ((100 - sample.fragmentation) / 100) * (height - paddingY * 2);
            const latestPoint = index === history.length - 1;

            if (!latestPoint && history.length > 14 && index % 2 !== 0) return null;

            return (
              <g key={`${sample.step}-${index}`}>
                <circle cx={x} cy={utilY} r={latestPoint ? 4.5 : 2.4} fill="#60a5fa" />
                <circle cx={x} cy={fragY} r={latestPoint ? 4 : 2.1} fill="#67e8f9" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Current utilization" value={`${latest.utilization}%`} />
        <Metric label="Fragmentation" value={`${latest.fragmentation}%`} />
        <Metric label="Largest contiguous hole" value={`${latest.largestFree} KB`} detail={`${largestFreePercent}% of heap`} />
      </div>
    </section>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">{label}</p>
      <p className="mt-2 font-mono text-lg font-semibold text-slate-200">{value}</p>
      {detail ? <p className="mt-1 text-[10px] text-slate-600">{detail}</p> : null}
    </div>
  );
}
