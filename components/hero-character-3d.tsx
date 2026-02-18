"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

/* ─── Stylized humanoid figure made of geometric primitives ─── */
function HumanoidFigure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle idle breathing / sway
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
  });

  const bodyMaterial = useMemo(
    () => (
      <meshStandardMaterial
        color="#0052cc"
        emissive="#003d99"
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.2}
      />
    ),
    []
  );

  const accentMaterial = useMemo(
    () => (
      <meshStandardMaterial
        color="#3385ff"
        emissive="#3385ff"
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.1}
      />
    ),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head - octahedron for cyber aesthetic */}
      <mesh position={[0, 2.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.45, 0]} />
        {accentMaterial}
      </mesh>

      {/* Visor / eye-line */}
      <mesh position={[0, 2.25, 0.3]}>
        <boxGeometry args={[0.6, 0.08, 0.15]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 8]} />
        {bodyMaterial}
      </mesh>

      {/* Torso - main body */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.9, 1.0, 0.45]} />
        {bodyMaterial}
      </mesh>

      {/* Chest accent plate */}
      <mesh position={[0, 1.35, 0.24]}>
        <boxGeometry args={[0.5, 0.3, 0.05]} />
        {accentMaterial}
      </mesh>

      {/* Core glow */}
      <mesh position={[0, 1.2, 0.25]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.6, 1.55, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        {accentMaterial}
      </mesh>
      <mesh position={[0.6, 1.55, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        {accentMaterial}
      </mesh>

      {/* Left arm */}
      <group position={[-0.6, 1.55, 0]}>
        <mesh position={[0, -0.35, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
          {bodyMaterial}
        </mesh>
        <mesh position={[-0.05, -0.7, 0.1]} rotation={[0.3, 0, 0.1]}>
          <boxGeometry args={[0.15, 0.45, 0.15]} />
          {bodyMaterial}
        </mesh>
      </group>

      {/* Right arm - raised, holding data orb */}
      <group position={[0.6, 1.55, 0]}>
        <mesh position={[0.05, -0.35, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.18, 0.55, 0.18]} />
          {bodyMaterial}
        </mesh>
        <mesh position={[0.15, -0.65, 0.15]} rotation={[-0.6, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.45, 0.15]} />
          {bodyMaterial}
        </mesh>
      </group>

      {/* Hips / belt line */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.75, 0.15, 0.4]} />
        {accentMaterial}
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.22, 0.2, 0]}>
        <boxGeometry args={[0.22, 0.7, 0.25]} />
        {bodyMaterial}
      </mesh>
      <mesh position={[-0.22, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.22]} />
        {bodyMaterial}
      </mesh>

      {/* Right leg */}
      <mesh position={[0.22, 0.2, 0]}>
        <boxGeometry args={[0.22, 0.7, 0.25]} />
        {bodyMaterial}
      </mesh>
      <mesh position={[0.22, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.22]} />
        {bodyMaterial}
      </mesh>

      {/* Feet */}
      <mesh position={[-0.22, -0.58, 0.06]}>
        <boxGeometry args={[0.22, 0.08, 0.3]} />
        {accentMaterial}
      </mesh>
      <mesh position={[0.22, -0.58, 0.06]}>
        <boxGeometry args={[0.22, 0.08, 0.3]} />
        {accentMaterial}
      </mesh>
    </group>
  );
}

/* ─── Holographic ring around the character ─── */
function HoloRing({ radius, speed, yPos }: { radius: number; speed: number; yPos: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, yPos, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 80]} />
      <meshStandardMaterial
        color="#3385ff"
        emissive="#3385ff"
        emissiveIntensity={1.2}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── Floating data particles around the figure ─── */
function DataParticles() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2.5;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(t + i) * 0.001;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#00d4ff"
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Ground grid / platform ─── */
function GroundGrid() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.Material).opacity =
        0.15 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <gridHelper
      ref={ref}
      args={[10, 20, "#0052cc", "#0052cc"]}
      position={[0, -1.1, 0]}
      // @ts-expect-error -- three.js typings
      material-transparent={true}
      material-opacity={0.15}
    />
  );
}

/* ─── Scene composition ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 3, 2]} intensity={1.2} color="#0052cc" distance={10} />
      <pointLight position={[3, 1, -2]} intensity={0.8} color="#3385ff" distance={8} />
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#00d4ff" distance={6} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <HumanoidFigure />
      </Float>

      <HoloRing radius={1.6} speed={0.4} yPos={0.8} />
      <HoloRing radius={2.0} speed={-0.25} yPos={0.3} />
      <HoloRing radius={1.3} speed={0.6} yPos={1.5} />

      <DataParticles />
      <GroundGrid />

      <Environment preset="city" />
    </>
  );
}

export default function HeroCharacter3D() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
