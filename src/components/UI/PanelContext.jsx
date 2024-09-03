import { createContext, useState, useContext } from "react";

const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [panels, setPanels] = useState({
    left: false,
    right: false,
  });

  const togglePanel = (position) => {
    setPanels((prev) => ({ ...prev, [position]: !prev[position] }));
  };

  const getPanelState = (position) => panels[position];

  return (
    <PanelContext.Provider value={{ togglePanel, getPanelState }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error("usePanel must be used within a PanelProvider");
  }
  return context;
};
