import { usePanel } from "../PanelContext";

import "./Panel.css";

const Panel = ({ position, children }) => {
  const { getPanelState } = usePanel();
  const isOpen = getPanelState(position);

  if (!isOpen) return null;

  return <aside className={"panel " + position}>{children}</aside>;
};

export default Panel;
