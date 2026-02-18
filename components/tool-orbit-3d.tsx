"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface ToolSphereProps {
  name: string;
  color: string;
  position: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

function ToolSphere({
  name,
  color,
  orbitRadius,
  orbitSpeed,
  orbitOffset,
}: ToolSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * orbitSpeed + orbitOffset;
    groupRef.current.position.x = Math.cos(t) * orbitRadius;
    groupRef.current.position.z = Math.sin(t) * orbitRadius;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;
  });

  const scale = hovered ? 1.3 : 1;

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={scale}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Ring around sphere */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={scale}>
          <ringGeometry args={[0.55, 0.6, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.6 : 0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Label */}
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.18}
          color={hovered ? "#ffffff" : "#888888"}
          anchorX="center"
          anchorY="top"
          font="/fonts/Geist-Bold.ttf"
        >
          {name}
        </Text>

        {/* Glow when hovered */}
        {hovered && (
          <pointLight
            position={[0, 0, 0]}
            intensity={2}
            distance={3}
            color={color}
          />
        )}
      </Float>
    </group>
  );
}

function CenterCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#0052cc"
          emissive="#0052cc"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1.5} distance={8} color="#0052cc" />
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial color="#0052cc" transparent opacity={0.08} />
    </line>
  );
}

const tools = [
  { name: "Zoho Suite", color: "#e74c3c", orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: 0 },
  { name: "Power BI", color: "#f7c948", orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: Math.PI * 2 / 6 },
  { name: "Airtable", color: "#18bfff", orbitRadius: 2.5, orbitSpeed: 0.3, orbitOffset: (Math.PI * 2 / 6) * 2 },
  { name: "Excel", color: "#217346", orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: Math.PI / 4 },
  { name: "SQL", color: "#cc6600", orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: Math.PI / 4 + Math.PI * 2 / 3 },
  { name: "Python", color: "#3776ab", orbitRadius: 3.5, orbitSpeed: 0.2, orbitOffset: Math.PI / 4 + (Math.PI * 2 / 3) * 2 },
];

export default function ToolOrbit3D() {
  return (
    <div className="h-[500px] w-full md:h-[600px]">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3385ff" />

        <CenterCore />
        <OrbitRing radius={2.5} />
        <OrbitRing radius={3.5} />

        {tools.map((tool) => (
          <ToolSphere
            key={tool.name}
            name={tool.name}
            color={tool.color}
            position={[0, 0, 0]}
            orbitRadius={tool.orbitRadius}
            orbitSpeed={tool.orbitSpeed}
            orbitOffset={tool.orbitOffset}
          />
        ))}
      </Canvas>
    </div>
  );
}
