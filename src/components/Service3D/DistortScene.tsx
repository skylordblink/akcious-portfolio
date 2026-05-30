import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const DistortScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float floatIntensity={0.3} rotationIntensity={0.15} speed={0.8}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 4]} />
          <MeshDistortMaterial
            color="#5eead4"
            emissive="#5eead4"
            emissiveIntensity={0.35}
            distort={0.45}
            speed={1.6}
            metalness={0.55}
            roughness={0.25}
          />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.8, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#5eead4"
            emissive="#5eead4"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default DistortScene;
