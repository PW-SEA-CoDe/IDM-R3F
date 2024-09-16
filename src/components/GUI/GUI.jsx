import { PanelProvider } from "../UI-primitives/PanelContext";

import Navbar from "../UI-primitives/Navbar/Navbar";
import Panel from "../UI-primitives/Panel/Panel";
import SunController from "../SunController/SunController";

import "./GUI.css";

const HUD = ({ left = true, right = false }) => {
  return (
    <PanelProvider>
      <div className="gui">
        <Navbar title="Application Title" left={left} right={right} />
        <div className="ui-container">
          <Panel position="left" exists={left}>
            <SunController />
          </Panel>
          <Panel position="right" exists={right}></Panel>
        </div>
      </div>
    </PanelProvider>
  );
};

export default HUD;
