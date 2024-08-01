import React from "react";
import { useGLTF } from "@react-three/drei";

const ContextBlocks = (props) => {
  const { nodes } = useGLTF(
    "models/context-blocks-reduced-transformed.glb",
    "draco/",
  );
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.mesh_0.geometry}>
        <meshStandardMaterial color="lightgrey" />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/context-blocks-reduced-transformed.glb");

export default ContextBlocks;
