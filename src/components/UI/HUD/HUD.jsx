import { PanelProvider } from "../PanelContext";

import Navbar from "../Navbar/Navbar";
import Panel from "../Panel/Panel";

import "./HUD.css";

const HUD = () => {
  return (
    <PanelProvider>
      <div className="hud">
        <Navbar title="UI Test" />
        <div className="panel-container">
          <Panel position="left" />
          <Panel position="right" />
        </div>
      </div>
    </PanelProvider>
  );
};

export default HUD;
