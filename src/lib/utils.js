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
  const { azimuth, altitude } = SunCalc.getPosition(date, latitude, longitude);
  const azimuthDegrees = (azimuth * (180 / Math.PI) + 360) % 360;
  const elevationDegrees = altitude * (180 / Math.PI);

  return {
    elevation: elevationDegrees,
    azimuth: azimuthDegrees,
  };
};

export const sunPositionToCartesian = (elevation, azimuth, distance = 1000) => {
  const elevationRad = (elevation * Math.PI) / 180;
  const azimuthRad = (azimuth * Math.PI) / 180;

  const x = distance * Math.cos(elevationRad) * Math.sin(azimuthRad);
  const y = distance * Math.sin(elevationRad);
  const z = -distance * Math.cos(elevationRad) * Math.cos(azimuthRad);

  return [x, y, z];
};

export const calculateSunProperties = (elevation) => {
  const normalizedElevation = Math.max(0, Math.min(elevation / 90, 1));
  const brightness = Math.pow(normalizedElevation, 2); // quadratic falloff for more realistic lighting

  // Temperature calculation (kelvin) - cooler (redder) at horizon, warmer (whiter) at zenith
  const minTemp = 2000; // Color temperature at horizon (sunrise/sunset)
  const maxTemp = 6000; // Color temperature at zenith (midday)
  const temperature = minTemp + (maxTemp - minTemp) * normalizedElevation;

  return { brightness, temperature };
};
