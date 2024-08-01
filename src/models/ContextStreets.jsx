import React from "react";
import { useGLTF } from "@react-three/drei";

const ContextStreets = (props) => {
  const { nodes, materials } = useGLTF(
    "models/context-streets-reduced-transformed.glb",
    "draco/",
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      >
        <meshStandardMaterial color="darkgrey" />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/context-streets-reduced-transformed.glb");

export default ContextStreets;
