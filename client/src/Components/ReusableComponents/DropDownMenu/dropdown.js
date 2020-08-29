import React, { useState } from "react";

import "./dropdown.css";

function DropDownMenu({ options }) {
  const [showMenu, setShowMenu] = useState(false);

  const optionsNames = Object.keys(options);

  return (
    <div className="menuContainer">
      <section className="menuButton" onClick={() => setShowMenu(!showMenu)}>
        ...
      </section>
      {showMenu && (
        <section className="menuBody">
          {optionsNames.map((optionsName) => (
            <button
              onClick={() => {
                options[optionsName]();
                setShowMenu(false);
              }}
              key={optionsNames.indexOf(optionsName)}
            >
              {optionsName}
            </button>
          ))}
        </section>
      )}
    </div>
  );
}

export default DropDownMenu;
