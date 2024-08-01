import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Marker = () => {
  const [clicked, setClicked] = useState(false);
  const markerRef = useRef();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (clicked) {
      state.camera.lookAt(markerRef.current.position);
      state.camera.position.lerp(vec.set([100, 0, -100]), 0.01);
      state.camera.updateProjectionMatrix();
    }
    return null;
  });

  return (
    <mesh ref={markerRef} onClick={() => setClicked(!clicked)}>
      <meshStandardMaterial color="red" />
      <boxGeometry />
    </mesh>
  );
};

export default Marker;
