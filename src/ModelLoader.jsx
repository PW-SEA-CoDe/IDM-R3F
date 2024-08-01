import React from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoader } from "@react-three/fiber";

const ModelLoader = ({
  modelPath,
  scale = [1, 1, 1],
  position = [0, 0, 0],
}) => {
  const model = useLoader(GLTFLoader, modelPath, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    loader.setDRACOLoader(dracoLoader);
  });
  return (
    <>
      <primitive
        model={model.scene}
        dispose={null}
        scale={scale}
        position={position}
      />
    </>
  );
};

export default ModelLoader;
