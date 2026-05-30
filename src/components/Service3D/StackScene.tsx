import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const LAYERS = [
  { y: -1.8, w: 4.5, color: "#5eead4", op: 0.55 },
  { y: -0.9, w: 4.2, color: "#5eead4", op: 0.6 },
  { y: 0.0, w: 4.0, color: "#5eead4", op: 0.65 },
  { y: 0.9, w: 3.7, color: "#5eead4", op: 0.75 },
  { y: 1.8, w: 3.4, color: "#5eead4", op: 0.9 },
];

const StackScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float floatIntensity={0.5} rotationIntensity={0.1} speed={1}>
      <group ref={groupRef} rotation={[-Math.PI / 8, 0, 0]}>
        {LAYERS.map((l, i) => (
          <mesh key={i} position={[0, l.y, 0]}>
            <boxGeometry args={[l.w, 0.25, l.w * 0.7]} />
            <meshStandardMaterial
              color={l.color}
              emissive={l.color}
              emissiveIntensity={0.3 + i * 0.08}
              metalness={0.5}
              roughness={0.25}
              transparent
              opacity={l.op}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export default StackScene;
