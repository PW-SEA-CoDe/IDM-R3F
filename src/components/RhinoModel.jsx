import { useEffect, useState, useRef } from "react";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const RhinoModel = ({ url, verbose = false, ...props }) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    const loader = new Rhino3dmLoader();
    loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.4.0/");

    loader.load(
      url,
      (loadedModel) => {
        if (verbose) console.log("Model loaded successfully:", loadedModel);
        try {
          // Correct the orientation
          loadedModel.rotateX(-Math.PI / 2);

          loadedModel.traverse((child) => {
            if (child.isMesh) {
              if (verbose) console.log("Mesh found:", child);

              // Ensure the material is MeshPhongMaterial for better rendering
              if (!(child.material instanceof THREE.MeshPhongMaterial)) {
                const color = child.material.color;
                child.material = new THREE.MeshPhongMaterial({
                  color: color,
                  shininess: 10,
                  specular: "#3c2a1f",
                  toneMapped: true,
                });
              }

              // Enable shadows
              child.castShadow = true;
              child.receiveShadow = true;
            } else if (child.isLine) {
              if (verbose) console.log("Line found:", child);
              // Ensure lines are visible
              child.material.color.setHex(0xffffff);
              child.material.linewidth = 2;
            }
          });

          setModel(loadedModel);
        } catch (err) {
          console.error("Error processing loaded model:", err);
          setError(err.message);
        }
      },
      (xhr) => {
        if (verbose) console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (err) => {
        console.error("Error loading model:", err);
        setError(err.message);
      },
    );
  }, [url]);

  if (error) {
    return <Text position={[0, 2, 0]} color="white">{`Error: ${error}`}</Text>;
  }

  return (
    <group ref={groupRef} {...props}>
      {model && <primitive object={model} />}
    </group>
  );
};

export default RhinoModel;
