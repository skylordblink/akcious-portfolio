import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const NODE_POSITIONS: [number, number, number][] = [
  [2.2, 1.5, 0],
  [-2.0, 1.8, 0.5],
  [0.3, 2.6, -0.5],
  [-2.3, -1.2, 0.2],
  [2.5, -1.5, -0.3],
  [0, -2.4, 0.6],
  [0.8, 0.4, 1.5],
  [-0.6, -0.2, -1.5],
];

const EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 6],
  [0, 6],
  [1, 6],
  [3, 5],
  [4, 5],
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [0, 4],
  [1, 3],
];

const NodesScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linePoints = useMemo(
    () =>
      EDGES.map(([a, b]) => [
        new THREE.Vector3(...NODE_POSITIONS[a]),
        new THREE.Vector3(...NODE_POSITIONS[b]),
      ]),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {NODE_POSITIONS.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial
            color="#5eead4"
            emissive="#5eead4"
            emissiveIntensity={0.7}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#5eead4"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
};

export default NodesScene;
