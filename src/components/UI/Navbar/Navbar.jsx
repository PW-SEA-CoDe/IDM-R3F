import "./Navbar.css";

import MenuButton from "../MenuButton/MenuButton";

const Navbar = ({ title = "title", left = true, right = true }) => {
  return (
    <>
      <nav className="navbar">
        {left ? <MenuButton position="left" /> : <div className="blank"></div>}
        <h1 className="title">{title}</h1>
        {right ? (
          <MenuButton position="right" />
        ) : (
          <div className="blank"></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
