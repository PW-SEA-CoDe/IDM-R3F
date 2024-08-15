import "./index.css";
import Scene from "./scene.jsx";

import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { StrictMode } from "react";
import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));
const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 10000,
  position: [-2000, 1200, 2000],
};

root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas shadows camera={cameraSettings}>
      <axesHelper scale={500} />
      <Scene />
    </Canvas>
  </StrictMode>,
);
