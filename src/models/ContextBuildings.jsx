import React from "react";
import { useGLTF } from "@react-three/drei";

const ContextBuildings = (props) => {
  const { nodes, materials } = useGLTF(
    "models/context-buildings-reduced-transformed.glb",
    "draco/",
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      />
    </group>
  );
};

useGLTF.preload("/models/context-buildings-reduced-transformed.glb");

export default ContextBuildings;
