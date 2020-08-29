import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAsia,
  faUserAlt,
  faFeather,
} from "@fortawesome/free-solid-svg-icons";

import "./navBar.css";
import { Posts } from "../../posts_contex";
import Button from "../../ReusableComponents/CustomButton/button";

function NavBar() {
  const { showInputBox, setShowInputBox } = useContext(Posts);
  // const history = useHistory();

  const handleClick = () => {
    setShowInputBox({ display: !showInputBox.display });
  };

  const handleGlobalRedirect = () => {
    console.log("Ok");
  };

  return (
    <header className="userHeader">
      <nav className="userNav">
        <div className="links">
          <Link to="/user/home">
            <span className="logoLink">D</span>
          </Link>
          <div className="linksButton">
            <section className="navButtons">
              <Button
                content={<FontAwesomeIcon icon={faFeather} />}
                action={handleClick}
              />
            </section>
            <section className="navButtons">
              <Link to="/user/global">
                <Button
                  content={<FontAwesomeIcon icon={faGlobeAsia} />}
                  action={handleGlobalRedirect}
                />
              </Link>
            </section>
            <section className="navButtons">
              <Button content={<FontAwesomeIcon icon={faUserAlt} />} />
            </section>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
