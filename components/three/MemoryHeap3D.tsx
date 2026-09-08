"use client";

import { ContactShadows, Html, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, type Group } from "three";
import type { MemoryBlock } from "@/lib/memory";

const allocatedColors = ["#2563eb", "#0284c7", "#0d9488", "#4f46e5", "#0891b2", "#1d4ed8"];

function colorFor(block: MemoryBlock) {
  if (block.status === "free") return "#182331";
  const processId = block.processId ?? 1;
  return allocatedColors[(processId - 1) % allocatedColors.length];
}

function HeapBlock({
  block,
  totalSize,
  selected,
  onSelect,
}: {
  block: MemoryBlock;
  totalSize: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const sceneWidth = 9.4;
  const width = Math.max(0.08, (block.size / totalSize) * sceneWidth);
  const x = (block.start / totalSize) * sceneWidth - sceneWidth / 2 + width / 2;
  const allocated = block.status === "allocated";
  const targetY = allocated ? 0.35 : -0.03;
  const targetHeight = allocated ? 1.45 : 0.78;

  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = MathUtils.lerp(group.current.position.y, targetY + (hovered ? 0.11 : 0), 0.11);
    const targetScale = selected ? 1.035 : 1;
    group.current.scale.y = MathUtils.lerp(group.current.scale.y, targetScale, 0.12);
  });

  return (
    <group ref={group} position={[x, targetY, 0]}>
      <RoundedBox
        args={[Math.max(0.06, width - 0.045), targetHeight, 1.35]}
        radius={Math.min(0.12, width / 4)}
        smoothness={3}
        castShadow
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <meshStandardMaterial
          color={colorFor(block)}
          emissive={allocated ? colorFor(block) : "#000000"}
          emissiveIntensity={selected ? 0.42 : allocated ? 0.08 : 0}
          roughness={allocated ? 0.34 : 0.7}
          metalness={allocated ? 0.52 : 0.12}
        />
      </RoundedBox>

      {(selected || hovered) && width > 0.35 ? (
        <Html center position={[0, targetHeight / 2 + 0.28, 0]} distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-md border border-slate-700/80 bg-slate-950/90 px-2 py-1 text-[10px] font-medium text-slate-200 shadow-xl backdrop-blur">
            {allocated ? `P${block.processId}` : "FREE"} · {block.size} KB
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function HeapScene({
  blocks,
  totalSize,
  selectedId,
  onSelect,
}: {
  blocks: MemoryBlock[];
  totalSize: number;
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const tickPositions = useMemo(() => [-4.7, -2.35, 0, 2.35, 4.7], []);

  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight
        castShadow
        position={[5, 6, 5]}
        intensity={2.1}
        color="#dbeafe"
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <pointLight position={[-4, 1, 3]} intensity={3.8} color="#2563eb" distance={9} />
      <pointLight position={[4, 3, -1]} intensity={2.4} color="#38bdf8" distance={8} />

      <group rotation={[-0.08, 0, 0]}>
        {blocks.map((block) => (
          <HeapBlock
            key={`${block.id}-${block.start}`}
            block={block}
            totalSize={totalSize}
            selected={selectedId === block.id}
            onSelect={() => onSelect(block.id)}
          />
        ))}

        <mesh position={[0, -0.53, 0]} receiveShadow>
          <boxGeometry args={[9.75, 0.08, 1.65]} />
          <meshStandardMaterial color="#0a111a" roughness={0.78} metalness={0.18} />
        </mesh>

        {tickPositions.map((x, index) => (
          <mesh key={x} position={[x, -0.46, 0.92]}>
            <boxGeometry args={[0.018, 0.07, 0.18]} />
            <meshStandardMaterial color={index === 0 || index === tickPositions.length - 1 ? "#60a5fa" : "#475569"} />
          </mesh>
        ))}
      </group>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.46} scale={11} blur={2.4} far={3.5} resolution={256} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={8}
        maxDistance={12.5}
        minPolarAngle={0.95}
        maxPolarAngle={1.48}
        minAzimuthAngle={-0.65}
        maxAzimuthAngle={0.65}
      />
    </>
  );
}

export default function MemoryHeap3D({ blocks, totalSize }: { blocks: MemoryBlock[]; totalSize: number }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = blocks.find((block) => block.id === selectedId) ?? null;

  return (
    <div className="three-stage relative h-[360px] overflow-hidden rounded-2xl border border-slate-800 bg-[#070b11] sm:h-[420px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 4.2, 9.2], fov: 39 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
        onPointerMissed={() => setSelectedId(null)}
      >
        <color attach="background" args={["#070b11"]} />
        <fog attach="fog" args={["#070b11", 10, 19]} />
        <HeapScene blocks={blocks} totalSize={totalSize} selectedId={selectedId} onSelect={setSelectedId} />
      </Canvas>

      <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-slate-800/90 bg-slate-950/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 backdrop-blur">
        3D heap · drag / scroll
      </div>

      {selected ? (
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-700/80 bg-slate-950/85 px-4 py-3 text-xs backdrop-blur sm:left-auto sm:right-3 sm:max-w-sm">
          <span className="font-medium text-slate-200">
            {selected.status === "allocated" ? `Process P${selected.processId}` : "Free block"}
          </span>
          <span className="text-slate-500">{selected.size} KB · {selected.start}–{selected.start + selected.size} KB</span>
        </div>
      ) : null}
    </div>
  );
}
