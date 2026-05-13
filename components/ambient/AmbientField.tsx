'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Returns scroll progress through the entire document as a value in [0, 1].
 * Used by the ambient scene to drive sphere rotation and camera dolly.
 */
function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

interface SceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function WireSphere({ scrollProgress }: SceneProps) {
  const ref = useRef<THREE.LineSegments>(null);
  const idleRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const node = ref.current;
    if (!node) return;
    const t = state.clock.elapsedTime;

    // Sphere rotates ~90° from top (0) to bottom (1) of the page.
    // A very slow idle drift overlays so the page feels alive when still.
    idleRef.current.x = Math.sin(t * 0.06) * 0.035;
    idleRef.current.y = Math.cos(t * 0.045) * 0.04;

    node.rotation.x = idleRef.current.x;
    node.rotation.y = scrollProgress.current * (Math.PI / 2) + idleRef.current.y;
    node.rotation.z = scrollProgress.current * 0.18;
  });

  // Low-poly icosahedron edges — wireframe only, no fill.
  const geometry = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(5.5, 1);
    return new THREE.EdgesGeometry(ico);
  }, []);

  return (
    <lineSegments ref={ref}>
      <primitive object={geometry} attach="geometry" />
      {/* Brushed pewter at 22% — a structural ghost, visible only on inspection. */}
      <lineBasicMaterial color="#9B9A95" transparent opacity={0.22} />
    </lineSegments>
  );
}

function ParticleField({ scrollProgress }: SceneProps) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    // Distribute particles in a soft volume around the sphere — denser near the
    // sphere shell, sparser at the edges, like motes in a beam of light.
    for (let i = 0; i < COUNT; i++) {
      // Use spherical coords with a radius bias so clouds cluster near the sphere shell.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.pow(Math.random(), 1.4) * 12;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const node = ref.current;
    if (!node) return;
    // Cloud rotates very slowly on its own + minor scroll-driven yaw.
    node.rotation.y += delta * 0.012;
    node.rotation.x = scrollProgress.current * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={COUNT}
        />
      </bufferGeometry>
      {/* Champagne particles carry the visible atmosphere — candlelight in a private library. */}
      <pointsMaterial
        size={0.11}
        color="#E8DDB8"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Camera({ scrollProgress }: SceneProps) {
  useFrame((state) => {
    // Camera dollies very slowly forward as the visitor descends — turns scrolling
    // into a sense of passage through a space rather than navigation between pages.
    const baseZ = 18;
    state.camera.position.z = baseZ - scrollProgress.current * 4;
    // hint of orbit — keep nearly fixed so it doesn't feel like a tour
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.25;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function AmbientField() {
  const scrollProgress = useScrollProgress();
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setSupportsWebGL(false);
    } catch {
      setSupportsWebGL(false);
    }
  }, []);

  if (!supportsWebGL) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      // Global 0.65 opacity is the canvas's "voice in the room" baseline.
      // Per-section tuning is a planned later pass — see plan §3.
      style={{ zIndex: 0, opacity: 0.65 }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 18], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Camera scrollProgress={scrollProgress} />
        <WireSphere scrollProgress={scrollProgress} />
        <ParticleField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
