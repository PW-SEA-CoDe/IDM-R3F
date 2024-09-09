import { usePanelContext } from "../PanelContext";

import "./Panel.css";

const Panel = ({ position, children }) => {
  const { getPanelState } = usePanelContext();
  const isOpen = getPanelState(position);

  return (
    <aside className={"panel-container " + position}>
      {!isOpen && <section className={"panel"}>{children}</section>}
    </aside>
  );
};

export default Panel;
