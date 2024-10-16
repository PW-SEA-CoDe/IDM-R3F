import { usePanelContext } from "../PanelContext";

import "./MenuButton.css";

const MenuButton = ({ position }) => {
  const { togglePanel, getPanelState } = usePanelContext();

  return (
    <button
      className="hamburger"
      type="button"
      onClick={() => togglePanel(position)}
    >
      <img src="./images/hamburger.svg" className="menu-icon" alt="menu icon" />
    </button>
  );
};

export default MenuButton;
