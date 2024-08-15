// SunContext.js
import React, { createContext, useState, useContext } from "react";

const SunContext = createContext();

export const SunProvider = ({ children }) => {
  const [skyPosition, setSunPosition] = useState([0, 0, 0]);

  return (
    <SunContext.Provider value={{ skyPosition, setSunPosition }}>
      {children}
    </SunContext.Provider>
  );
};

export const useSunContext = () => useContext(SunContext);
