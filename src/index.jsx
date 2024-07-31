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
  far: 200,
  position: [-4, 3, 6],
};

root.render(
  <StrictMode>
    <Leva collapsed />
    <Canvas camera={cameraSettings}>
      <Scene />
    </Canvas>
  </StrictMode>,
);
