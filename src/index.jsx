import "./index.css";
import Scene from "./scene.jsx";

import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import {
  EffectComposer,
  Bloom,
  SMAA,
  N8AO,
  Autofocus,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { SunProvider } from "./SunContext.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 10000,
  position: [-2000, 1200, 2000],
};

root.render(
  <>
    <Leva collapsed />
    <SunProvider>
      <Canvas shadows camera={cameraSettings}>
        <Scene />
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.75}
            height={300}
            kernelSize={KernelSize.LARGE}
          />
          <N8AO
            color={"black"}
            aoRadius={2}
            intensity={1}
            aoSamples={6}
            denoiseSamples={4}
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
    </SunProvider>
  </>,
);
