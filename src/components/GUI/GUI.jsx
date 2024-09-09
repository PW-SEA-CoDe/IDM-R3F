import { PanelProvider } from "../UI-primitives/PanelContext";

import Navbar from "../UI-primitives/Navbar/Navbar";
import Panel from "../UI-primitives/Panel/Panel";
import SunController from "../SunController/SunController";

import "./GUI.css";

const HUD = () => {
  return (
    <PanelProvider>
      <div className="gui">
        <Navbar title="Application Title" />
        <div className="ui-container">
          <Panel position="left">
            <SunController />
          </Panel>
          <Panel position="right"></Panel>
        </div>
      </div>
    </PanelProvider>
  );
};

export default HUD;
