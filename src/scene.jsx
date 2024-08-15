import { Suspense, useRef } from "react";
import {
  Sky,
  SoftShadows,
  OrbitControls,
  BakeShadows,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { ContactShadows } from "@react-three/drei";

import { useSunContext } from "./SunContext";
import RhinoModel from "./components/RhinoModel";
import Sun from "./components/Sun";
const contextURL = "/models/context.3dm";
const buildingOneURL = "/models/buildingOne.3dm";
const buildingTwoURL = "/models/buildingTwo.3dm";
const buildingThreeURL = "/models/buildingThree.3dm";

export default function Scene() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });
  const { sunPosition, sunSpeed } = useControls("sun", {
    sunPosition: { value: [-200, -200, 400] },
    sunSpeed: 0.05,
  });

  const { skyPosition } = useSunContext();

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <Sky position={skyPosition} distance={45000} />
      <Sun position={sunPosition} animationSpeed={sunSpeed} />
      <ambientLight intensity={1.5} />
      <SoftShadows size={25} samples={10} />
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.5}
        width={10}
        height={10}
        blur={1.5}
        far={20}
      />

      <Suspense>
        <RhinoModel url={contextURL} />
      </Suspense>
      <Suspense>
        <RhinoModel url={buildingOneURL} />
      </Suspense>
      <Suspense>
        <RhinoModel url={buildingTwoURL} />
      </Suspense>
      <Suspense>
        <RhinoModel url={buildingThreeURL} />
      </Suspense>
    </>
  );
}
