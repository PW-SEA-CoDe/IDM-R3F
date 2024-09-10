import { createContext, useState, useContext } from "react";

const PanelContext = createContext(null);

export const usePanelContext = () => useContext(PanelContext);

export const PanelProvider = ({ children }) => {
  const [panels, setPanels] = useState({
    left: false,
    right: false,
  });

  const togglePanel = (position) => {
    setPanels((prev) => ({
      ...prev,
      [position]: !prev[position],
    }));
  };

  const getPanelState = (position) => panels[position];

  return (
    <PanelContext.Provider value={{ togglePanel, getPanelState }}>
      {children}
    </PanelContext.Provider>
  );
};
