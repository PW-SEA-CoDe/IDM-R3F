import "./Navbar.css";

import MenuButton from "../MenuButton/MenuButton";
import ShareButton from "../ShareButton/ShareButton";

const Navbar = ({ title = "title", left = true, right = true }) => {
  return (
    <>
      <nav className="navbar">
        <div className="left-cluster">
          {left ? (
            <MenuButton position="left" />
          ) : (
            <div className="blank"></div>
          )}
        </div>
        <h1 className="title">{title}</h1>
        <div className="right-cluster">
          <ShareButton />
          {right && <MenuButton position="right" />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
