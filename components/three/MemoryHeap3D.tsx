"use client";

import { ContactShadows, Html, Line, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, type Group } from "three";
import type { MemoryBlock } from "@/lib/memory";

const SCENE_WIDTH = 9.4;
const allocatedColors = ["#2563eb", "#0284c7", "#0d9488", "#4f46e5", "#0891b2", "#1d4ed8"];

function colorFor(block: MemoryBlock) {
  if (block.status === "free") return "#182331";
  const processId = block.processId ?? 1;
  return allocatedColors[(processId - 1) % allocatedColors.length];
}

function addressToX(address: number, totalSize: number) {
  return (address / totalSize) * SCENE_WIDTH - SCENE_WIDTH / 2;
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
  const width = Math.max(0.08, (block.size / totalSize) * SCENE_WIDTH);
  const x = addressToX(block.start, totalSize) + width / 2;
  const allocated = block.status === "allocated";
  const targetY = allocated ? 0.35 : -0.03;
  const targetHeight = allocated ? 1.45 : 0.78;
  const showLabel = selected || hovered || width > 0.72;

  useFrame((_, delta) => {
    if (!group.current) return;
    const ease = 1 - Math.exp(-delta * 8);
    group.current.position.y = MathUtils.lerp(
      group.current.position.y,
      targetY + (hovered ? 0.1 : 0),
      ease
    );
    const targetScale = selected ? 1.045 : 1;
    group.current.scale.y = MathUtils.lerp(group.current.scale.y, targetScale, ease);
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
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={colorFor(block)}
          emissive={allocated ? colorFor(block) : "#000000"}
          emissiveIntensity={selected ? 0.5 : allocated ? 0.09 : 0}
          roughness={allocated ? 0.34 : 0.7}
          metalness={allocated ? 0.52 : 0.12}
        />
      </RoundedBox>

      {showLabel ? (
        <>
          {(selected || hovered) && width > 0.18 ? (
            <Line
              points={[
                [0, targetHeight / 2 + 0.02, 0],
                [0, targetHeight / 2 + 0.28, 0],
              ]}
              color={allocated ? "#60a5fa" : "#64748b"}
              lineWidth={1}
              transparent
              opacity={0.7}
            />
          ) : null}
          <Html
            center
            position={[0, targetHeight / 2 + (selected || hovered ? 0.42 : 0.2), 0]}
            distanceFactor={8}
            style={{ pointerEvents: "none" }}
          >
            <div
              className={`whitespace-nowrap rounded-md border px-2 py-1 text-[9px] font-medium backdrop-blur ${
                selected || hovered
                  ? "border-slate-600/90 bg-slate-950/95 text-slate-100 shadow-xl"
                  : "border-slate-800/80 bg-slate-950/75 text-slate-500"
              }`}
            >
              {allocated ? `P${block.processId}` : "FREE"}
              {(selected || hovered) && <span className="text-slate-500"> · {block.size} KB</span>}
            </div>
          </Html>
        </>
      ) : null}
    </group>
  );
}

function AddressRuler({ totalSize }: { totalSize: number }) {
  const ticks = useMemo(
    () => Array.from({ length: 5 }, (_, index) => Math.round((totalSize / 4) * index)),
    [totalSize]
  );

  return (
    <group>
      {ticks.map((address) => {
        const x = addressToX(address, totalSize);
        return (
          <group key={address} position={[x, -0.44, 0.92]}>
            <mesh>
              <boxGeometry args={[0.018, 0.09, 0.18]} />
              <meshStandardMaterial color={address === 0 || address === totalSize ? "#60a5fa" : "#475569"} />
            </mesh>
            <Html center position={[0, -0.22, 0]} distanceFactor={9} style={{ pointerEvents: "none" }}>
              <span className="whitespace-nowrap font-mono text-[8px] text-slate-600">{address} KB</span>
            </Html>
          </group>
        );
      })}
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
  return (
    <>
      <ambientLight intensity={0.92} />
      <directionalLight
        castShadow
        position={[5, 6, 5]}
        intensity={1.9}
        color="#dbeafe"
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight position={[-4, 1, 3]} intensity={3.2} color="#2563eb" distance={9} />
      <pointLight position={[4, 3, -1]} intensity={2.1} color="#38bdf8" distance={8} />

      <gridHelper args={[12, 24, "#1e3a5f", "#152131"]} position={[0, -0.6, 0]} />

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

        <AddressRuler totalSize={totalSize} />
      </group>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.42} scale={11} blur={2.3} far={3.5} resolution={128} />
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
    <div className="three-stage relative h-[380px] overflow-hidden rounded-2xl border border-slate-800 bg-[#070b11] sm:h-[440px]">
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
        annotated 3D address map · drag / scroll
      </div>

      <div className="pointer-events-none absolute right-3 top-3 flex gap-3 rounded-lg border border-slate-800/90 bg-slate-950/80 px-3 py-2 text-[10px] text-slate-500 backdrop-blur">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-blue-500" /> allocated</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-slate-700" /> free</span>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 hidden text-[9px] uppercase tracking-[0.16em] text-slate-700 sm:block">
        low address → high address
      </div>

      {selected ? (
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-xs backdrop-blur sm:left-auto sm:right-3 sm:max-w-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-medium text-slate-100">
              {selected.status === "allocated" ? `Process P${selected.processId}` : "Free block"}
            </span>
            <span className="font-mono text-blue-300">{selected.size} KB</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-3 text-[10px] text-slate-500">
            <span>START <b className="mt-1 block font-mono font-normal text-slate-300">{selected.start}</b></span>
            <span>END <b className="mt-1 block font-mono font-normal text-slate-300">{selected.start + selected.size}</b></span>
            <span>HEAP <b className="mt-1 block font-mono font-normal text-slate-300">{Math.round((selected.size / totalSize) * 100)}%</b></span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
