import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls }); //extended to jsx as "orbitControls"

export default function Scene() {
  const { camera, gl } = useThree(); // get scene info on load
  const cubeRef = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    //state contains scene info per frame
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh
          ref={cubeRef}
          scale={1.5}
          position-x={2}
          rotation-y={Math.PI * 0.25}
        >
          <boxGeometry />
          <meshStandardMaterial color={"mediumpurple"} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>
      <mesh scale={100} position={[0, -4, -12]} rotation-x={Math.PI * -0.5}>
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>
    </>
  );
}
