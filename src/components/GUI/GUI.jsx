import { PanelProvider } from "../UI-primitives/PanelContext";

import Navbar from "../UI-primitives/Navbar/Navbar";
import Panel from "../UI-primitives/Panel/Panel";
import SunController from "../SunController/SunController";
import SunData from "../SunData/SunData";

import "./GUI.css";

const GUI = ({
  title = "Application Title",
  left = true,
  right = false,
  // leftChildren = [null],
  // rightChildren = [null],
}) => {
  return (
    <PanelProvider>
      <div className="gui">
        <Navbar title={title} left={left} right={right} />
        <div className="ui-container">
          <Panel position="left" exists={left}>
            <SunController />
          </Panel>
          <Panel position="right" exists={right}>
            <SunData />
          </Panel>
        </div>
      </div>
    </PanelProvider>
  );
};

export default GUI;
