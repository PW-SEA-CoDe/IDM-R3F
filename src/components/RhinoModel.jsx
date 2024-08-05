import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Rhino3dmLoader } from "three/examples/jsm/loaders/3DMLoader";

// Register the loader
THREE.DefaultLoadingManager.addHandler(/\.3dm$/, Rhino3dmLoader);

const RhinoModel = ({ url }) => {
  const [rhino, setRhino] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRhino = async () => {
      try {
        const rhino3dm = await import("rhino3dm");
        const rhino = await rhino3dm.default();
        setRhino(rhino);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load rhino3dm:", err);
        setError(
          "Failed to load 3D model library. Please check your internet connection and try again.",
        );
        setLoading(false);
      }
    };

    loadRhino();
  }, []);

  const object = useLoader(
    Rhino3dmLoader,
    url,
    (loader) => {
      loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/");
    },
    (error) => {
      console.error("Error loading 3D model:", error);
      setError(
        "Failed to load 3D model. Please check the file path and try again.",
      );
      setLoading(false);
    },
  );

  useEffect(() => {
    if (rhino && object) {
      console.log("Rhino3dm model loaded:", object);
      setLoading(false);
    }
  }, [rhino, object]);

  if (loading) {
    return <div>Loading 3D model...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return object ? <primitive object={object} /> : null;
};

export default RhinoModel;
