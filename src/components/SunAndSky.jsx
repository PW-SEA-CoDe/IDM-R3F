import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

import { colorTemperatureToRGB } from "../lib/utils";

const SunAndSky = ({
  sunSize = 50,
  intensity = 1,
  inclination = 0.3,
  azimuth = 0.25,
  dayDuration = 60, // seconds for a full day cycle
}) => {
  const lightRef = useRef();
  const skyRef = useRef();
  const sunMeshRef = useRef();

  let sunEmissiveColor;

  useEffect(() => {
    if (skyRef.current) {
      skyRef.current.material.uniforms.sunPosition.value = new THREE.Vector3();
    }
  }, []);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() % dayDuration) / dayDuration;
    const newInclination = Math.sin(t * Math.PI) * 0.5 + 0.5; // 0 to 1
    const newAzimuth = t;

    const theta = Math.PI * (newInclination - 0.5);
    const phi = 2 * Math.PI * (newAzimuth - 0.5);

    const newSunPosition = new THREE.Vector3(
      Math.cos(phi),
      Math.sin(theta),
      Math.sin(phi),
    ).multiplyScalar(1000);

    // Calculate color temperature based on sun's angle above horizon
    const angleAboveHorizon = (newSunPosition.y / 1000 + 1) / 2; // 0 to 1
    const temperature = 1900 + angleAboveHorizon * 8100; // 1900K (warm) to 10000K (cool)
    const sunColor = colorTemperatureToRGB(temperature);
    sunEmissiveColor = sunColor;

    if (lightRef.current) {
      lightRef.current.position.copy(newSunPosition);
      lightRef.current.color.copy(sunColor);
    }

    if (sunMeshRef.current) {
      sunMeshRef.current.position.copy(newSunPosition);
      sunMeshRef.current.material.color.copy(sunColor);
    }

    if (skyRef.current && skyRef.current.material) {
      skyRef.current.material.uniforms.sunPosition.value.copy(newSunPosition);
    }
  });

  const initialSunPosition = useMemo(() => {
    const theta = Math.PI * (inclination - 0.5);
    const phi = 2 * Math.PI * (azimuth - 0.5);
    return new THREE.Vector3(
      Math.cos(phi),
      Math.sin(theta),
      Math.sin(phi),
    ).multiplyScalar(1000);
  }, [inclination, azimuth]);

  return (
    <>
      <group>
        <Sky ref={skyRef} distance={450000} sunPosition={initialSunPosition} />
        <directionalLight
          ref={lightRef}
          position={initialSunPosition}
          intensity={intensity}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-near={0.5} // Start rendering shadows closer
          shadow-camera-far={sunSize * 10} // Adjust based on your scene scale
          shadow-camera-left={-sunSize * 10} // Adjust based on scene objects
          shadow-camera-right={sunSize * 10}
          shadow-camera-top={sunSize * 10}
          shadow-camera-bottom={-sunSize * 10}
        />
        <mesh ref={lightRef}>
          <sphereGeometry args={[sunSize, 32, 32]} />
          <meshStandardMaterial
            emissive={sunEmissiveColor}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default SunAndSky;
