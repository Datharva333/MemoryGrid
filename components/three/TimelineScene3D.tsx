"use client";

import { Html, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { CatmullRomCurve3, MathUtils, Vector3, type Group, type Mesh } from "three";

function nodePosition(index: number) {
  return new Vector3(
    Math.sin(index * 0.9) * 2.15,
    Math.cos(index * 0.58) * 0.55,
    -index * 2.15
  );
}

function CameraRig({ positions, selectedIndex }: { positions: Vector3[]; selectedIndex: number }) {
  const { camera, pointer } = useThree();
  const desiredPosition = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());
  const lookTarget = useRef(new Vector3());

  useFrame((_, delta) => {
    const node = positions[selectedIndex];
    if (!node) return;

    desiredPosition.current.set(
      node.x * 0.22 + pointer.x * 0.28,
      1.65 + pointer.y * 0.14,
      node.z + 5.75
    );
    desiredTarget.current.set(node.x, node.y * 0.2, node.z - 0.15);

    const positionEase = 1 - Math.exp(-delta * 3.8);
    const targetEase = 1 - Math.exp(-delta * 4.6);
    camera.position.lerp(desiredPosition.current, positionEase);
    lookTarget.current.lerp(desiredTarget.current, targetEase);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

function EnergyPulse({ curve, offset, speed }: { curve: CatmullRomCurve3; offset: number; speed: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = (state.clock.elapsedTime * speed + offset) % 1;
    ref.current.position.copy(curve.getPointAt(progress));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color="#7dd3fc" toneMapped={false} />
    </mesh>
  );
}

function TimelineNode({
  index,
  period,
  position,
  selected,
  onSelect,
}: {
  index: number;
  period: string;
  position: Vector3;
  selected: boolean;
  onSelect: () => void;
}) {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!group.current) return;

    const pulse = selected ? 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.06 : 1;
    const targetScale = (selected ? 1.34 : hovered ? 1.15 : 1) * pulse;
    const ease = 1 - Math.exp(-delta * 8);
    group.current.scale.x = MathUtils.lerp(group.current.scale.x, targetScale, ease);
    group.current.scale.y = MathUtils.lerp(group.current.scale.y, targetScale, ease);
    group.current.scale.z = MathUtils.lerp(group.current.scale.z, targetScale, ease);
    group.current.rotation.y += delta * (selected ? 0.75 : 0.22);
    group.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.045;

    if (ring.current) {
      ring.current.rotation.x += delta * 0.4;
      ring.current.rotation.z -= delta * 0.55;
    }
  });

  return (
    <group ref={group} position={position}>
      {selected ? (
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.018, 8, 42]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.72} toneMapped={false} />
        </mesh>
      ) : null}

      <mesh
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
        <octahedronGeometry args={[0.27, 1]} />
        <meshStandardMaterial
          color={selected ? "#60a5fa" : hovered ? "#475569" : "#334155"}
          emissive={selected ? "#2563eb" : "#000000"}
          emissiveIntensity={selected ? 1.15 : 0}
          metalness={0.7}
          roughness={0.24}
        />
      </mesh>

      {selected ? <pointLight intensity={2.4} distance={2.2} color="#3b82f6" /> : null}

      <Html center position={[0, 0.58, 0]} distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-wider backdrop-blur transition-colors ${
            selected
              ? "border-blue-400/60 bg-blue-400/15 text-blue-100"
              : "border-slate-700/70 bg-slate-950/75 text-slate-500"
          }`}
        >
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
  const positions = useMemo(() => periods.map((_, index) => nodePosition(index)), [periods]);
  const curve = useMemo(() => new CatmullRomCurve3(positions, false, "catmullrom", 0.35), [positions]);
  const curvePoints = useMemo(() => curve.getPoints(Math.max(48, periods.length * 10)), [curve, periods.length]);

  return (
    <div className="three-stage relative h-[390px] overflow-hidden rounded-3xl border border-slate-800 bg-[#070b11] sm:h-[460px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.65, 5.75], fov: 47 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#070b11"]} />
        <fog attach="fog" args={["#070b11", 7, 21]} />
        <ambientLight intensity={0.82} />
        <directionalLight position={[4, 6, 5]} intensity={1.7} color="#dbeafe" />
        <pointLight position={[-3, 1, 2]} intensity={3.2} color="#2563eb" distance={8} />

        <Sparkles count={46} scale={[8, 4.5, 19]} size={1} speed={0.12} opacity={0.22} color="#93c5fd" />
        <Line points={curvePoints} color="#334155" lineWidth={1.25} transparent opacity={0.72} />
        <Line points={curvePoints} color="#2563eb" lineWidth={0.45} transparent opacity={0.32} />

        <EnergyPulse curve={curve} offset={0} speed={0.055} />
        <EnergyPulse curve={curve} offset={0.34} speed={0.055} />
        <EnergyPulse curve={curve} offset={0.68} speed={0.055} />

        {periods.map((period, index) => (
          <TimelineNode
            key={period}
            index={index}
            period={period}
            position={positions[index]}
            selected={selectedIndex === index}
            onSelect={() => onSelect(index)}
          />
        ))}

        <CameraRig positions={positions} selectedIndex={selectedIndex} />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-slate-800/90 bg-slate-950/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 backdrop-blur">
        select a node · cinematic camera follows
      </div>
    </div>
  );
}
