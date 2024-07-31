import { useRef } from "react";
import { Sky, SoftShadows, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Scene() {
  const directionalLight = useRef();

  const { perfVisible } = useControls({
    perfVisible: true,
  });
  const { sunPosition } = useControls("sun position", {
    sunPosition: { value: [1, 2, 3] },
  });
  const { visible } = useControls("sphere", {
    visible: true,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />

      <Sky position={sunPosition} />

      <SoftShadows size={25} samples={10} focus={10} />

      <directionalLight
        ref={directionalLight}
        castShadow
        position={sunPosition}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={1.5} />

      <mesh castShadow position={[-2, 0, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
