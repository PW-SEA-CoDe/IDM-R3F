import React, { useEffect, useState, useRef } from "react";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";

const RhinoModel = ({ url, color = "black", ...props }) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0/");

    loader.load(
      url,
      (loadedModel) => {
        console.log("Model loaded successfully:", loadedModel);
        try {
          loadedModel.traverse((child) => {
            if (child.isMesh) {
              console.log("Mesh found:", child);
              child.material.color.set(color);
            } else if (child.isLine) {
              console.log("Line found:", child);
              child.material.color.set("white");
            }
          });
          setModel(loadedModel);
        } catch (err) {
          console.error("Error processing loaded model:", err);
          setError(err.message);
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (err) => {
        console.error("Error loading model:", err);
        setError(err.message);
      },
    );
  }, [url, color]);

  if (error) {
    return (
      <group>
        <meshBasicMaterial color="red" />
        <boxGeometry args={[1, 1, 1]} />
        <Text position={[0, 2, 0]} color="white">{`Error: ${error}`}</Text>
      </group>
    );
  }

  return (
    <group ref={groupRef} {...props}>
      {model && <primitive object={model} castShadow />}
    </group>
  );
};

export default RhinoModel;
