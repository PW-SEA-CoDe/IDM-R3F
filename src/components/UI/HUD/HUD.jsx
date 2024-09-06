import { PanelProvider } from "../PanelContext";

import Navbar from "../Navbar/Navbar";
import Panel from "../Panel/Panel";

import "./HUD.css";

const HUD = () => {
  return (
    <PanelProvider>
      <div className="hud">
        <Navbar title="UI Test" />
        <div className="ui-container">
          <Panel position="left"></Panel>
          <Panel position="right"></Panel>
        </div>
      </div>
    </PanelProvider>
  );
};

export default HUD;
