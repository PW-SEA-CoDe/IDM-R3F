import * as THREE from "three";

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
  // Convert latitude and longitude to radians
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;

  // Get day of the year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Calculate solar declination
  const declination =
    0.4093 * Math.sin((2 * Math.PI * (284 + dayOfYear)) / 365);

  // Calculate equation of time
  const b = (2 * Math.PI * (dayOfYear - 81)) / 364;
  const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  // Calculate true solar time
  const localTime = date.getHours() + date.getMinutes() / 60;
  const solarTime = localTime + (4 * longitude) / 60 + eot / 60;

  // Calculate solar hour angle
  const hourAngle = ((solarTime - 12) * 15 * Math.PI) / 180;

  // Calculate solar elevation
  const sinElevation =
    Math.sin(lat) * Math.sin(declination) +
    Math.cos(lat) * Math.cos(declination) * Math.cos(hourAngle);
  const elevation = Math.asin(sinElevation);

  // Calculate solar azimuth
  const cosAzimuth =
    (Math.sin(declination) - Math.sin(lat) * sinElevation) /
    (Math.cos(lat) * Math.cos(elevation));
  let azimuth = Math.acos(cosAzimuth);
  if (hourAngle > 0) {
    azimuth = 2 * Math.PI - azimuth;
  }

  // Convert elevation and azimuth to degrees
  const elevationDeg = (elevation * 180) / Math.PI;
  const azimuthDeg = (azimuth * 180) / Math.PI;

  return { elevation: elevationDeg, azimuth: azimuthDeg };
};

export const sunPositionToCartesian = (elevation, azimuth, distance = 1000) => {
  const elevationRad = (elevation * Math.PI) / 180;
  const azimuthRad = (azimuth * Math.PI) / 180;

  const x = distance * Math.cos(elevationRad) * Math.sin(azimuthRad);
  const y = distance * Math.sin(elevationRad);
  const z = -distance * Math.cos(elevationRad) * Math.cos(azimuthRad);

  return [x, y, z];
};
