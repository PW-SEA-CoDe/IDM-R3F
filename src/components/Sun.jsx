import { useRef } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";

import { colorTemperatureToRGB } from "../lib/utils";

const Sun = ({
  position,
  intensity = 1,
  temperature = 5778,
  size = 100,
  sceneSize = 1000,
}) => {
  const lightRef = useRef();
  const sphereRef = useRef();

  const sunColor = colorTemperatureToRGB(temperature);

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1000);

  return (
    <>
      <group>
        <directionalLight
          ref={lightRef}
          color={sunColor}
          intensity={intensity}
          position={position}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-near={0.5}
          shadow-camera-far={sceneSize * 4}
          shadow-camera-left={-sceneSize * 2}
          shadow-camera-right={sceneSize * 2}
          shadow-camera-top={sceneSize * 2}
          shadow-camera-bottom={-sceneSize * 2}
        />
        <mesh ref={sphereRef} position={position}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={sunColor}
            emissive={sunColor}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default Sun;
