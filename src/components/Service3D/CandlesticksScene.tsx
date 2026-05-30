import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const CANDLES = [
  { x: -3.6, h: 1.4, color: "#5eead4" },
  { x: -2.7, h: 2.2, color: "#5eead4" },
  { x: -1.8, h: 1.0, color: "#f87171" },
  { x: -0.9, h: 2.8, color: "#5eead4" },
  { x: 0.0, h: 3.4, color: "#5eead4" },
  { x: 0.9, h: 1.8, color: "#f87171" },
  { x: 1.8, h: 2.5, color: "#5eead4" },
  { x: 2.7, h: 3.0, color: "#5eead4" },
  { x: 3.6, h: 2.1, color: "#5eead4" },
];

const CandlesticksScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float floatIntensity={0.4} rotationIntensity={0.2} speed={1.2}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {CANDLES.map((c, i) => (
          <mesh key={i} position={[c.x, c.h / 2, 0]}>
            <boxGeometry args={[0.55, c.h, 0.55]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.25}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        ))}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9, 9]} />
          <meshStandardMaterial
            color="#0d1320"
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default CandlesticksScene;
