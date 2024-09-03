import { PanelProvider } from "../PanelContext";

import Navbar from "../Navbar/Navbar";
import Panel from "../Panel/Panel";

const HUD = () => {
  return (
    <PanelProvider>
      <Navbar title="UI Test" />
      <Panel position="left" />
      <Panel position="right" />
    </PanelProvider>
  );
};

export default HUD;
