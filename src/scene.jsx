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
  const {
    sunPosition,
    sunSpeed,
    rayleigh,
    turbidity,
    mieCoefficient,
    mieDirectionalG,
    elevation,
    azimuth,
    scale,
  } = useControls("sun", {
    sunPosition: { value: [-200, -200, 400] },
    sunSpeed: 0.25,
    rayleigh: { value: 3, min: 0, max: 10, step: 0.1 },
    turbidity: { value: 10, min: 0, max: 20, step: 0.1 },
    mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
    mieDirectionalG: { value: 0.8, min: 0, max: 1, step: 0.01 },
    elevation: { value: 2, min: 0, max: Math.PI, step: 0.1 },
    azimuth: { value: 180, min: 0, max: 360, step: 1 },
    scale: { value: 1000, min: 1, max: 5000, step: 10 },
  });

  const { skyPosition } = useSunContext();

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      <Sky
        sunPosition={skyPosition}
        rayleigh={rayleigh}
        turbidity={turbidity}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        elevation={elevation}
        azimuth={azimuth}
        scale={scale}
      />
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
