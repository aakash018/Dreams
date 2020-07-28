import React from "react";
import "./navBar.css";

import Button from "../../ReusableComponents/CustomButton/button";

function NavBar() {
  return (
    <header className="userHeader">
      <nav className="userNav">
        <div className="links">
          <Button content="+" />
          <Button />
          <Button />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
