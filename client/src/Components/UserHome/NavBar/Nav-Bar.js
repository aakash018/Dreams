import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./navBar.css";
import { Posts } from "../../posts_contex";
import Button from "../../ReusableComponents/CustomButton/button";

function NavBar() {
  const { showInputBox, setShowInputBox } = useContext(Posts);
  const history = useHistory();

  const handleClick = () => {
    setShowInputBox(!showInputBox);
    console.log(showInputBox);
  };

  const handleGlobalRedirect = () => {
    return history.push("/user/global");
  };

  const redirectToHome = () => {
    return history.push("/user/home");
  };

  return (
    <header className="userHeader">
      <nav className="userNav">
        <div className="links">
          <div className="logoLink" onClick={redirectToHome}>
            D
          </div>
          <Button content="+" action={handleClick} />
          <Button content="&#127760;" action={handleGlobalRedirect} />
          <Button content="&#128100;" />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
