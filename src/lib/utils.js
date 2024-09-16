import * as THREE from "three";
import SunCalc from "suncalc";

export const colorTemperatureToRGB = (kelvin) => {
  const temp = kelvin / 100;
  let red, green, blue;

  if (temp <= 66) {
    red = 255;
    green = temp;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;
    if (temp <= 19) {
      blue = 0;
    } else {
      blue = temp - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    }
  } else {
    red = temp - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);
    green = temp - 60;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);
    blue = 255;
  }

  return new THREE.Color(
    Math.min(Math.max(red, 0), 255) / 255,
    Math.min(Math.max(green, 0), 255) / 255,
    Math.min(Math.max(blue, 0), 255) / 255,
  );
};

export const calculateSunPosition = (date, latitude, longitude) => {
  console.log(date);
  const { azimuth, altitude } = SunCalc.getPosition(date, latitude, longitude);

  return {
    elevation: altitude,
    azimuth: azimuth,
  };
};

export const sunPositionToCartesian = (elevation, azimuth, distance = 1500) => {
  const x = distance * Math.cos(elevation) * Math.sin(azimuth);
  const y = distance * Math.sin(elevation);
  const z = -distance * Math.cos(elevation) * Math.cos(azimuth);
  return [x, y, z];
};

export const calculateSunProperties = (elevation) => {
  const elevationDeg = elevation * (180 / Math.PI);
  const normalizedElevation = Math.max(0, Math.min(elevationDeg / 90, 1));
  const brightness = Math.pow(normalizedElevation, 2);
  const minTemp = 2000; // color temperature at horizon (sunrise/sunset)
  const maxTemp = 6000; // color temperature at zenith (midday)
  const temperature = minTemp + (maxTemp - minTemp) * normalizedElevation;

  return { brightness, temperature };
};
