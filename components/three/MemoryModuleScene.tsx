"use client";

import { ContactShadows, OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";

function RamModule() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = -0.08 + state.pointer.y * 0.12;
    const targetY = -0.2 + state.pointer.x * 0.28;
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, targetX, 0.045);
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, targetY, 0.045);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  const chipPositions = [-2.05, -0.7, 0.7, 2.05];
  const pinPositions = Array.from({ length: 22 }, (_, index) => -2.58 + index * 0.245);

  return (
    <group ref={group} rotation={[-0.08, -0.2, -0.04]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5.8, 1.8, 0.16]} />
        <meshStandardMaterial color="#0d3145" roughness={0.5} metalness={0.35} />
      </mesh>

      <mesh position={[-2.55, 0.54, 0.095]}>
        <boxGeometry args={[0.34, 0.34, 0.05]} />
        <meshStandardMaterial color="#0b1722" metalness={0.5} roughness={0.45} />
      </mesh>

      {chipPositions.map((x, index) => (
        <group key={x} position={[x, 0.05, 0.18]}>
          <mesh castShadow>
            <boxGeometry args={[1.05, 0.82, 0.24]} />
            <meshStandardMaterial color="#0b1119" roughness={0.34} metalness={0.68} />
          </mesh>
          <mesh position={[0, 0, 0.135]}>
            <boxGeometry args={[0.72, 0.48, 0.03]} />
            <meshStandardMaterial
              color={index === 1 ? "#102c45" : "#111a25"}
              emissive={index === 1 ? "#2563eb" : "#000000"}
              emissiveIntensity={index === 1 ? 0.22 : 0}
              roughness={0.42}
            />
          </mesh>
        </group>
      ))}

      {pinPositions.map((x, index) => (
        <mesh key={index} position={[x, -0.85, 0.09]}>
          <boxGeometry args={[0.12, 0.18, 0.07]} />
          <meshStandardMaterial color="#d2ae55" metalness={0.86} roughness={0.3} />
        </mesh>
      ))}

      <mesh position={[2.48, 0.64, 0.16]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#38bdf8"
          emissiveIntensity={2.3}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, -0.36, 0.105]}>
        <boxGeometry args={[4.65, 0.025, 0.018]} />
        <meshStandardMaterial color="#2a6b86" emissive="#0ea5e9" emissiveIntensity={0.14} />
      </mesh>
    </group>
  );
}

export default function MemoryModuleScene() {
  return (
    <div className="three-stage h-[250px] w-full sm:h-[285px]" aria-label="Interactive 3D RAM module">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 7.4], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <ambientLight intensity={1.05} />
        <directionalLight
          castShadow
          position={[4, 5, 6]}
          intensity={2.2}
          color="#dbeafe"
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-4, -1, 3]} intensity={4} color="#2563eb" distance={8} />
        <pointLight position={[4, 2, 1]} intensity={3} color="#38bdf8" distance={7} />

        <Sparkles count={28} scale={[8, 4, 4]} size={1.1} speed={0.18} opacity={0.28} color="#93c5fd" />
        <RamModule />
        <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={7} blur={2.5} far={4} resolution={256} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.75}
          minAzimuthAngle={-0.55}
          maxAzimuthAngle={0.55}
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[10px] uppercase tracking-[0.22em] text-slate-600">
        drag to inspect
      </div>
    </div>
  );
}
