import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const DiceScene = () => {
  const dieRef = useRef<THREE.Mesh>(null);
  const chipRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (dieRef.current) {
      dieRef.current.rotation.x += delta * 0.4;
      dieRef.current.rotation.y += delta * 0.3;
    }
    if (chipRef.current) {
      chipRef.current.rotation.z += delta * 0.6;
    }
  });

  const dotPositions: [number, number, number][] = [
    [0, 0, 1.01],
    [0.5, 0.5, 1.01],
    [-0.5, -0.5, 1.01],
  ];

  return (
    <Float floatIntensity={0.6} rotationIntensity={0.2} speed={1.5}>
      <group>
        <mesh ref={dieRef} position={[-1.4, 0.4, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#0d1320"
            emissive="#5eead4"
            emissiveIntensity={0.08}
            metalness={0.5}
            roughness={0.3}
          />
          {dotPositions.map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial
                color="#5eead4"
                emissive="#5eead4"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </mesh>
        <mesh ref={chipRef} position={[1.8, -0.8, 0.3]} rotation={[Math.PI / 2.4, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.25, 32]} />
          <meshStandardMaterial
            color="#f87171"
            emissive="#f87171"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default DiceScene;
