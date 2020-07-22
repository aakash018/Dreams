import React, { useEffect, useState } from "react";
import "./nav.css";
import logo from "../../ReusableComponents/dream.svg";
import { Link } from "react-router-dom";

function Nav() {
  const [getPosition, setPosition] = useState(0);

  const findScrollPosition = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", findScrollPosition);
    return () => {
      document.removeEventListener("scroll", findScrollPosition);
    };
  });

  return (
    <header>
      <nav className={getPosition > 300 ? "navBar nav-active" : "navBar"}>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
