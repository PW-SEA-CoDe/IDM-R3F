// SunContext.js
import { createContext, useState, useContext } from "react";

const SunContext = createContext();

export const SunProvider = ({ children }) => {
  const [sunPosition, setSunPosition] = useState([0, 0, 0]);
  const [sunBrightness, setSunBrightness] = useState(1);
  const [sunTemperature, setSunTemperature] = useState(5778);

  const sunValues = {
    pos: [sunPosition, setSunPosition],
    bright: [sunBrightness, setSunBrightness],
    temp: [sunTemperature, setSunTemperature],
  };

  return (
    <SunContext.Provider value={sunValues}>{children}</SunContext.Provider>
  );
};

export const useSunContext = () => useContext(SunContext);
