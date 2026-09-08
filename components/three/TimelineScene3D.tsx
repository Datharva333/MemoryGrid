"use client";

import { Html, Line, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { MathUtils, Vector3, type Group } from "three";

function nodePosition(index: number) {
  return new Vector3(Math.sin(index * 0.86) * 1.8, Math.cos(index * 0.52) * 0.42, -index * 1.9);
}

function CameraRig({ selectedIndex }: { selectedIndex: number }) {
  const { camera } = useThree();
  const lookTarget = useRef(new Vector3());
  const desired = useRef(new Vector3());

  useFrame(() => {
    const node = nodePosition(selectedIndex);
    desired.current.set(node.x * 0.28, 1.55, node.z + 5.4);
    camera.position.lerp(desired.current, 0.06);
    lookTarget.current.lerp(new Vector3(node.x, 0, node.z), 0.07);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function TimelineNode({
  index,
  period,
  selected,
  onSelect,
}: {
  index: number;
  period: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const position = useMemo(() => nodePosition(index), [index]);

  useFrame((state) => {
    if (!group.current) return;
    const scale = selected ? 1.35 : hovered ? 1.16 : 1;
    group.current.scale.x = MathUtils.lerp(group.current.scale.x, scale, 0.08);
    group.current.scale.y = MathUtils.lerp(group.current.scale.y, scale, 0.08);
    group.current.scale.z = MathUtils.lerp(group.current.scale.z, scale, 0.08);
    group.current.rotation.y += selected ? 0.006 : 0.002;
    group.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.65 + index) * 0.035;
  });

  return (
    <group ref={group} position={position}>
      <mesh
        castShadow
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
        <octahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial
          color={selected ? "#60a5fa" : "#334155"}
          emissive={selected ? "#2563eb" : "#000000"}
          emissiveIntensity={selected ? 0.95 : 0}
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>

      <Html center position={[0, 0.55, 0]} distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div className={`whitespace-nowrap rounded-full border px-2 py-1 text-[9px] font-semibold tracking-wider backdrop-blur ${selected ? "border-blue-400/50 bg-blue-400/10 text-blue-200" : "border-slate-700/70 bg-slate-950/75 text-slate-500"}`}>
          {period}
        </div>
      </Html>
    </group>
  );
}

export default function TimelineScene3D({
  periods,
  selectedIndex,
  onSelect,
}: {
  periods: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  const points = useMemo(() => periods.map((_, index) => nodePosition(index)), [periods]);

  return (
    <div className="three-stage relative h-[380px] overflow-hidden rounded-3xl border border-slate-800 bg-[#070b11] sm:h-[440px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.5, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#070b11"]} />
        <fog attach="fog" args={["#070b11", 7, 19]} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={2} color="#dbeafe" />
        <pointLight position={[-3, 1, 2]} intensity={4} color="#2563eb" distance={8} />
        <pointLight position={[3, 2, -5]} intensity={3} color="#38bdf8" distance={10} />

        <Stars radius={18} depth={10} count={420} factor={1.4} saturation={0} fade speed={0.18} />
        <Line points={points} color="#334155" lineWidth={1.2} transparent opacity={0.8} />

        {periods.map((period, index) => (
          <TimelineNode
            key={period}
            index={index}
            period={period}
            selected={selectedIndex === index}
            onSelect={() => onSelect(index)}
          />
        ))}

        <CameraRig selectedIndex={selectedIndex} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={1.05}
          maxPolarAngle={1.72}
          minAzimuthAngle={-0.55}
          maxAzimuthAngle={0.55}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-slate-800/90 bg-slate-950/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 backdrop-blur">
        select a node · drag to orbit
      </div>
    </div>
  );
}
