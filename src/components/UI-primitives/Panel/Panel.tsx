import { usePanelContext } from "../PanelContext";
import { ReactNode } from "react";

import "./Panel.css";

type Props = {
  position: string;
  children: ReactNode;
};

const Panel = ({ position, children }: Props) => {
  const { getPanelState } = usePanelContext();
  const isOpen = getPanelState(position);

  return (
    <aside className={"panel-container " + position}>
      {!isOpen && <section className={"panel"}>{children}</section>}
    </aside>
  );
};

export default Panel;
