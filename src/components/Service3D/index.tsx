import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { ThreeKind } from "../../pages/servicesData";
import CandlesticksScene from "./CandlesticksScene";
import DiceScene from "./DiceScene";
import NodesScene from "./NodesScene";
import DistortScene from "./DistortScene";
import StackScene from "./StackScene";

type Props = {
  kind: ThreeKind;
};

const SCENES: Record<ThreeKind, () => JSX.Element> = {
  candlesticks: CandlesticksScene,
  dice: DiceScene,
  nodes: NodesScene,
  distort: DistortScene,
  stack: StackScene,
};

const Service3D = ({ kind }: Props) => {
  const SceneComponent = SCENES[kind];

  return (
    <div className="service-three">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0e17"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-4, -2, 4]} intensity={0.6} color="#5eead4" />
        <Suspense fallback={null}>
          <SceneComponent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Service3D;
