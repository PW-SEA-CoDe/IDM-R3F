import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";

import { colorTemperatureToRGB } from "../lib/utils";
import { useSunContext } from "../SunContext";

const Sun = ({
  position = [-200, -200, 400],
  intensity = 1,
  temperature = 5778, // average sun temp (k)
  size = 100,
  sceneSize = 1000,
  animationSpeed = 0.25,
  arcRadius = 2000,
}) => {
  const lightRef = useRef();
  const sphereRef = useRef();
  const { setSunPosition } = useSunContext();

  const sunColor = colorTemperatureToRGB(temperature);

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1000);

  useFrame(({ clock }) => {
    if (lightRef.current && sphereRef.current) {
      const time = clock.getElapsedTime() * animationSpeed;
      const x = position[0] + Math.sin(time) * arcRadius;
      const y = position[1] + Math.abs(Math.cos(time)) * arcRadius; // Use abs to keep sun above horizon
      const z = position[2];

      setSunPosition([x, y, z]);
      lightRef.current.position.set(x, y, z);
      sphereRef.current.position.set(x, y, z);
    }
  });

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
          shadow-camera-near={0.5} // Start rendering shadows closer
          shadow-camera-far={arcRadius * 2} // Adjust based on your scene scale
          shadow-camera-left={-sceneSize * 10} // Adjust based on scene objects
          shadow-camera-right={sceneSize * 10}
          shadow-camera-top={sceneSize * 10}
          shadow-camera-bottom={-sceneSize * 10}
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
