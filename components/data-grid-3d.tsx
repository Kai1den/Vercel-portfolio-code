"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GridNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { count, positions } = useMemo(() => {
    const gridSize = 8;
    const spacing = 2;
    const pts: [number, number, number][] = [];

    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        pts.push([x, 0, z]);
      }
    }

    return { count: pts.length, positions: pts };
  }, []);

  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    const gridSize = 8;
    const spacing = 2;

    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        if (x + spacing <= gridSize) {
          points.push(x, 0, z, x + spacing, 0, z);
        }
        if (z + spacing <= gridSize) {
          points.push(x, 0, z, x, 0, z + spacing);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();

    positions.forEach((pos, i) => {
      const wave = Math.sin(pos[0] * 0.3 + time * 0.5) *
        Math.cos(pos[2] * 0.3 + time * 0.3) * 0.5;

      dummy.position.set(pos[0], wave, pos[2]);
      dummy.scale.setScalar(0.08 + Math.abs(wave) * 0.06);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (linesRef.current) {
      const linePositions = linesRef.current.geometry.attributes.position;
      const arr = linePositions.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const x = arr[i];
        const z = arr[i + 2];
        arr[i + 1] =
          Math.sin(x * 0.3 + time * 0.5) *
          Math.cos(z * 0.3 + time * 0.3) * 0.5;
      }
      linePositions.needsUpdate = true;
    }
  });

  return (
    <group rotation={[-0.4, 0.3, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#0052cc"
          emissive="#0052cc"
          emissiveIntensity={0.6}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0052cc"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { geometry } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return { geometry: geo };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color="#3385ff"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function DataGrid3D() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 6, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#0052cc" />
        <pointLight position={[-10, -5, -10]} intensity={0.3} color="#3385ff" />
        <GridNodes />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
