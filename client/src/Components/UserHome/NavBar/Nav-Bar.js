import React, { useContext } from "react";
import "./navBar.css";
import { Posts } from "../../posts_contex";
import Button from "../../ReusableComponents/CustomButton/button";

function NavBar() {
  const { showInputBox, setShowInputBox } = useContext(Posts);

  const handleClick = () => {
    setShowInputBox(!showInputBox);
  };

  return (
    <header className="userHeader">
      <nav className="userNav">
        <div className="links">
          <Button content="+" action={handleClick} />
          <Button content="&#127760;" />
          <Button content="&#128100;" />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
